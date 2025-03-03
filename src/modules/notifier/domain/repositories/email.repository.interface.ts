import { IEmailModel } from '../models/email.model.interface';

export interface IEmailRepository {
  saveEmail(email: IEmailModel): Promise<IEmailModel>;
}
