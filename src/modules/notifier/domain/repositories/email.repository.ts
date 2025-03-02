import { IEmailModel } from '../models/Iemail.model';

export interface IEmailRepository {
  saveEmail(email: IEmailModel): Promise<IEmailModel>;
}
