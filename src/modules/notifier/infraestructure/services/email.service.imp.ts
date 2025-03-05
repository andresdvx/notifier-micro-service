import { Inject, Injectable, InjectionToken } from '@nestjs/common';
import { IEmailService } from '../../domain/services/email.service.interface';
import { IEmailRepository } from '../../domain/repositories/email.repository.interface';
import { EmailTypes, EventQueueTypes } from 'src/common/contants/types';
import { IEmailPayload } from '../../domain/models/email.payload.interface';
import { IEmailModel } from '../../domain/models/email.model.interface';
import { IEmailProducer } from 'src/modules/events-queue/domain/messaging/email.producer.interface';

@Injectable()
export class EmailServiceImp
  implements IEmailService<IEmailPayload, IEmailModel>
{
  constructor(
    @Inject(EmailTypes.EmailRepository)
    private readonly emailRepository: IEmailRepository<IEmailModel>,
    @Inject(EventQueueTypes.EmailProducer as InjectionToken)
    private readonly emailProducer: IEmailProducer<IEmailPayload>,
  ) {}

  async sendEmail(email: IEmailPayload) {
    await this.emailProducer.addEmailToQueue(email);
  }

  async saveEmail(email: IEmailModel): Promise<IEmailModel> {
    const savedEmail = await this.emailRepository.saveEmail(email);
    return savedEmail;
  }
}
