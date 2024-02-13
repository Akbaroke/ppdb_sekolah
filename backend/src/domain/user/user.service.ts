import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { EntityManager, UpdateResult } from 'typeorm';
import { STATUS_USER } from './user.interface';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly entityManager: EntityManager,
  ) {}

  createTransactionUser(email: string, password: string): User {
    try {
      return this.entityManager.create(User, {
        email,
        password,
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(user_id: string): Promise<User> {
    try {
      const data = await this.userRepository.findOne(user_id);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      const data = await this.userRepository.findOneByEmail(email);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async existsByEmail(email: string): Promise<boolean> {
    try {
      return await this.userRepository.existsByEmail(email);
    } catch (error) {
      throw error;
    }
  }

  async verificationUser(
    user: User,
    entityManager: EntityManager = this.entityManager,
  ): Promise<UpdateResult> {
    try {
      return await this.updateTransactionUser(
        user,
        {
          status: STATUS_USER.ACTIVE,
        },
        entityManager,
      );
    } catch (error) {
      throw error;
    }
  }

  async saveTransactionUser(
    user: User,
    entityManager: EntityManager = this.entityManager,
  ): Promise<User> {
    try {
      return await entityManager.save(user);
    } catch (error) {
      throw error;
    }
  }

  async updateUser(
    email: string,
    payload: Partial<Pick<User, 'password' | 'status'>>,
    entityManager: EntityManager = this.entityManager,
  ): Promise<UpdateResult> {
    try {
      return await this.updateTransactionUser(
        { email },
        payload,
        entityManager,
      );
    } catch (error) {
      throw error;
    }
  }

  private async updateTransactionUser(
    user: User | { email: string },
    payload: Partial<Pick<User, 'password' | 'status'>>,
    entityManager: EntityManager = this.entityManager,
  ): Promise<UpdateResult> {
    try {
      return entityManager.update(User, user, payload || {});
    } catch (error) {
      throw error;
    }
  }
}
