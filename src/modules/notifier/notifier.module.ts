import { Module } from '@nestjs/common';
import {
  NotificationSchema,
  NoticationModel,
} from './domain/models/notification.model';
import { MongooseModule } from '@nestjs/mongoose';
import { SendEmailController } from './infraestructure/http/sendEmail.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: NoticationModel.name,
        schema: NotificationSchema,
      },
    ]),
  ],
  controllers: [SendEmailController],
  providers: [],
  exports: [MongooseModule],
})
export class NotifierModule {}
