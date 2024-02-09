import { Injectable } from '@nestjs/common';
import { File } from './file.entity';
import { EntityManager } from 'typeorm';
import { FirebaseService } from 'src/infrastucture/config/firebase/firebase.service';

// interface ICreateBerkas {
//   id_akta: string;
//   url_akta: string;
//   id_kartu_keluarga: string;
//   url_kartu_keluarga: string;
//   id_foto: string;
//   url_foto: string;
// }

interface ICreateBerkas {
  akta: Express.Multer.File;
  kartu_keluarga: Express.Multer.File;
  foto: Express.Multer.File;
}

@Injectable()
export class FileService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly firebaseService: FirebaseService,
  ) {}

  async createBerkas(
    user_id: string,
    { akta, foto, kartu_keluarga }: ICreateBerkas,
  ): Promise<File[]> {
    try {
      const data = await Promise.all([
        this.firebaseService.uploadImage(akta, user_id),
        this.firebaseService.uploadImage(foto, user_id),
        this.firebaseService.uploadImage(kartu_keluarga, user_id),
      ]);

      const berkas = this.entityManager.create(File, [
        { id: data[0].id, url: data[0].url },
        { id: data[1].id, url: data[1].url },
        { id: data[2].id, url: data[2].url },
      ]);

      return berkas;
    } catch (error) {
      throw error;
    }
  }

  async saveBerkas(
    files: File[],
    entityManager: EntityManager = this.entityManager,
  ): Promise<File[]> {
    return await entityManager.save(files);
  }
}
