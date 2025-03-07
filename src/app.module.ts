import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NotifierModule } from './modules/notifier/notifier.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EventQueueModule } from './modules/events-queue/eventQueue.module';
import { MongoConnectionConfig } from './common/config/database/mongo.connection.config';
import { BullModule } from '@nestjs/bullmq';
import { RedisQueueConfig } from './common/config/queue/redis.queue.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      MongoConnectionConfig.getUri(),
      MongoConnectionConfig.getMongoConnectionConfig(),
    ),
    BullModule.forRoot({
      connection: RedisQueueConfig.getQueueConnection().connection,
    }),
    NotifierModule,
    EventQueueModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
