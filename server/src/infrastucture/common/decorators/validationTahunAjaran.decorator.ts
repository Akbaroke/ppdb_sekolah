import validator from 'validator';
import {
  ValidationOptions,
  registerDecorator,
  ValidationArguments,
} from 'class-validator';

export const validationTahunAjaran = (
  validationOptions?: ValidationOptions,
) => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'validationTahunAjaran',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string, validationArguments: ValidationArguments) {
          if (value === undefined || value === '') {
            (validationArguments.object as any)[
              `${validationArguments.property}_error`
            ] = `${propertyName} tidak boleh kosong`;
            return false;
          }

          if (!validator.isNumeric(validator.blacklist(value, '/'))) {
            return false;
          }

          if (value[4] !== '/') {
            (validationArguments.object as any)[
              `${validationArguments.property}_error`
            ] = `${propertyName} harus seperti '2020/2021'`;
            return false;
          }

          const isTrue = isTahunAjaranValid(value);

          if (!isTrue) {
            (validationArguments.object as any)[
              `${validationArguments.property}_error`
            ] = 'Tolong masukkan tahun ajaran yang benar';

            return false;
          }

          return true;
        },
        defaultMessage(validationArguments: ValidationArguments) {
          return (
            (validationArguments.object as any)[
              `${validationArguments.property}_error`
            ] || `${propertyName} hanya diperbolehkan 0 - 9 dan '/'`
          );
        },
      },
    });
  };
};

const isTahunAjaranValid = (tahunAjaran: string): boolean => {
  const splitTahunAjaran = tahunAjaran.split('/');
  const tahunAjaran1 = Number(splitTahunAjaran[0]);
  const tahunAjaran2 = Number(splitTahunAjaran[1]);
  const currentYear = new Date().getFullYear();

  if (
    tahunAjaran1 > currentYear ||
    tahunAjaran2 > currentYear + 1 ||
    tahunAjaran1 !== tahunAjaran2 - 1
  ) {
    return false;
  }

  return true;
};
