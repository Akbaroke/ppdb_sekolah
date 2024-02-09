import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from 'src/infrastucture/common/guards/role.guard';
import { TokenModule } from 'src/domain/token/token.module';
import { UsecaseTahunAjaranModule } from './tahun-ajaran/tahun-ajaran.module';
import { UsecaseKelasModule } from './kelas/kelas.module';
import { DaftarSiswaModule } from './daftar-siswa/daftar-siswa.module';

@Module({
  imports: [
    TokenModule,
    AuthModule,
    DaftarSiswaModule,
    UsecaseTahunAjaranModule,
    UsecaseKelasModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class UsecaseModule {}
