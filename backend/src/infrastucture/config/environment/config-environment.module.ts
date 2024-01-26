import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({})
export class ConfigEnvironmentModule {
  static register(node_env: string): DynamicModule {
    const envFile = `env/${node_env !== 'production' ? 'dev' : ''}.env`;
    return {
      module: ConfigEnvironmentModule,
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: envFile,
          cache: true,
          load: [],
          expandVariables: true,
        }),
      ],
      exports: [ConfigEnvironmentModule],
    };
  }
}
