import { Inject, InternalServerErrorException } from '@nestjs/common';
import { Process } from '@nestjs/bull';
import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { EmailTypes, EventQueueTypes } from 'src/common/contants/types';
import { IEmailModel } from 'src/modules/notifier/domain/models/email.model.interface';
import { IEmailSender } from '../../domain/ports/emailSender.adapter.interface';
import { IEmailService } from 'src/modules/notifier/domain/services/email.service.interface';

@Processor(EventQueueTypes.EmailEventQueue.toString())
export class EmailProcessor extends WorkerHost {
  constructor(
    @Inject(EventQueueTypes.EmailSender)
    private readonly emailSender: IEmailSender<IEmailModel>,
    @Inject(EmailTypes.EmailService)
    private readonly emailService: IEmailService,
  ) {
    super();
  }

  @Process(EventQueueTypes.EmailProcess.toString())
  async process(job: Job) {
    try {
      const email: IEmailModel = job.data;
      await this.emailSender.createEmailSender(email);

      await this.emailService.saveEmail(email);
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
