import { Controller, Get, Post, Body, HttpException, HttpStatus, Req, Res, UseInterceptors, ClassSerializerInterceptor, UseFilters, HttpCode } from '@nestjs/common';
import { Response, Request } from 'express';
import { RegisterDto } from './auth.dto';
import { plainToClass } from 'class-transformer';
import { AuthService } from './auth.service';
import { UniteExceptionFilter } from 'exceptions/UniteException.filter';
import { HttpSuccess } from 'src/utils/http.success';

@UseInterceptors(ClassSerializerInterceptor)
@UseFilters(UniteExceptionFilter)
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @HttpCode(200)
    @Post("/register")
    async register(@Body() regData: RegisterDto) {
        await this.authService.register(regData);
        
        return HttpSuccess.createSuccess(HttpSuccess.Messages.USER_CREATED);
    }
}
