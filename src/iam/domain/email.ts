export class Email {
  constructor(private readonly email: string) {}

  toString(): string {
    return this.email;
  }
}
