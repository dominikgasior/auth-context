import { Uuid } from '../../../shared/uuid/uuid';

export class SubscriptionId {
  constructor(private readonly id: Uuid) {}

  toString(): string {
    return this.id.toString();
  }
}
