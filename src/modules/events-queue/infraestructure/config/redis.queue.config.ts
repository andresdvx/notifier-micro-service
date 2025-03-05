import { RegisterQueueOptions } from '@nestjs/bullmq';
import { RegisConfig } from './redis.conection.config';
import { EventQueueTypes } from 'src/common/contants/types';

export const redisQueueConfig: RegisterQueueOptions = {
  name: EventQueueTypes.EmailEventQueue.toString(),
  connection: RegisConfig.getRedisConection(),
};
