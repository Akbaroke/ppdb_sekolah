import { Inject, Injectable } from '@nestjs/common';
import { app } from 'firebase-admin';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseRepository {
  storage: admin.storage.Storage;

  constructor(@Inject('FIREBASE_APP') private firebaseApp: app.App) {
    this.storage = firebaseApp.storage();
  }

  async uploadImage(
    image: Express.Multer.File,
    folderName: string,
  ): Promise<{ id: string; url: string }> {
    try {
      const bucket = this.storage.bucket();
      const timestamp = Date.now();
      const fileName = `${timestamp}_${image.originalname}`;
      const folder = bucket.file(`${folderName}/${fileName}`);
      const fileStream = folder.createWriteStream({
        metadata: {
          contentType: image.mimetype,
        },
      });

      const publicUrl = await new Promise<string>((resolve, reject) => {
        fileStream.on('error', (error) => {
          reject(error);
        });

        fileStream.on('finish', async () => {
          await folder.makePublic();
          const url = folder.publicUrl();
          resolve(url);
        });

        fileStream.end(image.buffer);
      });

      return { id: fileName, url: publicUrl };
    } catch (error) {
      throw error;
    }
  }
}
