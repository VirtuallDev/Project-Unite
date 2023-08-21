import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import UniteException from "./UniteException";
import { Request, Response } from "express";



@Catch(UniteException)
export class UniteExceptionFilter implements ExceptionFilter {
    catch(exception: UniteException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const req = ctx.getRequest<Request>();
        const res = ctx.getResponse<Response>();

        res.status(exception.getStatus() ?? 400).send({
            'error': exception.getResponse(),
            ...exception.data
        })
    }
}