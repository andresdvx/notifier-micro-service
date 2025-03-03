import { Body, Controller, Post } from '@nestjs/common';
import { SaveEmailUseCase } from 'src/modules/notifier/application/use-cases/saveEmail.useCase';
import { SaveEmailDto } from '../dtos/saveEmail.dto';
import { ResponseHandler } from 'src/common/handlers/response.handler';
@Controller('email')
export class EmailController {
  constructor(private readonly saveEmailUseCase: SaveEmailUseCase) {}

  @Post('send')
  async saveEmail(@Body() saveEmailDto: SaveEmailDto) {
    await this.saveEmailUseCase.execute(saveEmailDto);
    return ResponseHandler({message: 'Email sent successfully', error: 'no error', statusCode: 200});
  }
}
