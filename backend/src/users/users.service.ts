import { createHmac, randomBytes } from 'crypto';
import { Injectable, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto, UserDto } from './users.dto';
import { ConfigService } from '@nestjs/config';
import Generator from 'src/utils/generators';
import { CredentialNotFoundException, UnAuthorizedException } from './users.exceptions';
import {decode, sign} from 'jsonwebtoken';

@Injectable()
export class UsersService {
    constructor(
        private readonly prisma: PrismaService) {}

    async createUser(userDto: UserDto) {
        const id = Generator.generateNonce();
        const { email, password, username } = userDto;
        const passwordSalt = await Generator.generateSalt(16);
        const passHash = createHmac('sha256', passwordSalt).update(password).digest('hex');

        const userObj = await this.prisma.user.create({
            data: {
                id,
                username,
                email,
                password: passHash,
                hashSalt: passwordSalt,
                createdAt: new Date()
            }
        })

        delete userObj.hashSalt;
        delete userObj.issuedAt;
        delete userObj.password;
        delete userObj.refreshToken;
        
        return userObj;
    }   

    async loginUser(loginDto: LoginDto) {
        const { email, password } = loginDto;
        const user = await this.prisma.user.findUnique({ where: {email}});
        if(user == null) throw new CredentialNotFoundException();

        const passHash = createHmac('sha256', user.hashSalt).update(password).digest('hex');
        const isPasswordValid = passHash === user.password;

        if(!isPasswordValid) throw new CredentialNotFoundException();
        
        const refToken = randomBytes(32).toString("hex");
        await this.prisma.user.update({where: {email}, data: {
            refreshToken: refToken,
            issuedAt: Date.now()
        }})

        return {refToken, userId: user.id};
    }

    async logout(refToken: string, userId: string) {
        const user = await this.prisma.user.findUnique({ where: {id: userId, refreshToken: refToken} });
        if(user == null) throw new UnAuthorizedException();

        await this.prisma.user.update({ where: {id: userId}, data: {
            refreshToken: "",
            issuedAt: Date.now()
        }});
    }

    async refreshToken(refToken: string, userId: string) {
        const user = await this.prisma.user.findUnique({ where: {id: userId, refreshToken: refToken} });
        if(user == null) throw new UnAuthorizedException();
        
        const ct = Date.now();
        const timePassed = (ct - Number(user.issuedAt)) / 360_000;
        if(timePassed > 24) throw new UnAuthorizedException();
        
        const authToken = sign({userId}, process.env?.JWT_SECRET, {expiresIn: "30m"});
        return authToken;
    }

    async getUser(id: string) {
        
    }

}
