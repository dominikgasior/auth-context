import * as bcrypt from 'bcrypt';

export class Password {
  constructor(private readonly password: string) {}

  static async hash(password: string): Promise<Password> {
    const hashedPassword = await bcrypt.hash(password, 10);

    return new Password(hashedPassword);
  }

  matches(password: Password): Promise<boolean> {
    return bcrypt.compare(password.password, this.password);
  }

  toString(): string {
    return this.password;
  }
}
