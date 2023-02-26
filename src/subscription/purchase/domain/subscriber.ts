import { SubscriberId } from './subscriber-id';

export class Subscriber {
  private finalizedPurchaseNumber = 0;

  constructor(readonly id: SubscriberId) {}

  finalizeNewPurchase(): void {
    this.finalizedPurchaseNumber++;
  }

  isPremium(): boolean {
    return this.finalizedPurchaseNumber >= 3;
  }
}
