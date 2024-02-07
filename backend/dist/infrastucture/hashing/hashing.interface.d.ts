export interface IHashingService {
    encrypt(password: string): Promise<string>;
    decrypt(password: string, hashPassword: string): Promise<boolean>;
}
