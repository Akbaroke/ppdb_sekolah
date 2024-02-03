import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from 'src/infrastucture/common/guards/role.guard';
import { TokenModule } from 'src/domain/token/token.module';
import { UsecaseTahunAjaranModule } from './tahun-ajaran/tahun-ajaran.module';
import { UsecaseKelasModule } from './kelas/kelas.module';

@Module({
  imports: [
    TokenModule,
    AuthModule,
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
