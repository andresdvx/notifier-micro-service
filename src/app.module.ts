import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';
import { MongooseModule } from '@nestjs/mongoose';
import { NotifierModule } from './modules/notifier/notifier.module';
import { EventQueueModule } from './modules/events-queue/eventQueue.module';
import { MongoConnectionConfig } from './common/config/database/mongo.connection.config';
import { RedisQueueConfig } from './common/config/queue/redis.queue.config';
import { HttpModule } from './modules/http/http.module';

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
    HttpModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
