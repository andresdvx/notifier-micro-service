import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NotifierModule } from './modules/notifier/notifier.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI ?? '', {
      auth: {
        username: process.env.MONGO_USER,
        password: process.env.MONGO_PASSWORD,
      },
      dbName: 'notifications_db',
    }),
    NotifierModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
