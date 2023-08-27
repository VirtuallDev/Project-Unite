import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserNotFoundException } from './users.exceptions';
import { CookieJar } from 'src/decorators/cookies.decorator';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get(":id")
    getUserById(@Param("id") id: string, @CookieJar() cookies: {req_token: string, user_id: string}) {
        if(id !== "me") throw new UserNotFoundException();
        

    }
}
