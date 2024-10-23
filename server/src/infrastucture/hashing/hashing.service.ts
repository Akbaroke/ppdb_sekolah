import { Injectable } from '@nestjs/common';
import { IHashingService } from './hashing.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashingService implements IHashingService {
  async encrypt(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async decrypt(password: string, hashPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword);
  }
}
