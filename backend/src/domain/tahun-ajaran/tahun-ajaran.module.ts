import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TahunAjaran } from './tahun-ajaran.entity';
import { TahunAjaranRepository } from './tahun-ajaran.repository';
import { TahunAjaranService } from './tahun-ajaran.service';
import { Kelas } from '../kelas/kelas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TahunAjaran, Kelas])],
  providers: [TahunAjaranRepository, TahunAjaranService],
  exports: [TahunAjaranService],
})
export class TahunAjaranModule {}
