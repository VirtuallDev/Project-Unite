import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

    constructor(private readonly userService: UsersService) {}


    use(req: Request, res: Response, next: NextFunction) {
        const { req_token, user_id } = req.cookies;
        if(!req_token) return res.send({"errors": "test"});
    }
}
