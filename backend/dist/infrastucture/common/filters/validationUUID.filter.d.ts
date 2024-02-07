import { PipeTransform } from '@nestjs/common';
import { ArgumentMetadata } from '@nestjs/common';
export declare class ValidationUUID implements PipeTransform {
    private parseUUIDPipe;
    constructor();
    transform(value: any, metadata: ArgumentMetadata): any;
}
