import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { IEmailModel } from 'src/modules/notifier/domain/models/Iemail.model';

@Injectable()
export class EmailProducer {
  constructor(@InjectQueue('email_queue') private readonly emailqueue: Queue) {}

  async addEmailToQueue(email: IEmailModel) {
    await this.emailqueue.add('send_email', email);
  }
}
