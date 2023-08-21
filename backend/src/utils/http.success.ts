

export class HttpSuccess {
    public static Messages = {
        USER_CREATED: "User created, create a login request to authenticate."
    };

    public static createSuccess(str: string, data?) {
        return {"success": str, ...data};
    }
}