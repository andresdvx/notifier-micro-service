/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsEmail, IsString, IsEnum } from 'class-validator';
import { IEmailModel } from 'src/modules/notifier/domain/models/Iemail.model';

export enum EmailStatus {
  PENDING = 'pending',
  SENT = 'sent',
  FAILED = 'failed',
}

export class SaveEmailDto implements IEmailModel {
  @IsNotEmpty()
  @IsEmail()
  to: string;

  @IsString()
  subject: string;

  @IsString()
  body: string;

  @IsEnum(EmailStatus, { message: 'Status must be pending, sent, or failed' })
  status: 'pending' | 'sent' | 'failed';
}
