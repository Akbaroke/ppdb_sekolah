import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsStrongPassword,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({ required: true, example: 'token', type: 'string' })
  @IsNotEmpty({ message: 'token harus diisi' })
  @IsString({ message: 'type token harus string' })
  token: string;

  @ApiProperty({ required: true, example: 'admin@gmail.com', type: String })
  @IsEmail({}, { message: 'email tidak sah' })
  email: string;

  @ApiProperty({
    required: true,
    description: 'Password harus memiliki angka',
    minLength: 12,
    example: 'AdminAja123_',
    type: String,
  })
  @IsNotEmpty({ message: 'new_password harus di isi' })
  @IsString({ message: 'Type new_password harus string' })
  @MinLength(8, { message: 'new_password minimal 8 characters' })
  @IsStrongPassword(
    {
      minNumbers: 1,
      minSymbols: 0,
      minLowercase: 0,
      minUppercase: 0,
    },
    {
      message: 'new_password harus memiliki angka',
    },
  )
  new_password: string;
}
