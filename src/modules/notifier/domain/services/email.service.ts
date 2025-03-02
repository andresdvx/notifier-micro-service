import { IEmailModel } from '../models/Iemail.model';

export interface IEmailService {
  saveEmail(email: IEmailModel): Promise<IEmailModel>;
}
