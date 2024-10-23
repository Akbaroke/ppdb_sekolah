import {
  EntitySubscriberInterface,
  EventSubscriber,
  DataSource,
  UpdateEvent,
} from 'typeorm';
import { TahunAjaran } from './tahun-ajaran.entity';

@EventSubscriber()
export class TahunAjaranSubscriber
  implements EntitySubscriberInterface<TahunAjaran>
{
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo(): typeof TahunAjaran {
    return TahunAjaran;
  }

  async beforeUpdate(event: UpdateEvent<TahunAjaran>): Promise<void> {
    const now = new Date().getTime();
    event.entity.updated_at = now;
  }
}
