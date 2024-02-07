import { EntitySubscriberInterface, DataSource, UpdateEvent } from 'typeorm';
import { User } from './user.entity';
export declare class UserSubscriber implements EntitySubscriberInterface<User> {
    constructor(dataSource: DataSource);
    listenTo(): typeof User;
    beforeUpdate(event: UpdateEvent<User>): Promise<void>;
}
