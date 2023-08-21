import { HttpStatus, NotAcceptableException } from "@nestjs/common";
import UniteException from "src/exceptions/UniteException";


export class CredentialExistsException extends UniteException {
    constructor() {
        super("The credentials you used already exist in our system!", HttpStatus.NOT_ACCEPTABLE);
    }
}