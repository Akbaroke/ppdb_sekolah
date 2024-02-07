import { IHashingService } from './hashing.interface';
export declare class HashingService implements IHashingService {
    encrypt(password: string): Promise<string>;
    decrypt(password: string, hashPassword: string): Promise<boolean>;
}
