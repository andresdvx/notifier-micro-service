import { Process } from '@nestjs/bull';
import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import * as nodemailer from 'nodemailer';
import { EventQueueTypes } from 'src/common/contants/types';
import { welcomeTemplate } from 'src/common/templates/welcome.template';
import { IEmailModel } from 'src/modules/notifier/domain/models/Iemail.model';
import transactionEmailTemplate from 'src/common/templates/transaction.template';

@Processor(EventQueueTypes.EmailEventQueue.toString())
export class EmailProcessor extends WorkerHost {

  @Process(EventQueueTypes.EmailProcess.toString())
  async process(job: Job) {
    const { to, subject, payload, type } : IEmailModel= job.data;

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
    })

    await transporter.sendMail({
      from: process.env.USER_EMAIL, 
      to: to, 
      subject: subject,
      text: payload,
      html: type === 'welcome' ? welcomeTemplate(to) : transactionEmailTemplate(to, 2000, 'sent'), 
    }).catch((err)=> console.log(err));
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    console.log(`✅ event ${job.id} completed`);
  }
}
