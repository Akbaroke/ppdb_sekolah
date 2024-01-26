import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserSubscriber } from './user.subscriber';
import { Token } from '../token/token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Token])],
  providers: [UserService, UserRepository, UserSubscriber],
  exports: [UserService],
})
export class UserModule {}
