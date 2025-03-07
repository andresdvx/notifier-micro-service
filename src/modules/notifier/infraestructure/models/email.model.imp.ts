import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IEmailModel } from '../../domain/models/email.model.interface';

@Schema({ collection: 'emails' })
export class EmailModel extends Document implements IEmailModel {
  @Prop({ required: true })
  to: string;

  @Prop({ required: true })
  subject: string;

  @Prop({ required: true })
  payload: string;

  @Prop({ required: true })
  template: string;

  @Prop({ required: true })
  type: 'welcome' | 'transaction';

  @Prop({ default: new Date() })
  sentAt: Date;
}

export const EmailSchema = SchemaFactory.createForClass(EmailModel);
