import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { EventQueueTypes } from 'src/common/contants/types';
import { IEmailModel } from 'src/modules/notifier/domain/models/email.model.interface';

@Injectable()
export class EmailProducer {
  constructor(@InjectQueue(EventQueueTypes.EmailEventQueue.toString()) private readonly emailqueue: Queue) {}

  async addEmailToQueue(email: IEmailModel) {
    await this.emailqueue.add(EventQueueTypes.EmailProcess.toString(), email);
  }
}
