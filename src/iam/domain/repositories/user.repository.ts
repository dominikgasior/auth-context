import { Injectable } from '@nestjs/common';
import { User } from '../user';
import { Email } from '../email';
import { UserId } from '../user-id';

@Injectable()
export class UserRepository {
  private readonly users: Map<string, User> = new Map();

  async save(user: User): Promise<void> {
    this.users.set(user.id, user);
  }

  async get(userId: UserId): Promise<User> {
    const user = this.users.get(userId.toString());

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async findByEmail(email: Email): Promise<User> {
    const user = Array.from(this.users.values()).find(
      (user) => user.email === email.toString(),
    );

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}
