import { Module } from '@nestjs/common';
import { TahunAjaranServiceModule } from 'src/domain/tahun-ajaran/tahun-ajaran.module';
import { TahunAjaranController } from './tahun-ajaran.controller';

@Module({
  imports: [TahunAjaranServiceModule],
  controllers: [TahunAjaranController],
})
export class TahunAjaranModule {}
