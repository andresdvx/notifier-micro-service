import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { RegisConfig } from './infraestructure/config/redis.config';
import { EmailProducer } from './infraestructure/messaging/email.producer';
import { EmailProcessor } from './infraestructure/messaging/email.proccesor';
import { EventQueueTypes } from 'src/common/contants/types'

@Module({
  imports: [
    BullModule.registerQueue({
      name: EventQueueTypes.EmailEventQueue.toString(),
      connection: RegisConfig.getRedisConection(),
    }),
  ],
  providers: [ EmailProducer, EmailProcessor],
  exports: [EmailProducer, BullModule],
})
export class EventQueueModule {}
