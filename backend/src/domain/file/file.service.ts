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

  private getFileId(file_firebase_id: string): string {
    const id = file_firebase_id.split('_').slice(1).join('_');
    return id;
  }

  async createIjazah(
    user_id: string,
    file: Express.Multer.File,
  ): Promise<File> {
    try {
      const ijazah = await this.firebaseService.upload(file, user_id);

      return this.entityManager.create(File, {
        file_firebase_id: `ijazah_${ijazah.id}`,
        url: ijazah.url,
      });
    } catch (error) {
      throw error;
    }
  }

  async createBerkas(folder: string, files: ICreateBerkas): Promise<File[]> {
    try {
      const [akta, kartu_keluarga, foto] = await Promise.all([
        this.firebaseService.upload(files.akta, folder),
        this.firebaseService.upload(files.kartu_keluarga, folder),
        this.firebaseService.upload(files.foto, folder),
      ]);

      const berkas = this.entityManager.create(File, [
        { file_firebase_id: `akta_${akta.id}`, url: akta.url },
        {
          file_firebase_id: `kk_${kartu_keluarga.id}`,
          url: kartu_keluarga.url,
        },
        { file_firebase_id: `foto_${foto.id}`, url: foto.url },
      ]);

      return berkas;
    } catch (error) {
      throw error;
    }
  }

  async deleteFile(folder: string, file_firebase_id: string): Promise<void> {
    try {
      const id = this.getFileId(file_firebase_id);
      await this.firebaseService.delete(`${folder}/${id}`);
    } catch (error) {
      throw error;
    }
  }

  async updateBerkas(
    folder: string,
    file_firebase_id: string,
    file: Express.Multer.File,
  ): Promise<void> {
    try {
      const upload = await this.firebaseService.upload(file, folder);

      await this.entityManager.update(
        File,
        { file_firebase_id },
        { file_firebase_id: upload.id, url: upload.url },
      );

      await this.deleteFile(folder, file_firebase_id);
    } catch (error) {
      throw error;
    }
  }

  async saveFiles(
    files: File[],
    entityManager: EntityManager = this.entityManager,
  ): Promise<File[]> {
    try {
      return await entityManager.save(files);
    } catch (error) {
      throw error;
    }
  }

  async saveFile(
    file: File,
    entityManager: EntityManager = this.entityManager,
  ): Promise<File> {
    try {
      return await entityManager.save(file);
    } catch (error) {
      throw error;
    }
  }
}
