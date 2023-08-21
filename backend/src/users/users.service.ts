import { createHmac } from 'crypto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './users.dto';
import { ConfigService } from '@nestjs/config';
import Generator from 'src/utils/generators';

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


}
