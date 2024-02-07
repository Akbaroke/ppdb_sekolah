import { ConfigService } from '@nestjs/config';
import { IEmailService } from 'src/infrastucture/email/nodemailer.interface';
export declare class NodemailerService implements IEmailService {
    private readonly configService;
    constructor(configService: ConfigService);
    private transporter;
    private sendEmail;
    sendVerificationEmail(to: string, otp: string): Promise<void>;
    sendForgotPassword(to: string, otp: string): Promise<void>;
}
