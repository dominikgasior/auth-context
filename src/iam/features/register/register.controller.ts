import { Body, Controller, Post } from '@nestjs/common';
import { RegisterCommand, RegisterUseCase } from './register.use-case';

@Controller()
export class RegisterController {
  constructor(private readonly registerUseCase: RegisterUseCase) {}

  @Post('iam/register')
  register(@Body() command: RegisterCommand): Promise<void> {
    return this.registerUseCase.execute(command);
  }
}
