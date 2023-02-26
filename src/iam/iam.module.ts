import { Module } from '@nestjs/common';
import { UserRepository } from './domain/repositories/user.repository';
import { LoginUseCase } from './features/login/login.use-case';
import { RegisterUseCase } from './features/register/register.use-case';
import { AuthModule } from '../shared/auth/auth.module';
import { AddRoleToUserUseCase } from './features/add-role-to-user/add-role-to-user.use-case';
import { IamFacade } from './iam.facade';
import { LoginController } from './features/login/login.controller';
import { RegisterController } from './features/register/register.controller';
import { AddRoleToUserController } from './features/add-role-to-user/add-role-to-user.controller';

@Module({
  imports: [AuthModule],
  controllers: [LoginController, RegisterController, AddRoleToUserController],
  providers: [
    UserRepository,
    RegisterUseCase,
    LoginUseCase,
    AddRoleToUserUseCase,
    IamFacade,
  ],
  exports: [IamFacade],
})
export class IamModule {}
