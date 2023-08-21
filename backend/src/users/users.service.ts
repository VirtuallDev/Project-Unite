import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { UserDto } from './users.dto';
import crypto from 'crypto';
import { CredentialExistsException } from './users.exceptions';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    async createUser(userDto: UserDto) {
        const id = this.generateNonce();
        const { email, password, username } = userDto;
        const passwordSalt = this.generateSalt();
        const passHash = crypto.createHmac('sha256', passwordSalt).update(password).digest('hex');

        await this.prisma.user.create({
            data: {
                id,
                username,
                email,
                password: passHash,
                hashSalt: passHash,
                createdAt: new Date()
            }
        })

    }   

    generateNonce() {
        return Date.now().toString() + crypto.randomBytes(3).toString("hex");
    }

    generateSalt() {
        return crypto.randomBytes(16).toString("hex");
    }

}
