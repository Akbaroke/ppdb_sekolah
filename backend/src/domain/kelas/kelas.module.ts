import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Kelas } from './kelas.entity';
import { KelasRepository } from './kelas.repository';
import { KelasService } from './kelas.service';
import { KelasSubscriber } from './kelas.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([Kelas])],
  providers: [KelasRepository, KelasService, KelasSubscriber],
  exports: [KelasService],
})
export class KelasModule {}
