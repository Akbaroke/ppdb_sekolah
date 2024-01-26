import { EntityManager, UpdateResult } from 'typeorm';
import { User } from './user.entity';

export enum STATUS_USER {
  PENDING = 'pending',
  ACTIVE = 'active',
  DELETE = 'delete',
}

export enum ROLE_USER {
  SISWA = 'siswa',
  GURU = 'guru',
}

export interface IUserRepository {
  findOneByEmail(email: string): Promise<User>;
  existsByEmail(email: string): Promise<boolean>;
}

export interface IUserService extends Pick<IUserRepository, 'findOneByEmail'> {
  createTransactionUser(email: string, password: string): User;
  saveTransactionUser(user: User, entityManager: EntityManager): Promise<User>;
  existsByEmail(email: string): Promise<boolean>;
  verificationUser(
    user: User,
    entityManager: EntityManager,
  ): Promise<UpdateResult>;
  updateUser(
    email: string,
    payload: Partial<Pick<User, 'password' | 'status'>>,
    entityManager: EntityManager,
  ): Promise<UpdateResult>;
}