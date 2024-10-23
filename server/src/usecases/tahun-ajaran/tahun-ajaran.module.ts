import { Module } from '@nestjs/common';
import { TahunAjaranModule } from 'src/domain/tahun-ajaran/tahun-ajaran.module';
import { TahunAjaranController } from './tahun-ajaran.controller';
import { UsecaseTahunAjaranService } from './tahun-ajaran.service';
import { PaginationService } from '../services/pagination.service';

@Module({
  imports: [TahunAjaranModule],
  providers: [UsecaseTahunAjaranService, PaginationService],
  controllers: [TahunAjaranController],
})
export class UsecaseTahunAjaranModule {}
