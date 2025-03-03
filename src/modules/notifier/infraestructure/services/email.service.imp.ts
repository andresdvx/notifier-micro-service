import { Inject, Injectable } from '@nestjs/common';
import { IEmailModel } from '../../domain/models/Iemail.model';
import { IEmailService } from '../../domain/services/email.service';
import { IEmailRepository } from '../../domain/repositories/email.repository';
import { EmailTypes } from 'src/common/contants/types';
import { EmailProducer } from 'src/modules/events-queue/infraestructure/messaging/email.producer';

@Injectable()
export class EmailServiceImp implements IEmailService {
  constructor(
    @Inject(EmailTypes.EmailRepository)
    private readonly emailRepository: IEmailRepository,
    private readonly emailProducer: EmailProducer
  ) {}

  async saveEmail(email: IEmailModel): Promise<IEmailModel> {
    await this.emailProducer.addEmailToQueue(email);
    const savedEmail = await this.emailRepository.saveEmail(email);
    return savedEmail;
  }
}
