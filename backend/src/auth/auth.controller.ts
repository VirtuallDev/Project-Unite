import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';

@Controller('auth')
export class AuthController {

    @Get("/")
    authMain() {
        throw new HttpException("Error", HttpStatus.NOT_FOUND, {description: JSON.stringify({"a": 1})});
    }
}
