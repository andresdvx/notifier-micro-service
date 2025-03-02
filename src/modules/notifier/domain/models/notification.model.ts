import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'emails' })
export class NoticationModel extends Document {
  @Prop({ required: true })
  to: string;

  @Prop({ required: true })
  subject: string;

  @Prop({ required: true })
  body: string;

  @Prop({ default: 'pending' })
  status: 'pending' | 'sent' | 'failed';
}

export const NotificationSchema = SchemaFactory.createForClass(NoticationModel);
