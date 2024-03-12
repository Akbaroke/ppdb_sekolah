import {
  EntitySubscriberInterface,
  EventSubscriber,
  DataSource,
  UpdateEvent,
} from 'typeorm';
import { Kelas } from './kelas.entity';
import { BadRequestException } from '@nestjs/common';

@EventSubscriber()
export class KelasSubscriber implements EntitySubscriberInterface<Kelas> {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo(): typeof Kelas {
    return Kelas;
  }

  async beforeUpdate(event: UpdateEvent<Kelas>): Promise<void> {
    const now = new Date().getTime();
    event.entity.updated_at = now;

    const { entity } = event;
    if (
      entity.jumlah_siswa &&
      entity.kapasitas &&
      entity.jumlah_siswa > entity.kapasitas
    ) {
      throw new BadRequestException(
        'Jumlah siswa tidak boleh melebihi kapasitas',
      );
    }
  }
}
