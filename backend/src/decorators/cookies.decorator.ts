import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const CookieJar = createParamDecorator((data: string, ctx: ExecutionContext) => {
    const host = ctx.switchToHttp();
    const req: Request = host.getRequest();

    return data ? req.cookies?.[data] : req.cookies;
})