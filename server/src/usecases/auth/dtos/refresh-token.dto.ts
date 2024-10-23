import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty({
    required: true,
    example: 'masukin token dari response login',
    type: String,
  })
  @IsString()
  @IsNotEmpty({ message: 'token harus diisi' })
  accessToken: string;
}
