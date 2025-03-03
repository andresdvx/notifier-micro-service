import { Inject, Injectable } from '@nestjs/common';
import { IEmailModel } from '../../domain/models/email.model.interface';
import { IEmailService } from '../../domain/services/email.service.interface';
import { EmailTypes } from 'src/common/contants/types';

@Injectable()
export class SaveEmailUseCase {
  constructor(
    @Inject(EmailTypes.EmailService)
    private readonly emailService: IEmailService,
  ) {}

  async execute(email: IEmailModel) {
     await this.emailService.sendEmail(email);
     return 'email was sent';
  }
}
