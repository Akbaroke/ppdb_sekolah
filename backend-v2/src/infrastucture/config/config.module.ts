import { Module } from '@nestjs/common';
import { ConfigEnvironmentModule } from './environment/config-environment.module';
import { ConfigTypeormModule } from './typeorm/config-typeorm.module';

@Module({
  imports: [
    ConfigEnvironmentModule.register(process.env.NODE_ENV),
    ConfigTypeormModule,
  ],
  exports: [ConfigEnvironmentModule, ConfigTypeormModule],
})
export class ConfigModule {}
