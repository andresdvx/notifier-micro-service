import {
  IsNotEmpty,
  IsEmail,
  IsEnum,
  IsOptional,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum EmailStatus {
  WELCOME = 'welcome',
  TRANSACTION = 'transaction',
}

export enum TransactionType {
  INCOME = 'income',
  OUTCOME = 'outcome',
}

export class TransactionPayloadDto {
  @IsNotEmpty()
  @IsNumber()
  amount: string;

  @IsNotEmpty()
  @IsEnum(TransactionType)
  type: 'income' | 'outcome';
}

export class SaveEmailDto {
  @IsNotEmpty()
  @IsEmail()
  to: string;

  @IsNotEmpty()
  @IsEnum(EmailStatus)
  type: 'welcome' | 'transaction';

  @IsOptional()
  @ValidateNested()
  @Type(() => TransactionPayloadDto)
  payload: TransactionPayloadDto;
}
