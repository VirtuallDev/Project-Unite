import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const Cookies = createParamDecorator((data: string, ctx: ExecutionContext) => {
    const host = ctx.switchToHttp();
    const req: Request = host.getRequest();

    return data ? req.cookies?.[data] : req.cookies;
})