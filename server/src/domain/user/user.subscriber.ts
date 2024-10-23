import {
  EntitySubscriberInterface,
  EventSubscriber,
  DataSource,
  UpdateEvent,
} from 'typeorm';
import { User } from './user.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo(): typeof User {
    return User;
  }

  async beforeUpdate(event: UpdateEvent<User>): Promise<void> {
    const now = new Date().getTime();
    event.entity.updated_at = now;
  }
}
