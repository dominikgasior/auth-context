import { Body, Controller, Post } from '@nestjs/common';
import { LoginCommand, LoginUseCase, LoginResult } from './login.use-case';

@Controller()
export class LoginController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('iam/login')
  login(@Body() command: LoginCommand): Promise<LoginResult> {
    return this.loginUseCase.execute(command);
  }
}
