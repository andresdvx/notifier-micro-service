/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Inject, Injectable } from '@nestjs/common';
import { EmailTypes, HttpTypes } from 'src/common/contants/types';
import { IEmailModel } from '../../domain/models/email.model.interface';
import { IEmailService } from '../../domain/services/email.service.interface';
import { IEmailPayload } from '../../domain/models/email.payload.interface';
import { AxiosAdapterImp } from 'src/modules/http/infraestructure/adapters/axios.adapter.imp';

@Injectable()
export class SaveEmailUseCase {
  constructor(
    @Inject(EmailTypes.EmailService)
    private readonly emailService: IEmailService<IEmailPayload, IEmailModel>,
    @Inject(HttpTypes.AxiosAdapter)
    private readonly axiosAdapter: AxiosAdapterImp,
  ) {}

  async execute(email: IEmailPayload) {
    try {
      await this.emailService.sendEmail(email);
    } catch (error) {
      const data = {
        service: 'Notifications',
        type: 'error',
        payload: error,
      };
      if (!process.env.API_LOGS_URL) {
        throw new Error('API_LOGS_URL is not defined');
      }
      await this.axiosAdapter.post(process.env.API_LOGS_URL, data);
      throw error;
    }
  }
}
