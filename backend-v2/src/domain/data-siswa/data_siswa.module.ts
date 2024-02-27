import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSiswa } from './data_siswa.entity';
import { DataSiswaService } from './data_siswa.service';
import { DataSiswaSubscriber } from './data_siswa.subscriber';
import { DataSiswaRepository } from './data_siswa.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DataSiswa])],
  providers: [DataSiswaRepository, DataSiswaService, DataSiswaSubscriber],
  exports: [DataSiswaService],
})
export class DataSiswaModule {}
