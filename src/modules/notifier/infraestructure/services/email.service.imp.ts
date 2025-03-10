import { Inject, Injectable, InjectionToken } from '@nestjs/common';
import { IEmailProducer } from 'src/modules/events-queue/domain/messaging/email.producer.interface';
import {
  EmailTypes,
  EventQueueTypes,
  HttpTypes,
} from 'src/common/contants/types';
import { IEmailService } from '../../domain/services/email.service.interface';
import { IEmailRepository } from '../../domain/repositories/email.repository.interface';
import { IEmailPayload } from '../../domain/models/email.payload.interface';
import { IEmailModel } from '../../domain/models/email.model.interface';
import { IAxiosAdapter } from 'src/modules/http/domain/ports/axios.adapter.interface';
import { ILogPayload } from 'src/modules/http/domain/models/log.model.interface';

@Injectable()
export class EmailServiceImp
  implements IEmailService<IEmailPayload, IEmailModel>
{
  constructor(
    @Inject(EmailTypes.EmailRepository)
    private readonly emailRepository: IEmailRepository<IEmailModel>,
    @Inject(EventQueueTypes.EmailProducer as InjectionToken)
    private readonly emailProducer: IEmailProducer<IEmailPayload>,
    @Inject(HttpTypes.AxiosAdapter)
    private readonly axiosAdapter: IAxiosAdapter,
  ) {}

  async sendEmail(email: IEmailPayload): Promise<void> {
    await this.emailProducer.addEmailToQueue(email);
    await this.logEmailEvent(email, 'email saved to queue');
  }

  async saveEmail(email: IEmailModel): Promise<IEmailModel> {
    const savedEmail = await this.emailRepository.saveEmail(email);
    await this.logEmailEvent(email, 'email saved to database');
    return savedEmail;
  }

  private async logEmailEvent(
    email: IEmailPayload | IEmailModel,
    notificationType: string,
  ): Promise<void> {
    const data: ILogPayload = {
      service: 'Notifications',
      type: 'post',
      payload: {
        emailPayload: {
          to: email.to,
          type: email.type,
          content: email.payload,
        },
        typeNotifacion: notificationType,
      },
    };

    if (!process.env.API_LOGS_URL) {
      throw new Error('API_LOGS_URL is not defined');
    }
    await this.axiosAdapter.post(process.env.API_LOGS_URL, data);
  }
}
