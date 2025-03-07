import { Module, forwardRef } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { EmailProducerImp } from './infraestructure/messaging/email.producer.imp';
import { EmailProcessorImp } from './infraestructure/messaging/email.proccesor.imp';
import { EventQueueTypes } from 'src/common/contants/types';
import { EmailSenderAdapterImp } from './infraestructure/adapters/emailSender.adapter.imp';
import { NotifierModule } from '../notifier/notifier.module';
import { RedisQueueConfig } from 'src/common/config/queue/redis.queue.config';

@Module({
  imports: [
    BullModule.registerQueue({
      name: RedisQueueConfig.getQueueConnection().name,
    }),
    forwardRef(() => NotifierModule),
  ],
  providers: [
    EmailProcessorImp,
    {
      provide: EventQueueTypes.EmailProducer,
      useClass: EmailProducerImp,
    },
    {
      provide: EventQueueTypes.EmailSender,
      useClass: EmailSenderAdapterImp,
    },
  ],
  exports: [
    BullModule,
    {
      provide: EventQueueTypes.EmailProducer,
      useClass: EmailProducerImp,
    },
  ],
})
export class EventQueueModule {}
