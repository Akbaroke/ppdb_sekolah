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
    try {
      const data = await this.userRepository.findOne({
        where: {
          email,
        },
      });

      if (!data) return null;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async existsByEmail(email: string): Promise<boolean> {
    try {
      const data = await this.userRepository.exists({ where: { email } });
      return data;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const data = await this.userRepository.findOne({
        where: { user_id: id },
      });

      return data;
    } catch (error) {
      throw error;
    }
  }
}
