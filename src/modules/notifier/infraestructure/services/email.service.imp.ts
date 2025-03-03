import { Inject, Injectable } from '@nestjs/common';
import { IEmailModel } from '../../domain/models/email.model.interface';
import { IEmailService } from '../../domain/services/email.service.interface';
import { IEmailRepository } from '../../domain/repositories/email.repository.interface';
import { EmailTypes } from 'src/common/contants/types';
import { EmailProducer } from 'src/modules/events-queue/infraestructure/messaging/email.producer';

@Injectable()
export class EmailServiceImp implements IEmailService<IEmailModel> {
  constructor(
    @Inject(EmailTypes.EmailRepository)
    private readonly emailRepository: IEmailRepository<IEmailModel>,
    private readonly emailProducer: EmailProducer,
  ) {}

  async sendEmail(email: IEmailModel) {
    await this.emailProducer.addEmailToQueue(email);
  }

  async saveEmail(email: IEmailModel): Promise<IEmailModel> {
    const savedEmail = await this.emailRepository.saveEmail(email);
    return savedEmail;
  }
}
