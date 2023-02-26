import { SubscriptionPurchaseId } from '../subscription-purchase-id';
import { SubscriberId } from '../subscriber-id';

export class SubscriptionPurchaseFinalizedEvent {
  constructor(
    readonly id: SubscriptionPurchaseId,
    readonly subscriberId: SubscriberId,
  ) {}
}
