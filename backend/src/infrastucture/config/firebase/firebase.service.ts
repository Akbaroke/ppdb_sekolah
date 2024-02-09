import { Injectable } from '@nestjs/common';
import { FirebaseRepository } from './firebase.repository';

@Injectable()
export class FirebaseService {
  constructor(private readonly firebaseRepository: FirebaseRepository) {}

  async uploadImage(
    image: Express.Multer.File,
    folderName: string,
  ): Promise<{ id: string; url: string }> {
    try {
      const imageUrl = await this.firebaseRepository.uploadImage(
        image,
        folderName,
      );
      return imageUrl;
    } catch (error) {
      throw error;
    }
  }
}
