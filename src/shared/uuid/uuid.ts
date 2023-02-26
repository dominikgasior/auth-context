import { validate } from 'uuid';

export class Uuid {
  constructor(private readonly uuid: string) {
    if (!validate(uuid)) {
      throw new Error('Invalid UUID given');
    }
  }

  toString(): string {
    return this.uuid;
  }
}
