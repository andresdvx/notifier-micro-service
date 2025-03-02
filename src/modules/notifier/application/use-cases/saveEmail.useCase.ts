import { Inject, Injectable } from '@nestjs/common';
import { IEmailModel } from '../../domain/models/Iemail.model';
import { IEmailService } from '../../domain/services/email.service';
import { EmailTypes } from '../../domain/contants/types';

@Injectable()
export class SaveEmailUseCase {
  constructor(
    @Inject(EmailTypes.EmailService)
    private readonly emailService: IEmailService,
  ) {}

  async execute(email: IEmailModel): Promise<IEmailModel> {
    return await this.emailService.saveEmail(email);
  }
}
