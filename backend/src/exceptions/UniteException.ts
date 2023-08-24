import { HttpException } from "@nestjs/common";

export default class UniteException extends HttpException {
    public data;
    constructor(message?: string, status?: number, data = {}) {
        super(message ?? "Something went wrong. Please contact our tech-support.", status ?? 400);
        this.data = data;
    }
}
