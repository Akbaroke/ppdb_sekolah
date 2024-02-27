import {
  Injectable,
  PipeTransform,
  UnsupportedMediaTypeException,
  BadRequestException,
  PayloadTooLargeException,
} from '@nestjs/common';

@Injectable()
export class ParseFilePipe implements PipeTransform {
  async transform(value: any) {
    const file = value;

    if (!file) {
      throw new BadRequestException('File harus diunggah.');
    }

    if (!/(jpg|png|jpeg|pdf)/.test(file.mimetype)) {
      throw new UnsupportedMediaTypeException(
        `Tipe file tidak diperbolehkan`,
        `Tipe file tidak diperbolehkan: ${file.originalname}`,
      );
    }

    if (file.size > 1 * 1024 * 1024) {
      throw new PayloadTooLargeException(
        `Ukuran file terlalu besar`,
        `Ukuran file terlalu besar: ${file.originalname}`,
      );
    }

    return value;
  }
}
