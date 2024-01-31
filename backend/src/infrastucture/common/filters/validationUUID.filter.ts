import {
  PipeTransform,
  Injectable,
  BadRequestException,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ValidationUUID implements PipeTransform {
  private parseUUIDPipe: ParseUUIDPipe;

  constructor() {
    this.parseUUIDPipe = new ParseUUIDPipe({
      exceptionFactory: () => new BadRequestException('id tidak valid'),
    });
  }

  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'param') {
      return value;
    }

    return this.parseUUIDPipe.transform(value, metadata);
  }
}
