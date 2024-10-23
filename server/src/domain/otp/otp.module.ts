import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { Otp } from './otp.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpRepository } from './otp.repository';
import { OtpGenerator } from 'src/infrastucture/authentication/otp-management/otp.service';

@Module({
  imports: [TypeOrmModule.forFeature([Otp])],
  providers: [OtpService, OtpRepository, OtpGenerator],
  exports: [OtpService],
})
export class OtpModule {}
