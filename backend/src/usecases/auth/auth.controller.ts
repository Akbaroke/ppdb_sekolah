import {
  Controller,
  Body,
  Post,
  Query,
  Get,
  ParseEnumPipe,
  HttpStatus,
  BadRequestException,
  Patch,
} from '@nestjs/common';
import { RegisterDto } from './dtos/register-user.dto';
import { AuthService } from './auth.service';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  ResponseGetOTP,
  ResponseLogin,
  ResponsePostOTP,
  ResponseRefreshToken,
  ResponseRegister,
  ResponseResetPassword,
} from './auth.presenter';
import { LoginDto, MeDto } from './dtos/login-user.dto';
import { VerificationUserDto } from './dtos/verification-user.dto';
import { TYPE_OTP } from 'src/domain/otp/otp.interface';
import { IMessage } from '../message.interface';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { GetUser } from 'src/infrastucture/common/decorators/getUser.decorator';
import { IPayloadToken } from 'src/infrastucture/authentication/token-management/token.interface';
import { ChangePasswordDto } from './dtos/change-password.dto';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: RegisterDto })
  @ApiOperation({ description: 'POST - api/register' })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'Registrasi berhasil',
    type: ResponseRegister,
  })
  @Post('register')
  async register_user(@Body() { email, password }: RegisterDto) {
    return await this.authService.register(email, password);
  }

  @ApiBody({ type: LoginDto })
  @ApiOperation({ description: 'POST - api/login' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Login berhasil',
    type: ResponseLogin,
  })
  @Post('login')
  async login(@Body() { email, password }: LoginDto) {
    return await this.authService.login(email, password);
  }

  @ApiOperation({ description: 'GET - api/otp' })
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      'untuk type forgot akan ada tambahan property email, sedangkan type register tidak ada property email',
    type: ResponseGetOTP,
  })
  @ApiQuery({ name: 'email', description: 'User email' })
  @ApiQuery({
    name: 'type_otp',
    description: 'Type OTP (forgot atau register)',
    enum: TYPE_OTP,
  })
  @Get('otp')
  async get_otp(
    @Query('email') email: string,
    @Query(
      'type_otp',
      new ParseEnumPipe(TYPE_OTP, {
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        exceptionFactory: () =>
          new BadRequestException('Type otp hanya ada forgot dan register'),
      }),
    )
    type_otp: string,
  ) {
    return await this.authService.refreshOtpOnRequest(email, type_otp);
  }

  @ApiOperation({ description: 'POST - api/otp' })
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      'untuk type forgot akan ada tambahan propery token, sedangkan type register tidak ada property token',
    type: ResponsePostOTP,
  })
  @Post('otp')
  async verifikasi_user(@Body() { email, otp, type_otp }: VerificationUserDto) {
    return await this.authService.verificationOTP(email, otp, type_otp);
  }

  @ApiOperation({ description: 'POST - api/me' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'cek aja di responsenya di api spek',
    type: Object,
  })
  @Post('me')
  async me(@Body() { token }: MeDto) {
    return await this.authService.me(token);
  }

  @ApiOperation({ description: 'PATCH - api/reset_password' })
  @ApiResponse({
    description: 'Berhasil ganti password',
    type: ResponseResetPassword,
    status: HttpStatus.OK,
  })
  @Patch('reset_password')
  async reset_password_user(
    @Body() { email, new_password, token }: ResetPasswordDto,
  ): Promise<IMessage> {
    return await this.authService.resetPassword(token, email, new_password);
  }

  @ApiOperation({ description: 'PATCH - api/change_password' })
  @ApiResponse({
    description: 'Berhasil ganti password',
    type: ResponseResetPassword,
    status: HttpStatus.OK,
  })
  @Patch('change_password')
  async change_password(
    @GetUser() { email }: IPayloadToken,
    @Body() { old_password, new_password }: ChangePasswordDto,
  ): Promise<IMessage> {
    return await this.authService.changePassword(
      email,
      old_password,
      new_password,
    );
  }

  @ApiOperation({ description: 'POST - api/refresh_token' })
  @ApiResponse({
    description: 'RefreshToken berhasil',
    type: ResponseRefreshToken,
    status: HttpStatus.OK,
  })
  @Post('refresh_token')
  async refresh_token(@Body() { accessToken }: RefreshTokenDto) {
    return await this.authService.refreshToken(accessToken);
  }
}
