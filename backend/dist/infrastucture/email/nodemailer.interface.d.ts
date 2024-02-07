export interface IEmailService {
    sendVerificationEmail(to: string, subject: string, otp: string): void;
}
