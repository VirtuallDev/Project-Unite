import { NotAcceptableException } from "@nestjs/common";


export class CredentialExistsException extends NotAcceptableException {
    constructor() {
        super("The credentials you used already exist in our system!");
    }
}