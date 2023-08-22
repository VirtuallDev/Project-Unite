import { Controller, Get, Post, Body, HttpStatus, Req, Res, UseInterceptors, ClassSerializerInterceptor, UseFilters, HttpCode } from '@nestjs/common';
import { LoginDto, RegisterDto } from './auth.dto';
import { AuthService } from './auth.service';
import { HttpSuccess } from 'src/utils/http.success';
import { Request, Response } from 'express';
import { Cookies } from 'src/decorators/cookies.dec';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    // TODO: ReCaptcha when frontend is completed
    @HttpCode(200)
    @Post("/register")
    async register(@Body() regData: RegisterDto) {
        await this.authService.register(regData);
        
        return HttpSuccess.createSuccess(HttpSuccess.Messages.USER_CREATED);
    }

    @HttpCode(200)
    @Post("/login")
    async login(@Body() loginData: LoginDto, @Req() req: Request, @Res({passthrough: true}) res: Response) {
        const retData = await this.authService.login(loginData);
        
        res.cookie('ref_token', retData.refToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        }).cookie('user_id', retData.userId, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        }).json(HttpSuccess.createSuccess(HttpSuccess.Messages.LOGGED_IN))
    }


    // TODO: create a service both in auth and users that removes the refresh token from the db
    @HttpCode(200)
    @Post("/logout")
    async logout(@Cookies("ref_token") refToken: string) {
        console.log(refToken);
        return 'logging out';
    }
}
