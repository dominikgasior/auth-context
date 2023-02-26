import { Uuid } from '../../../shared/uuid/uuid';

export class SubscriptionPurchaseId {
  private readonly id: Uuid;

  constructor(id: string) {
    this.id = new Uuid(id);
  }

  toString(): string {
    return this.id.toString();
  }
}
