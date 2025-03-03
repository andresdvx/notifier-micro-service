import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { welcomeTemplate } from 'src/common/templates/welcome.template';
import { transactionEmailTemplate } from 'src/common/templates/transaction.template';
import { IEmailModel } from 'src/modules/notifier/domain/models/email.model.interface';
import { IEmailSender } from '../../domain/ports/emailSender.adapter.interface';

@Injectable()
export class EmailSenderAdapterImp implements IEmailSender<IEmailModel> {
  constructor() {}

  async createEmailSender(email: IEmailModel) {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: email.to,
      subject: email.subject,
      text: email.payload,
      html:
        email.type === 'welcome'
          ? welcomeTemplate(email.to)
          : transactionEmailTemplate(email.to, 2000, 'income'),
    });
  }
}
