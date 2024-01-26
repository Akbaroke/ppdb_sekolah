import { Module } from '@nestjs/common';
import { CommonModule } from './infrastucture/common/common.module';
import { ConfigModule } from './infrastucture/config/config.module';
import { UseCaseModule } from './usecases/usecase.module';

@Module({
  imports: [CommonModule, ConfigModule, UseCaseModule],
})
export class AppModule {}
