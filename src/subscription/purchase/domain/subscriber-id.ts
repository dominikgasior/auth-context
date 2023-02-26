import { Uuid } from '../../../shared/uuid/uuid';

export class SubscriberId {
  private readonly id: Uuid;

  constructor(id: string) {
    this.id = new Uuid(id);
  }

  toString(): string {
    return this.id.toString();
  }
}
