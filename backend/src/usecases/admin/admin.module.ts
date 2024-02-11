import { Module } from '@nestjs/common';
import { PendaftaranService } from './pendaftar/pendaftar.service';
import { PendaftarController } from './pendaftar/pendaftar.controller';
import { DataSiswaModule } from 'src/domain/data-siswa/data_siswa.module';
import { KelasModule } from 'src/domain/kelas/kelas.module';

@Module({
  imports: [DataSiswaModule, KelasModule],
  providers: [PendaftaranService],
  controllers: [PendaftarController],
  exports: [PendaftaranService],
})
export class AdminModule {}
