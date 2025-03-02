import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IEmailModel } from './Iemail.model';

@Schema({ collection: 'emails' })
export class EmailModel extends Document implements IEmailModel {
  @Prop({ required: true })
  to: string;

  @Prop({ required: true })
  subject: string;

  @Prop({ required: true })
  body: string;

  @Prop({ default: 'pending' })
  status: 'pending' | 'sent' | 'failed';
}

export const EmailSchema = SchemaFactory.createForClass(EmailModel);
