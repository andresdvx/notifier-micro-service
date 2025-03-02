import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IEmailRepository } from '../../domain/repositories/email.repository';
import { IEmailModel } from '../../domain/models/Iemail.model';
import { EmailModel } from '../../domain/models/email.model';

@Injectable()
export class EmailRepositoryImp implements IEmailRepository {
  constructor(
    @InjectModel(EmailModel.name)
    private readonly emailModel: Model<IEmailModel>,
  ) {}

  async saveEmail(email: IEmailModel) {
    return await this.emailModel.create(email);
  }
}
