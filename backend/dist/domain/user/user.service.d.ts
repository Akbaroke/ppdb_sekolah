import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { EntityManager, UpdateResult } from 'typeorm';
import { IUserService } from './user.interface';
export declare class UserService implements IUserService {
    private readonly userRepository;
    private readonly entityManager;
    constructor(userRepository: UserRepository, entityManager: EntityManager);
    createTransactionUser(email: string, password: string): User;
    findOneByEmail(email: string): Promise<User>;
    existsByEmail(email: string): Promise<boolean>;
    verificationUser(user: User, entityManager?: EntityManager): Promise<UpdateResult>;
    saveTransactionUser(user: User, entityManager?: EntityManager): Promise<User>;
    updateUser(email: string, payload: Partial<Pick<User, 'password' | 'status'>>, entityManager?: EntityManager): Promise<UpdateResult>;
    private updateTransactionUser;
}
