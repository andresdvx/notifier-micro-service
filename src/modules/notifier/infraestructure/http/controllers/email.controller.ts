import { Body, Controller, Post } from '@nestjs/common';
import { SaveEmailUseCase } from 'src/modules/notifier/application/use-cases/saveEmail.useCase';
import { SaveEmailDto } from '../dtos/saveEmail.dto';
@Controller('email')
export class EmailController {
  constructor(private readonly saveEmailUseCase: SaveEmailUseCase) {}

  @Post('save')
  async saveEmail(@Body() saveEmailDto: SaveEmailDto) {
    return await this.saveEmailUseCase.execute(saveEmailDto);
  }
}
