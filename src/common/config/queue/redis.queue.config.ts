import { EventQueueTypes } from 'src/common/contants/types';

export class RedisQueueConfig {
  static getQueueConnection() {
    return {
      name: EventQueueTypes.EmailEventQueue.toString(),
      connection: {
        url: process.env.REDIS_URL,
      },
    };
  }
}
