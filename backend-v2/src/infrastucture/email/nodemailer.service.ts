import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { IEmailService } from 'src/infrastucture/email/nodemailer.interface';

@Injectable()
export class NodemailerService implements IEmailService {
  constructor(private readonly configService: ConfigService) {}

  private transporter(): nodemailer.Transporter {
    try {
      return nodemailer.createTransport({
        host: 'smtp.gmail.com',
        auth: {
          user: this.configService.getOrThrow('SMTP_USER'),
          pass: this.configService.getOrThrow('SMTP_PASSWORD'),
        },
      });
    } catch (error) {
      throw error;
    }
  }

  private async sendEmail(
    to: string,
    subject: string,
    body: string,
  ): Promise<void> {
    try {
      await this.transporter().sendMail({
        from: this.configService.getOrThrow('SMTP_USER'),
        to,
        subject,
        html: body,
      });
    } catch (error) {
      throw error;
    }
  }

  async sendVerificationEmail(to: string, otp: string): Promise<void> {
    try {
      const body = `<h1 style="text-align: center;">${otp}</h1>`;
      const subject = 'verifikasi akun';
      await this.sendEmail(to, subject, body);
    } catch (error) {
      throw error;
    }
  }

  async sendForgotPassword(to: string, otp: string): Promise<void> {
    try {
      const body = `<h1 style="text-align: center;">${otp}</h1>`;
      const subject = 'Lupa Password';
      await this.sendEmail(to, subject, body);
    } catch (error) {
      throw error;
    }
  }
}
