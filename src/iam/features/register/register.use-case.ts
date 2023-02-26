import { UserId } from '../../domain/user-id';
import { Email } from '../../domain/email';
import { Password } from '../../domain/password';
import { UserName } from '../../domain/user-name';
import { User } from '../../domain/user';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Role } from '../../../shared/auth/role';

export class RegisterCommand {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}

@Injectable()
export class RegisterUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: RegisterCommand): Promise<void> {
    const userId = new UserId(command.id);
    const email = new Email(command.email);
    const password = await Password.hash(command.password);
    const userName = new UserName(command.name);

    const customer = new User(
      userId.toString(),
      email.toString(),
      userName.getFirstName(),
      userName.getLastName(),
      password.toString(),
      [Role.User],
    );

    await this.userRepository.save(customer);
  }
}
