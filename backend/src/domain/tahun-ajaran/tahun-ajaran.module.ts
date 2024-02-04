import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TahunAjaran } from './tahun-ajaran.entity';
import { TahunAjaranRepository } from './tahun-ajaran.repository';
import { TahunAjaranService } from './tahun-ajaran.service';
import { Kelas } from '../kelas/kelas.entity';
import { TahunAjaranSubscriber } from './tahun-ajaran.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([TahunAjaran, Kelas])],
  providers: [TahunAjaranRepository, TahunAjaranService, TahunAjaranSubscriber],
  exports: [TahunAjaranService],
})
export class TahunAjaranModule {}
