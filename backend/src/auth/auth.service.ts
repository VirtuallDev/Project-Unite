import { Injectable, HttpStatus } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto, RegisterDto } from './auth.dto';
import { Prisma } from '@prisma/client';
import { PrismaError } from 'src/utils/prisma.errors';
import { CredentialExistsException } from 'src/users/users.exceptions';
import UniteException from 'src/exceptions/UniteException';


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


    public async login(login: LoginDto) {
        try {
            return await this.usersService.loginUser(login);
        } catch (err) {
            
            if(!(err instanceof UniteException)) {
                throw new UniteException(
                    'Something went wrong, please contact our tech support.',
                    HttpStatus.INTERNAL_SERVER_ERROR,
                  );
            }

            throw err;
        }
    }

    public async logout(refToken: string, userId: string) {
        try {
            await this.usersService.logout(refToken, userId);
        } catch(err) {
            if(!(err instanceof UniteException)) {
                throw new UniteException(
                    'Something went wrong, please contact our tech support.',
                    HttpStatus.INTERNAL_SERVER_ERROR,
                  );
            }

            throw err;
        }
    }
}
                    