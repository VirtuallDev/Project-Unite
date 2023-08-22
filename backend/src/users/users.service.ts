import { createHmac, randomBytes } from 'crypto';
import { Injectable, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto, UserDto } from './users.dto';
import { ConfigService } from '@nestjs/config';
import Generator from 'src/utils/generators';
import UniteException from 'src/exceptions/UniteException';

@Injectable()
export class UsersService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly configService: ConfigService) {}

    async createUser(userDto: UserDto) {
        const id = Generator.generateNonce();
        const { email, password, username } = userDto;
        const passwordSalt = await Generator.generateSalt(16);
        const passHash = createHmac('sha256', passwordSalt).update(password).digest('hex');

        await this.prisma.user.create({
            data: {
                id,
                username,
                email,
                password: passHash,
                hashSalt: passwordSalt,
                createdAt: new Date()
            }
        })
    }   

    async loginUser(loginDto: LoginDto) {
        const { email, password } = loginDto; // throw new UniteException("All fields are required.", HttpStatus.NOT_ACCEPTABLE)
        const user = await this.prisma.user.findUnique({ where: {email}});
        if(user == null) throw new UniteException("One or more of the credentials you entered is not right.", HttpStatus.NOT_ACCEPTABLE);

        const passHash = createHmac('sha256', user.hashSalt).update(password).digest('hex');
        const isPasswordValid = passHash === user.password;

        if(!isPasswordValid) throw new UniteException("One or more of the credentials you entered is not right.", HttpStatus.NOT_ACCEPTABLE);
        
        const refToken = randomBytes(32).toString("hex");
        await this.prisma.user.update({where: {email}, data: {
            refreshToken: refToken,
            issuedAt: Date.now()
        }})

        return {refToken, userId: user.id};
    }



}
