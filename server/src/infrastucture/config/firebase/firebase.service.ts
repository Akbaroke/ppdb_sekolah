import { Inject, Injectable, RequestTimeoutException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { app } from 'firebase-admin';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  storage: admin.storage.Storage;

  constructor(@Inject('FIREBASE_APP') private firebaseApp: app.App) {
    this.storage = firebaseApp.storage();
  }

  async upload(
    file: Express.Multer.File,
    folderName: string,
  ): Promise<{ id: string; url: string }> {
    try {
      const bucket = this.storage.bucket();
      const timestamp = Date.now();
      const fileName = `${timestamp}_${randomUUID()}`;
      const folder = bucket.file(`${folderName}/${fileName}`);

      const fileStream = folder.createWriteStream({
        metadata: {
          contentType: file.mimetype,
          cacheControl: 'public, max-age=31536000',
        },
        timeout: 5000,
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

        fileStream.end(file.buffer);
      });

      return { id: fileName, url: publicUrl };
    } catch (error) {
      if (error.code === 'ETIMEDOUT') {
        throw new RequestTimeoutException(
          'Jaringan bermasalah, silakan periksa koneksi internet Anda',
        );
      }

      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const bucket = this.storage.bucket();
      const file = bucket.file(id);

      const exist = await file.exists();
      if (exist[0] === true) {
        await Promise.all([file.makePrivate(), file.delete()]);
      }
    } catch (error) {
      throw error;
    }
  }
}
