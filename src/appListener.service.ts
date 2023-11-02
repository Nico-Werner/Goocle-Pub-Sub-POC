import { Injectable } from '@nestjs/common';
import { EmailService } from './email.service';
import { MessageContent } from './messageContentInterface';

@Injectable()
export class ListenerService {

    constructor(private readonly emailService: EmailService) {}

    listen(content: MessageContent): void {
        this.listenForMessages(content);
    }

    // This method is called by the listener controller when a message is sent to it. The message is sent to the email service.
    async listenForMessages(content: MessageContent) {
        console.log("message " + content);

        if(content.type == "email"){
            await this.emailService.sendEmail("Test", content.message.toString());
        }
    }
}