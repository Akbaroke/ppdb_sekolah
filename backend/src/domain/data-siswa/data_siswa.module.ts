import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSiswa } from './data_siswa.entity';
import { DataSiswaService } from './data_siswa.service';

@Module({
  imports: [TypeOrmModule.forFeature([DataSiswa])],
  providers: [DataSiswaService],
  exports: [DataSiswaService],
})
export class DataSiswaModule {}
