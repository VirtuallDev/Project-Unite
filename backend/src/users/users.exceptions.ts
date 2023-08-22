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

export class UserNotFoundException extends UniteException {
    constructor() {
        super("The user you requested to identify as doesnt exist.", HttpStatus.NOT_ACCEPTABLE);
    }
}