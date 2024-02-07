import { IUserRepository } from './user.interface';
import { User } from './user.entity';
import { Repository } from 'typeorm';
export declare class UserRepository implements IUserRepository {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    findOneByEmail(email: string): Promise<User>;
    existsByEmail(email: string): Promise<boolean>;
}
