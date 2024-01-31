import { IsNotEmpty, IsString } from 'class-validator';
import { RegisterDto } from './register-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto extends RegisterDto {}

export class MeDto {
  @ApiProperty({
    required: true,
    example: 'masukin token',
    type: String,
  })
  @IsString()
  @IsNotEmpty({ message: 'token harus diisi' })
  token: string;

  constructor(partial: Partial<MeDto>) {
    Object.assign(this, partial);
  }
}
