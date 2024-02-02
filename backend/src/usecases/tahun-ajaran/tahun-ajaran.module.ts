import { Module } from '@nestjs/common';
import { TahunAjaranModule } from 'src/domain/tahun-ajaran/tahun-ajaran.module';
import { TahunAjaranController } from './tahun-ajaran.controller';

@Module({
  imports: [TahunAjaranModule],
  controllers: [TahunAjaranController],
})
export class UsecaseTahunAjaranModule {}
