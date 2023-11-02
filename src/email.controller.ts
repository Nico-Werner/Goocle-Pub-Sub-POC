import { Controller, Get, Post } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller("/email")
export class EmailController {

    constructor(private readonly emailService: EmailService) {}

    @Post("/send")
    sendEmail():  Promise<string> {
        return this.emailService.sendEmail("Test", "This is a test");
    }

}