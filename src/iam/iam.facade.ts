import { Injectable } from '@nestjs/common';
import {
  AddRoleToUserCommand,
  AddRoleToUserUseCase,
} from './features/add-role-to-user/add-role-to-user.use-case';
import { UserId } from './domain/user-id';

@Injectable()
export class IamFacade {
  constructor(private readonly addRoleToUserUseCase: AddRoleToUserUseCase) {}

  addRoleToUser(userId: string, roleName: string): Promise<void> {
    return this.addRoleToUserUseCase.execute(
      new AddRoleToUserCommand(new UserId(userId), roleName),
    );
  }
}
