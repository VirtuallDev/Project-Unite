import { createHmac } from 'crypto';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { UserDto } from './users.dto';
import { CredentialExistsException } from './users.exceptions';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly configService: ConfigService) {}

    async createUser(userDto: UserDto) {
        const id = this.generateNonce();
        const { email, password, username } = userDto;
        const passwordSalt = await this.generateSalt();
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

    generateNonce() {
        return Date.now().toString();
    }

    async generateSalt() {
        
        const salt = await bcrypt.genSalt(16);
        return salt;
    }

}
