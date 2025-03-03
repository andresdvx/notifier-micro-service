import { IsNotEmpty, IsEmail, IsString, IsEnum } from 'class-validator';
import { IEmailPayload } from 'src/modules/notifier/domain/models/email.payload.interface';

export enum EmailStatus {
  WELCOME = 'welcome',
  TRANSACTION = 'transaction',
}

export class SaveEmailDto implements IEmailPayload {
  @IsNotEmpty()
  @IsEmail()
  to: string;
  
  @IsEnum(EmailStatus)
  type: 'welcome' | 'transaction';
  
  @IsNotEmpty()
  payload: Record<string, any>;
}