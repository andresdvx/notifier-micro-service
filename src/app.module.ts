import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NotifierModule } from './modules/notifier/notifier.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EventQueueModule } from './modules/events-queue/eventQueue.module';
import { MongoConnectionConfig } from './common/config/database/mongo.connection.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      MongoConnectionConfig.getUri(),
      MongoConnectionConfig.getMongoConnectionConfig(),
    ),
    NotifierModule,
    EventQueueModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
