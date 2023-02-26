export class UserName {
  constructor(private readonly name: string) {}

  getFirstName(): string {
    return this.name.split(' ')[0];
  }

  getLastName(): string {
    return this.name.split(' ')[1];
  }
}
