import { Module } from '@nestjs/common';
import { KelasModule } from 'src/domain/kelas/kelas.module';
import { KelasController } from './kelas.controller';
import { UsecaseKelasService } from './kelas.service';
import { TahunAjaranModule } from 'src/domain/tahun-ajaran/tahun-ajaran.module';
import { PaginationService } from '../services/pagination.service';

@Module({
  imports: [KelasModule, TahunAjaranModule],
  controllers: [KelasController],
  providers: [UsecaseKelasService, PaginationService],
})
export class UsecaseKelasModule {}
