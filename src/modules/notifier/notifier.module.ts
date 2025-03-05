import { Module, forwardRef } from '@nestjs/common';
import { EmailModel, EmailSchema } from './infraestructure/models/email.model.imp';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailController } from './infraestructure/http/controllers/email.controller';
import { SaveEmailUseCase } from './application/use-cases/saveEmail.useCase';
import { EmailServiceImp } from './infraestructure/services/email.service.imp';
import { EmailRepositoryImp } from './infraestructure/repositories/email.repository.imp';
import { EmailTypes } from 'src/common/contants/types';
import { EventQueueModule } from '../events-queue/eventQueue.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: EmailModel.name,
        schema: EmailSchema,
      },
    ]),
    forwardRef(() => EventQueueModule),
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
