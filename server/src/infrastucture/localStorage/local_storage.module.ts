import { Module } from '@nestjs/common';
import { LocalStorageService } from './local_storage.sevice';

@Module({
  providers: [LocalStorageService],
  exports: [LocalStorageService],
})
export class LocalStorageModule {}
