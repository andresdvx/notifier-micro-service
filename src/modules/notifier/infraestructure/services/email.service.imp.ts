import { Inject, Injectable } from '@nestjs/common';
import { IEmailModel } from '../../domain/models/Iemail.model';
import { IEmailService } from '../../domain/services/email.service';
import { IEmailRepository } from '../../domain/repositories/email.repository';
import { EmailTypes } from '../../domain/contants/types';

@Injectable()
export class EmailServiceImp implements IEmailService {
  constructor(
    @Inject(EmailTypes.EmailRepository)
    private readonly emailRepository: IEmailRepository,
  ) {}

  async saveEmail(email: IEmailModel): Promise<IEmailModel> {
    return await this.emailRepository.saveEmail(email);
  }
}
