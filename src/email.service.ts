import { Injectable } from "@nestjs/common";
import { MailtrapClient } from "mailtrap";
import * as nodemailer from 'nodemailer';
import { Transporter } from "nodemailer";

/*
    Service that sends an email using the Mailtrap service
*/
@Injectable()
export class EmailService {
    
    private readonly mailtrapClient: MailtrapClient;
    private readonly sender = "EMAIL_SENDER" ;
    private readonly recipient = "EMAIL_RECIPIENT" ;

    private readonly transporter: Transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "MAILTRAP_USER",
          pass: "MAILTRAP_PASSWORD"
        }
    })

    async sendEmail(subject: string, text: string) {
        // send mail with defined transport object
        const info = await this.transporter.sendMail({
            from: this.sender, // sender address
            to: this.recipient, // list of receivers
            subject: subject, // Subject line
            text: text, // plain text body
        });
        console.log("Message sent: %s", info.messageId);
        return "Email sent";
    }

}