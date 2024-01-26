import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsStrongPassword,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ required: true, example: 'admin@gmail.com', type: String })
  @IsEmail({}, { message: 'email tidak sah' })
  email: string;

  @ApiProperty({
    required: true,
    description:
      'Password harus memiliki 1 simbol, 1 angka, 1 huruf besar dan 1 huruf kecil',
    minLength: 12,
    example: 'AdminAja123_',
    type: String,
  })
  @IsNotEmpty({ message: 'password harus di isi' })
  @IsString({ message: 'Type password harus string' })
  @MinLength(12, { message: 'password minimal 12 characters' })
  @IsStrongPassword(
    {
      minNumbers: 1,
      minSymbols: 0,
      minLowercase: 0,
      minUppercase: 0,
    },
    {
      message: 'password harus memiliki angka',
    },
  )
  password: string;

  constructor(partial: Partial<RegisterDto>) {
    Object.assign(this, partial);
  }
}
