import { OnModuleInit } from '@nestjs/common';
export declare class EmailService implements OnModuleInit {
    private transporter;
    private verificationTemplate;
    onModuleInit(): void;
    sendVerificationEmail(email: string, code: string): Promise<void>;
}
