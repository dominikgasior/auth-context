import { SubscriberId } from './subscriber-id';
import { SubscriptionPurchaseId } from './subscription-purchase-id';
import { AggregateRoot } from '@nestjs/cqrs';
import { SubscriptionPurchaseFinalizedEvent } from './events/subscription-purchase-finalized.event';
import { Money } from '../../../shared/money';

export class SubscriptionPurchase extends AggregateRoot {
  private isFinalized = false;

  constructor(
    readonly id: SubscriptionPurchaseId,
    readonly subscriberId: SubscriberId,
    private readonly price: Money,
  ) {
    super();
  }

  finalize(price: Money): void {
    if (this.isFinalized) {
      throw new Error('Subscription purchase already finalized');
    }

    if (!this.price.equals(price)) {
      throw new Error("Prices don't match");
    }

    this.isFinalized = true;

    this.apply(
      new SubscriptionPurchaseFinalizedEvent(this.id, this.subscriberId),
    );
  }
}
