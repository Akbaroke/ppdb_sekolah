import { Module } from '@nestjs/common';
import { SiswaModule } from 'src/domain/siswa/siswa.module';
import { WaliSiswaModule } from 'src/domain/wali-siswa/wali-siswa.module';
import { DaftarSiswaController } from './daftar-siswa.controller';
import { DaftarSiswaService } from './daftar-siswa.service';
import { UserModule } from 'src/domain/user/user.module';
import { FileModule } from 'src/domain/file/file.module';
import { DataSiswaModule } from 'src/domain/data-siswa/data_siswa.module';

@Module({
  imports: [
    FileModule,
    UserModule,
    SiswaModule,
    WaliSiswaModule,
    DataSiswaModule,
  ],
  providers: [DaftarSiswaService],
  controllers: [DaftarSiswaController],
})
export class DaftarSiswaModule {}
