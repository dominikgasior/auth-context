export class User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  hashedPassword: string;
  roles: string[];

  constructor(
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    hashedPassword: string,
    roles: string[],
  ) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.hashedPassword = hashedPassword;
    this.roles = roles;
  }
}
