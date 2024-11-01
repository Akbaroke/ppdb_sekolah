import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JWTService } from 'src/infrastucture/authentication/token-management/token.service';
import { Token } from './token.entity';
import { TokenService } from './token.service';
import { TokenRepository } from './token.repository';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.getOrThrow('JWT_PUBLIC_KEY'),
        signOptions: {
          expiresIn: '1d',
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Token]),
  ],
  providers: [TokenRepository, JWTService, TokenService],
  exports: [TokenService],
})
export class TokenModule {}
