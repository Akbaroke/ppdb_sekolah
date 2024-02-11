import { DataSource, EntityManager } from 'typeorm';
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { DataSiswa } from './data_siswa.entity';

@EventSubscriber()
export class DataSiswaSubscriber
  implements EntitySubscriberInterface<DataSiswa>
{
  constructor(
    dataSource: DataSource,
    private readonly entityManager: EntityManager,
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo(): typeof DataSiswa {
    return DataSiswa;
  }

  async beforeUpdate(event: UpdateEvent<DataSiswa>): Promise<void> {
    const now = new Date().getTime();
    event.entity.updated_at = now;
  }

  async beforeInsert(event: InsertEvent<DataSiswa>): Promise<void> {
    const now = new Date();
    event.entity.updated_at = now.getTime();

    const no_pendaftaran = await this.generateNoPendaftaran(now);
    event.entity.no_pendaftaran = no_pendaftaran;
  }

  async generateNoPendaftaran(now: Date): Promise<string> {
    let noPendaftaran: string;
    await this.entityManager.transaction(async (transactionalEntityManager) => {
      const result = await transactionalEntityManager.query(
        'SELECT no_pendaftaran FROM data_siswa ORDER BY no_pendaftaran DESC LIMIT 1 FOR UPDATE',
      );

      const lastNoPendaftaran = result.length ? result[0].no_pendaftaran : '0';

      const year = now.getFullYear().toString().slice(2);
      const month = ('0' + (now.getMonth() + 1)).slice(-2);
      const date = ('0' + now.getDate()).slice(-2);
      const increment = parseInt(lastNoPendaftaran.slice(-4)) + 1;
      const incrementedDigits = increment.toString().padStart(3, '0');

      noPendaftaran = `${year}${month}${date}${incrementedDigits}`;
    });

    return noPendaftaran;
  }
}
