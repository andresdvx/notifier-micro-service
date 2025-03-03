import { Module, forwardRef } from '@nestjs/common';
import { EmailModel, EmailSchema } from './domain/models/email.model';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailController } from './infraestructure/http/controllers/email.controller';
import { SaveEmailUseCase } from './application/use-cases/saveEmail.useCase';
import { EmailServiceImp } from './infraestructure/services/email.service.imp';
import { EmailRepositoryImp } from './infraestructure/repositories/email.repository.imp';
import { EmailTypes } from 'src/common/contants/types';
import { EventQueueModule } from '../events-queue/eventQueue.module';
import { EmailProducer } from '../events-queue/infraestructure/messaging/email.producer';

@Module({
  imports: [
    forwardRef(()=> EventQueueModule),
    MongooseModule.forFeature([
      {
        name: EmailModel.name,
        schema: EmailSchema,
      },
    ]),
  ],
  controllers: [EmailController],
  providers: [
    {
      provide: EmailTypes.EmailRepository,
      useClass: EmailRepositoryImp,
    },
    {
      provide: EmailTypes.EmailService,
      useClass: EmailServiceImp,
    },
    SaveEmailUseCase,
    EmailProducer,
  ],
  exports: [
    MongooseModule,
    {
      provide: EmailTypes.EmailService,
      useClass: EmailServiceImp,
    },
  ],
})
export class NotifierModule {}
