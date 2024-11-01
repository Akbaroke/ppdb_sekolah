import validator from 'validator';
import {
  ValidationOptions,
  registerDecorator,
  ValidationArguments,
} from 'class-validator';

export function IsAlphaAndSlash(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsAlphaAndSlash',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string) {
          if (
            value === undefined ||
            !validator.isAlpha(validator.blacklist(value, ' /')) ||
            validator.trim(value).replace(/\s+/g, ' ') !== value ||
            value.replace(/\/+/g, '/') !== value
          ) {
            return false;
          }
          return true;
        },
        defaultMessage(validationArguments: ValidationArguments) {
          return (
            (validationArguments.object as any)[
              `${validationArguments.property}_error`
            ] || `${propertyName} hanya a-z, A-Z, spasi dan /`
          );
        },
      },
    });
  };
}
