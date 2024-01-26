import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.getOrThrow('database_host'),
        port: configService.getOrThrow('database_port'),
        database: configService.getOrThrow('database_name'),
        username: configService.getOrThrow('database_username'),
        password: configService.getOrThrow('database_password'),
        synchronize: configService.getOrThrow('database_synchronize'),
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [TypeOrmModule],
})
export class ConfigTypeormModule {}
