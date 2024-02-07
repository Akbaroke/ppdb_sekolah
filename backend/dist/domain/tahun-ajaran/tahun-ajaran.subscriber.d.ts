import { EntitySubscriberInterface, DataSource, UpdateEvent } from 'typeorm';
import { TahunAjaran } from './tahun-ajaran.entity';
export declare class TahunAjaranSubscriber implements EntitySubscriberInterface<TahunAjaran> {
    constructor(dataSource: DataSource);
    listenTo(): typeof TahunAjaran;
    beforeUpdate(event: UpdateEvent<TahunAjaran>): Promise<void>;
}
