import { EntitySubscriberInterface, DataSource, UpdateEvent } from 'typeorm';
import { Kelas } from './kelas.entity';
export declare class KelasSubscriber implements EntitySubscriberInterface<Kelas> {
    constructor(dataSource: DataSource);
    listenTo(): typeof Kelas;
    beforeUpdate(event: UpdateEvent<Kelas>): Promise<void>;
}
