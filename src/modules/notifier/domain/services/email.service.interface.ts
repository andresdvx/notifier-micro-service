import { IEmailModel } from '../models/email.model.interface';

export interface IEmailService {
  sendEmail(email: IEmailModel): Promise<void>;
  saveEmail(email: IEmailModel): Promise<IEmailModel>;
}
