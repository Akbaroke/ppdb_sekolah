import { Module } from '@nestjs/common';
import { SiswaService } from './siswa/siswa.service';
import { SiswaController } from './siswa/siswa.controller';
import { DataSiswaModule } from 'src/domain/data-siswa/data_siswa.module';
import { KelasModule } from 'src/domain/kelas/kelas.module';
import { FileModule } from 'src/domain/file/file.module';
import { PaginationService } from '../services/pagination.service';

@Module({
  imports: [DataSiswaModule, KelasModule, FileModule],
  providers: [SiswaService, PaginationService],
  controllers: [SiswaController],
  exports: [SiswaService],
})
export class AdminModule {}
