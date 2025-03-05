import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IEmailRepository } from '../../domain/repositories/email.repository.interface';
import { EmailModel } from '../../domain/models/email.model';
import { IEmailModel } from '../../domain/models/email.model.interface';

@Injectable()
export class EmailRepositoryImp implements IEmailRepository<IEmailModel> {
  constructor(
    @InjectModel(EmailModel.name)
    private readonly emailModel: Model<IEmailModel>,
  ) {}

  async saveEmail(email: IEmailModel) {
    return await this.emailModel.create(email);
  }
}
