import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './auth.dto';
import { Prisma } from '@prisma/client';
import { PrismaError } from 'src/utils/prisma.errors';
import { CredentialExistsException } from 'src/users/users.exceptions';
import UniteException from 'exceptions/UniteException';


@Injectable()
export class AuthService {

    constructor(private readonly usersService: UsersService) {}

    public async register(register: RegisterDto) {
        try {
            await this.usersService.createUser({...register});
        } catch (error) {
            if(error instanceof Prisma.PrismaClientKnownRequestError &&
                error?.code === PrismaError.UniqueConstraintFailed)
            {
                throw new CredentialExistsException();
            }
            throw new UniteException(
                'Something went wrong, please contact our tech support.',
                HttpStatus.INTERNAL_SERVER_ERROR,
              );
        }
    }

}
                    