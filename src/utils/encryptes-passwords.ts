import * as bcript from 'bcryptjs';

export class EncryptesPassword {

    // encrypted
    async encrypte(passowrd: string): Promise<any> {
        const salt = await bcript.genSalt(5);
        const hash = await bcript.hash(passowrd, salt);
        return hash;
    }
    // decryped
    async decrypted (password: string, hash: string): Promise<any> {
        const resutl = await bcript.compare(password, hash);
        return resutl;
    }
}