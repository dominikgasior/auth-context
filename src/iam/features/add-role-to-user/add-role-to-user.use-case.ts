import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserId } from '../../domain/user-id';

export class AddRoleToUserCommand {
  constructor(readonly userId: UserId, readonly roleName: string) {}
}

@Injectable()
export class AddRoleToUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: AddRoleToUserCommand): Promise<void> {
    const { userId, roleName } = command;

    const user = await this.userRepository.get(userId);

    user.roles.push(roleName);

    await this.userRepository.save(user);
  }
}
