import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LocalStorageService {
  async upload(
    file: Express.Multer.File,
    folderName: string,
  ): Promise<{ id: string; url: string }> {
    try {
      const timestamp = new Date().getTime();
      const fileExtension = path.extname(file.originalname);
      const fileName = `${timestamp}_${randomUUID()}${fileExtension}`;
      const filePath = path.join(
        __dirname,
        '..',
        'uploads',
        folderName,
        fileName,
      );

      const directoryPath = path.dirname(filePath);
      if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
      }

      fs.writeFileSync(filePath, file.buffer);

      const publicUrl = `/uploads/${folderName}/${fileName}`;

      return { id: fileName, url: publicUrl };
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const filePath = path.join(__dirname, '..', 'uploads', id);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (error) {
      throw error;
    }
  }
}
