import {
  PipeTransform,
  Injectable,
  BadRequestException,
  UnsupportedMediaTypeException,
  PayloadTooLargeException,
} from '@nestjs/common';

@Injectable()
export class ParseFilesPipe implements PipeTransform {
  async transform(value: Record<string, Express.Multer.File[]>) {
    for (const propertyName in value) {
      const files = value[propertyName];

      if (!files || !Array.isArray(files) || files.length === 0) {
        throw new BadRequestException(`Property ${propertyName} harus diisi.`);
      }

      for (const file of files) {
        if (!/(jpg|png|jpeg|pdf)/.test(file.mimetype)) {
          throw new UnsupportedMediaTypeException(
            `type file tidak diperbolehkan ${propertyName}: ${file.originalname}`,
          );
        }

        if (file.size > 1 * 1024 * 1024) {
          throw new PayloadTooLargeException(
            `File max 1 mb ${propertyName}: ${file.originalname}`,
          );
        }
      }
    }

    return value;
  }
}
