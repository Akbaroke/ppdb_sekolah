import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HashingModule } from 'src/infrastucture/hashing/hashing.module';
import { UserModule } from 'src/domain/user/user.module';
import { NodemailerModule } from 'src/infrastucture/email/nodemailer.module';
import { OtpModule } from 'src/domain/otp/otp.module';
import { TokenModule } from 'src/domain/token/token.module';
import { BlacklistService } from './blacklist.service';

@Module({
  imports: [
    NodemailerModule,
    HashingModule,
    UserModule,
    TokenModule,
    OtpModule,
  ],
  providers: [AuthService, BlacklistService],
  controllers: [AuthController],
})
export class AuthModule {}
