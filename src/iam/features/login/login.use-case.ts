import { Email } from '../../domain/email';
import { Password } from '../../domain/password';
import { UserRepository } from '../../domain/repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { User } from '../../domain/user';
import { jwtConstants } from '../../../shared/auth/constants';

export class LoginCommand {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class LoginResult {
  constructor(private readonly token: string) {}
}

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(command: LoginCommand): Promise<LoginResult> {
    const email = new Email(command.email);
    const password = new Password(command.password);

    const user = await this.userRepository.findByEmail(email);

    await this.assertPasswordMatches(password, user);

    const signedToken = this.signToken(user);

    return new LoginResult(signedToken);
  }

  private async assertPasswordMatches(
    password: Password,
    user: User,
  ): Promise<void> {
    const userPassword = new Password(user.hashedPassword);

    const passwordMatches = await userPassword.matches(password);

    if (!passwordMatches) {
      throw new Error('Wrong password');
    }
  }

  private signToken(user: User): string {
    return this.jwtService.sign({
      id: user.id,
      roles: user.roles,
      sub: user.id,
    });
  }
}
