import { HttpException } from "@nestjs/common";

export default class UniteException extends HttpException {
    public data;
    constructor(message: string, status: number, data = {}) {
        super(message, status);
        this.data = data;
    }
}