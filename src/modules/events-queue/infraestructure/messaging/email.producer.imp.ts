import { InjectQueue } from '@nestjs/bull';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { EventQueueTypes } from 'src/common/contants/types';
import { IEmailPayload } from 'src/modules/notifier/domain/models/email.payload.interface';
import { IEmailProducer } from '../../domain/messaging/email.producer.interface';

@Injectable()
export class EmailProducerImp implements IEmailProducer<IEmailPayload> {
  constructor(
    @InjectQueue(EventQueueTypes.EmailEventQueue.toString())
    private readonly emailqueue: Queue,
  ) {}

  async addEmailToQueue(email: IEmailPayload) {
    if (email.type === 'transaction' && email.payload === undefined)
      throw new BadRequestException(
        'Payload is required for transaction emails',
      );
    await this.emailqueue.add(EventQueueTypes.EmailProcess.toString(), email);
  }
}
