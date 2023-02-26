import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthenticationGuard } from '../../../shared/auth/authentication.guard';
import { AuthorizationGuard } from '../../../shared/auth/authorization.guard';
import { Roles } from '../../../shared/auth/roles.decorator';
import { Role } from '../../../shared/auth/role';
import {
  AddRoleToUserCommand,
  AddRoleToUserUseCase,
} from './add-role-to-user.use-case';

@Controller()
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class AddRoleToUserController {
  constructor(private readonly addRoleToUserUseCase: AddRoleToUserUseCase) {}

  @Post('iam/user/add-role')
  @Roles(Role.Admin)
  addRole(@Body() command: AddRoleToUserCommand): Promise<void> {
    return this.addRoleToUserUseCase.execute(command);
  }
}
