import { Controller, Get, Post, Body, HttpStatus, Req, Res, UseInterceptors, ClassSerializerInterceptor, UseFilters, HttpCode } from '@nestjs/common';
import { RegisterDto } from './auth.dto';
import { AuthService } from './auth.service';
import { UniteExceptionFilter } from 'src/exceptions/UniteException.filter';
import { HttpSuccess } from 'src/utils/http.success';

@UseInterceptors(ClassSerializerInterceptor)
@UseFilters(UniteExceptionFilter)
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    // TODO: ReCaptch when frontend is completed
    @HttpCode(200)
    @Post("/register")
    async register(@Body() regData: RegisterDto) {
        await this.authService.register(regData);
        
        return HttpSuccess.createSuccess(HttpSuccess.Messages.USER_CREATED);
    }
}
