

export class HttpSuccess {
    public static Messages = {
        USER_CREATED: "User created, create a login request to authenticate.",
        LOGGED_IN: "Successfully created a refresh token, logging in...",
        LOGGED_OUT: "Succesfully logged out.",
        REFRESHED_TOK: "Created an authorizing token."
    };

    public static createSuccess(str: string, data?) {
        return {"success": str, ...data};
    }
}