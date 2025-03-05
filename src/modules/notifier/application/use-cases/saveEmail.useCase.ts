import { Inject, Injectable } from '@nestjs/common';
import { EmailTypes } from 'src/common/contants/types';
import { IEmailModel } from '../../domain/models/email.model.interface';
import { IEmailService } from '../../domain/services/email.service.interface';
import { IEmailPayload } from '../../domain/models/email.payload.interface';

@Injectable()
export class SaveEmailUseCase {
  constructor(
    @Inject(EmailTypes.EmailService)
    private readonly emailService: IEmailService<IEmailPayload, IEmailModel>,
  ) {}

  async execute(email: IEmailPayload) {
    await this.emailService.sendEmail(email);
  }
}
