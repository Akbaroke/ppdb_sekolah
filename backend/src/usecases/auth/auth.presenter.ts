import { ApiProperty } from '@nestjs/swagger';
import { IMessage } from '../message.interface';
import { HttpStatus } from '@nestjs/common';

export class ResponseRegister implements IMessage {
  @ApiProperty({ example: HttpStatus.CREATED, type: Number })
  httpStatus: number;

  @ApiProperty({ example: 'Verifikasi akun terlebih dahulu', type: String })
  message: string;

  @ApiProperty({ example: 'admin@gmail.com', type: String })
  email: string;
}

export class ResponseLogin implements IMessage {
  @ApiProperty({ example: HttpStatus.OK, type: Number })
  httpStatus: number;

  @ApiProperty({ example: 'Login berhasil', type: String })
  message: string;

  @ApiProperty({ example: 'token', type: 'string' })
  token: string;
}

export class ResponseGetOTP implements IMessage {
  @ApiProperty({ example: HttpStatus.OK, type: Number })
  httpStatus: number;

  @ApiProperty({ example: 'Token berhasil dikirim', type: String })
  message: string;

  @ApiProperty({ example: 'admin@gmail.com', type: String })
  email: string;
}

export class ResponsePostOTP implements IMessage {
  @ApiProperty({ example: HttpStatus.OK, type: Number })
  httpStatus: number;

  @ApiProperty({ example: '', type: String })
  message: string;

  @ApiProperty({ example: 'admin@gmail.com', type: String })
  email: string;

  @ApiProperty({ example: 'token', type: String })
  token: string;
}

export class ResponseResetPassword implements IMessage {
  @ApiProperty({ example: HttpStatus.OK, type: Number })
  httpStatus: number;

  @ApiProperty({ example: 'Reset password berhasil', type: String })
  message: string;
}

export class ResponseRefreshToken implements IMessage {
  @ApiProperty({ example: HttpStatus.OK, type: Number })
  httpStatus: number;

  @ApiProperty({ example: 'RefreshToken berhasil', type: String })
  message: string;

  @ApiProperty({ example: 'token', type: String })
  token: string;
}
