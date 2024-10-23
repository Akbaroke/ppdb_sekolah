import { Module } from '@nestjs/common';
import { WaliSiswaRepository } from './wali-siswa.repository';
import { WaliSiswaService } from './wali-siswa.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WaliSiswa } from './wali-siswa.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WaliSiswa])],
  providers: [WaliSiswaRepository, WaliSiswaService],
  exports: [WaliSiswaService],
})
export class WaliSiswaModule {}
