import { HttpStatus, NotAcceptableException } from "@nestjs/common";
import UniteException from "src/exceptions/UniteException";


export class CredentialExistsException extends UniteException {
    constructor() {
        super("The credentials you used already exist in our system!", HttpStatus.NOT_ACCEPTABLE);
    }
}

export class CredentialNotFoundException extends UniteException {
    constructor() {
        super("One or more of the credentials you entered is not right.", HttpStatus.NOT_ACCEPTABLE);
    }
}

export class UnAuthorizedException extends UniteException {
    constructor() {
        super("You are not logged in.", HttpStatus.UNAUTHORIZED);
    }
}