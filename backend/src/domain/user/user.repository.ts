import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserRepository } from './user.interface';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findOneByEmail(email: string): Promise<User> {
    const data = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!data) return null;

    return data;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const data = await this.userRepository.exists({ where: { email } });
    return data;
  }
}
