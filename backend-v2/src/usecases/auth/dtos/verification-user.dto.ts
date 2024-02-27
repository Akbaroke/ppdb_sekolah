import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TYPE_OTP } from 'src/domain/otp/otp.interface';

export class VerificationUserDto {
  @ApiProperty({ required: true, example: 'admin@gmail.com', type: String })
  @IsEmail({}, { message: 'email tidak sah' })
  email: string;

  @ApiProperty({
    required: true,
    description: 'Otp maksimal 5 angka',
    minLength: 5,
    example: '12345',
    type: String,
  })
  @IsNotEmpty({ message: 'otp harus di isi' })
  @IsString({ message: 'Type otp harus string' })
  @MinLength(5, { message: 'otp minimal 5 angka' })
  @MaxLength(5, { message: 'otp maksimal 5 angka' })
  otp: string;

  @IsNotEmpty({ message: 'type_otp harus di isi' })
  @IsString({ message: 'Type type_otp harus string' })
  @IsEnum(TYPE_OTP)
  type_otp: TYPE_OTP;
}
