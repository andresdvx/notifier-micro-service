import { Module, forwardRef } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { RegisConfig } from './infraestructure/config/redis.config';
import { EmailProducer } from './infraestructure/messaging/email.producer';
import { EmailProcessor } from './infraestructure/messaging/email.proccesor';
import { EventQueueTypes } from 'src/common/contants/types';
import { EmailSenderAdapterImp } from './infraestructure/adapters/emailSender.adapter.imp';
import { NotifierModule } from '../notifier/notifier.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: EventQueueTypes.EmailEventQueue.toString(),
      connection: RegisConfig.getRedisConection(),
    }),
    forwardRef(()=> NotifierModule)
  ],
  providers: [
    EmailProducer,
    EmailProcessor,
    {
      provide: EventQueueTypes.EmailSender,
      useClass: EmailSenderAdapterImp,
    },
  ],
  exports: [EmailProducer, BullModule],
})
export class EventQueueModule {}
