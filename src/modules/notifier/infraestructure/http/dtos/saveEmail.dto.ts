import { IsNotEmpty, IsEmail, IsString, IsEnum } from 'class-validator';
import { IEmailModel } from 'src/modules/notifier/domain/models/Iemail.model';

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

  @IsString()
  body: string;

  @IsEnum(EmailStatus)
  type: 'welcome' | 'transaction';
}
