import { EntityManager, UpdateResult } from 'typeorm';
import { User } from './user.entity';
export declare enum STATUS_USER {
    PENDING = "pending",
    ACTIVE = "active",
    DELETE = "delete"
}
export declare enum ROLE_USER {
    USER = "user",
    ADMIN = "admin"
}
export interface IUserRepository {
    findOneByEmail(email: string): Promise<User>;
    existsByEmail(email: string): Promise<boolean>;
}
export interface IUserService extends Pick<IUserRepository, 'findOneByEmail'> {
    createTransactionUser(email: string, password: string): User;
    saveTransactionUser(user: User, entityManager: EntityManager): Promise<User>;
    existsByEmail(email: string): Promise<boolean>;
    verificationUser(user: User, entityManager: EntityManager): Promise<UpdateResult>;
    updateUser(email: string, payload: Partial<Pick<User, 'password' | 'status'>>, entityManager: EntityManager): Promise<UpdateResult>;
}
