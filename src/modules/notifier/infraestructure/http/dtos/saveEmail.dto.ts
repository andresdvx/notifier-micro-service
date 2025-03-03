import { IsNotEmpty, IsEmail, IsString, IsEnum } from 'class-validator';
import { IEmailModel } from 'src/modules/notifier/domain/models/email.model.interface';

export enum EmailStatus {
  WELCOME = 'welcome',
  TRANSACTION = 'transaction',
}

export class SaveEmailDto implements IEmailModel {
  @IsNotEmpty()
  @IsEmail()
  to: string;

  @IsString()
  subject: string;

  @IsNotEmpty()
  @IsString()
  payload: string;

  @IsNotEmpty()
  @IsString()
  template: string;

  @IsEnum(EmailStatus)
  type: 'welcome' | 'transaction';
}
