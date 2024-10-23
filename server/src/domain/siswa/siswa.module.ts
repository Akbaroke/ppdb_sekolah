import { Module } from '@nestjs/common';
import { SiswaRepository } from './siswa.repository';
import { SiswaService } from './siswa.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Siswa } from './siswa.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Siswa])],
  providers: [SiswaRepository, SiswaService],
  exports: [SiswaService],
})
export class SiswaModule {}
