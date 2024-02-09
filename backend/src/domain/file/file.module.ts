import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './file.entity';
import { FileService } from './file.service';
import { FirebaseModule } from 'src/infrastucture/config/firebase/firebase.module';

@Module({
  imports: [FirebaseModule, TypeOrmModule.forFeature([File])],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
