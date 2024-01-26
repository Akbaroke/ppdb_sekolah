import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { EntityManager, UpdateResult } from 'typeorm';
import { IUserService, STATUS_USER } from './user.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly entityManager: EntityManager,
  ) {}

  createTransactionUser(email: string, password: string): User {
    return this.entityManager.create(User, {
      email,
      password,
    });
  }

  async findOneByEmail(email: string): Promise<User> {
    const data = await this.userRepository.findOneByEmail(email);
    return data;
  }

  async existsByEmail(email: string): Promise<boolean> {
    return await this.userRepository.existsByEmail(email);
  }

  async verificationUser(
    user: User,
    entityManager: EntityManager = this.entityManager,
  ): Promise<UpdateResult> {
    return await this.updateTransactionUser(
      user,
      {
        status: STATUS_USER.ACTIVE,
      },
      entityManager,
    );
  }

  async saveTransactionUser(
    user: User,
    entityManager: EntityManager = this.entityManager,
  ): Promise<User> {
    return await entityManager.save(user);
  }

  async updateUser(
    email: string,
    payload: Partial<Pick<User, 'password' | 'status'>>,
    entityManager: EntityManager = this.entityManager,
  ): Promise<UpdateResult> {
    return await this.updateTransactionUser({ email }, payload, entityManager);
  }

  private async updateTransactionUser(
    user: User | { email: string },
    payload: Partial<Pick<User, 'password' | 'status'>>,
    entityManager: EntityManager = this.entityManager,
  ): Promise<UpdateResult> {
    return entityManager.update(User, user, payload || {});
  }
}

// async createUser(email: string, hashPassword: string) {
//   try {
//     await this.entityManager.transaction(async (entityManager) => {
//       const user = entityManager.create(User, {
//         email,
//         password: hashPassword,
//       });

//       await this.emailService.sendEmail(email, 'verifikasi akun', 'halo');
//       return await entityManager.save(user);
//     });
//   } catch (error) {
//     throw error;
//   }
// }
