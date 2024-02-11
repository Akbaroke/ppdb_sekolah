import { Injectable } from '@nestjs/common';
import { File } from './file.entity';
import { EntityManager } from 'typeorm';
import { FirebaseService } from 'src/infrastucture/config/firebase/firebase.service';
import { ICreateBerkas } from './file.interface';

@Injectable()
export class FileService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly firebaseService: FirebaseService,
  ) {}

  private getFileId(fileId: string): string {
    const id = fileId.split('_').slice(1).join('_');
    return id;
  }

  async createBerkas(user_id: string, files: ICreateBerkas): Promise<File[]> {
    try {
      const [akta, kartu_keluarga, foto] = await Promise.all([
        this.firebaseService.upload(files.akta, user_id),
        this.firebaseService.upload(files.kartu_keluarga, user_id),
        this.firebaseService.upload(files.foto, user_id),
      ]);

      const berkas = this.entityManager.create(File, [
        { file_id: `akta_${akta.id}`, url: akta.url },
        {
          file_id: `kk_${kartu_keluarga.id}`,
          url: kartu_keluarga.url,
        },
        { file_id: `foto_${foto.id}`, url: foto.url },
      ]);

      return berkas;
    } catch (error) {
      throw error;
    }
  }

  async deleteBerkas(folder: string, fileId: string): Promise<void> {
    try {
      const id = this.getFileId(fileId);
      await this.firebaseService.delete(`${folder}/${id}`);
    } catch (error) {
      throw error;
    }
  }

  async updateBerkas(
    folder: string,
    file_id: string,
    file: Express.Multer.File,
  ): Promise<void> {
    try {
      const id = this.getFileId(file_id);
      await this.deleteBerkas(folder, id);
      await this.firebaseService.update(`${folder}/${id}`, file);
    } catch (error) {
      throw error;
    }
  }

  async saveBerkas(
    files: File[],
    entityManager: EntityManager = this.entityManager,
  ): Promise<File[]> {
    try {
      return await entityManager.save(files);
    } catch (error) {
      throw error;
    }
  }
}
