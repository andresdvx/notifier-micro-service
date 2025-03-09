/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Inject, Injectable } from '@nestjs/common';
import { EmailTypes, HttpTypes } from 'src/common/contants/types';
import { IEmailModel } from '../../domain/models/email.model.interface';
import { IEmailService } from '../../domain/services/email.service.interface';
import { IEmailPayload } from '../../domain/models/email.payload.interface';
import { IAxiosAdapter } from 'src/modules/http/domain/ports/axios.adapter.interface';
import { ILogPayload } from 'src/modules/http/domain/models/log.model.interface';

@Injectable()
export class SaveEmailUseCase {
  constructor(
    @Inject(EmailTypes.EmailService)
    private readonly emailService: IEmailService<IEmailPayload, IEmailModel>,
    @Inject(HttpTypes.AxiosAdapter)
    private readonly axiosAdapter: IAxiosAdapter,
  ) {}

  async execute(email: IEmailPayload) {
    try {
      await this.emailService.sendEmail(email);
    } catch (error) {
      const data: ILogPayload = {
        service: 'Notifications',
        type: 'error',
        payload: error,
      };
      if (!process.env.API_LOGS_URL) {
        throw new Error('API_LOGS_URL is not defined');
      }
      await this.axiosAdapter.post<ILogPayload>(process.env.API_LOGS_URL, data);
      throw error;
    }
  }
}
