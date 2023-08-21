import * as bcrypt from 'bcrypt';

export default class Generator {

    private static NONCE_IDENTIFIER = 45600 as const;

    public static generateNonce() {
        return ((((Date.now() / 1000) + 47) * 10000) - Generator.NONCE_IDENTIFIER).toString();
    }

    public static async generateSalt(byteLen: number) {
        
        const salt = await bcrypt.genSalt(byteLen);
        return salt;
    }
}