import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { EventQueueTypes } from 'src/common/contants/types';
import { IEmailPayload } from 'src/modules/notifier/domain/models/email.payload.interface';

@Injectable()
export class EmailProducer {
  constructor(@InjectQueue(EventQueueTypes.EmailEventQueue.toString()) private readonly emailqueue: Queue) {}

  async addEmailToQueue(email: IEmailPayload) {
    await this.emailqueue.add(EventQueueTypes.EmailProcess.toString(), email);
  }
}
