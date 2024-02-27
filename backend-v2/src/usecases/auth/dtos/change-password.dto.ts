import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({
    required: true,
    description: 'Password harus memiliki angka',
    minLength: 12,
    example: 'AdminAja123_',
    type: String,
  })
  @IsNotEmpty({ message: 'old_password harus di isi' })
  @IsString({ message: 'Type old_password harus string' })
  @MinLength(8, { message: 'old_password minimal 8 characters' })
  @IsStrongPassword(
    {
      minNumbers: 1,
      minSymbols: 0,
      minLowercase: 0,
      minUppercase: 0,
    },
    {
      message: 'old_password harus memiliki angka',
    },
  )
  old_password: string;

  @ApiProperty({
    required: true,
    description: 'Password harus memiliki angka',
    minLength: 12,
    example: 'passwordBaru123',
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
