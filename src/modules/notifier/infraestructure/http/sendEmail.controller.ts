import { Controller, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NoticationModel } from '../../domain/models/notification.model';

@Controller('sendemail')
export class SendEmailController {
  constructor(
    @InjectModel(NoticationModel.name)
    private readonly notificationModel: Model<NoticationModel>,
  ) {}

  @Post()
  async sendEmail() {
    const sentEMail = await this.notificationModel.create({
      to: 'juancho@mail.com',
      subject: 'Hello',
      body: 'Hello, this is a test',
      status: 'sent',
    });
    return sentEMail;
  }
}
