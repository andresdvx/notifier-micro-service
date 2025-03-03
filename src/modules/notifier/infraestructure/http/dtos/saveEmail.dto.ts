import { IsNotEmpty, IsEmail, IsString, IsEnum, IsOptional } from 'class-validator';
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
  
  @IsOptional()
  payload: Record<string, any>;
}