import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { IEmailService } from 'src/infrastucture/email/nodemailer.interface';

@Injectable()
export class NodemailerService implements IEmailService {
  constructor(private readonly configService: ConfigService) {}

  private transporter(): nodemailer.Transporter {
    return nodemailer.createTransport({
      host: 'smtp.gmail.com',
      auth: {
        user: this.configService.getOrThrow('smtp_user'),
        pass: this.configService.getOrThrow('smtp_password'),
      },
    });
  }

  private sendEmail(to: string, subject: string, body: string): void {
    try {
      this.transporter().sendMail({
        from: this.configService.getOrThrow('smtp_user'),
        to,
        subject,
        html: body,
      });
    } catch (error) {
      throw error;
    }
  }

  sendVerificationEmail(to: string, otp: string): void {
    try {
      const body = `<h1 style="text-align: center;">${otp}</h1>`;
      const subject = 'verifikasi akun';
      this.sendEmail(to, subject, body);
    } catch (error) {
      throw error;
    }
  }

  sendForgotPassword(to: string, otp: string): void {
    try {
      const body = `<h1 style="text-align: center;">${otp}</h1>`;
      const subject = 'Lupa Password';
      this.sendEmail(to, subject, body);
    } catch (error) {
      throw error;
    }
  }
}
