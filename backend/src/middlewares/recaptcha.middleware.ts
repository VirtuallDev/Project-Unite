import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { HttpService } from '@nestjs/axios';
import UniteException from 'src/exceptions/UniteException';

@Injectable()
export class RecaptchaMiddleware implements NestMiddleware {

    constructor(private readonly httpService: HttpService) {}


    async use(req: Request, res: Response, next: NextFunction) {

        const { challenge } = req.body;
        if(!challenge) throw new UniteException("ReCAPTCHA Challenge not found in body.", HttpStatus.BAD_REQUEST);

        const httpRes = await this.httpService.axiosRef.post("https://www.google.com/recaptcha/api/siteverify", {}, {params: {secret: process.env?.RECAPTCHA_SECRET_KEY,
        response: challenge}})

        if(!httpRes.data.success) throw new UniteException("Invalid challenge solution.", HttpStatus.BAD_REQUEST);

        next();
    }
}
