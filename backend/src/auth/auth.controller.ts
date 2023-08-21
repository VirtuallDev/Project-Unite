import { Controller, Get, Post, Body, HttpException, HttpStatus, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { RegisterDto } from './auth.dto';
import { plainToClass } from 'class-transformer';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post("/register")
    async register(@Body() regData: RegisterDto,@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        try
        {
            await this.authService.register(regData);
        } catch(error) {
            if(error instanceof HttpException)
            {
                res.status(error.getStatus())
                res.json({"errors": error.message});
                return;
            }
            else
            {
                res.status(400)
                return 'error';
            }

        }

        return 'haa';
    }
}
