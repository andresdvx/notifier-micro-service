/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { Process } from '@nestjs/bull';
import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { EmailTypes, EventQueueTypes } from 'src/common/contants/types';
import { IEmailModel } from 'src/modules/notifier/domain/models/email.model.interface';
import { IEmailSender } from '../../domain/ports/emailSender.adapter.interface';
import { IEmailService } from 'src/modules/notifier/domain/services/email.service.interface';
import { IEmailPayload } from 'src/modules/notifier/domain/models/email.payload.interface';
import { welcomeTemplate } from 'src/common/templates/welcome.template';
import transactionEmailTemplate from 'src/common/templates/transaction.template';
import { IEmailProcessor } from '../../domain/messaging/email.proccesor.interface';

@Processor(EventQueueTypes.EmailEventQueue.toString())
export class EmailProcessorImp
  extends WorkerHost
  implements IEmailProcessor<Job>
{
  constructor(
    @Inject(EventQueueTypes.EmailSender)
    private readonly emailSender: IEmailSender<IEmailPayload>,
    @Inject(EmailTypes.EmailService)
    private readonly emailService: IEmailService<IEmailPayload, IEmailModel>,
  ) {
    super();
  }

  @Process(EventQueueTypes.EmailProcess.toString())
  async process(job: Job) {
    try {
      const email: IEmailPayload = job.data;

      await this.emailSender.createEmailSender(email);

      const emailToSave: IEmailModel = {
        to: email.to,
        subject: 'App Bank Notification',
        payload: `Hello, ${email.to}!`,
        type: email.type,
        template:
          email.type === 'welcome'
            ? welcomeTemplate(email.to)
            : transactionEmailTemplate(
                email.to,
                email.payload.amount,
                email.payload.transactionType,
              ),
      };

      await this.emailService.saveEmail(emailToSave);
    } catch (error) {
      console.log('❌ EmailProcessor => process', error);
      throw new InternalServerErrorException(error);
    }
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    console.log(`✅ event ${job.id} completed`);
  }
}
