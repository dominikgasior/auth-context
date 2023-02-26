import { SubscriberId } from '../../../purchase/domain/subscriber-id';
import { SubscriptionId } from '../subscription-id';

export class SubscriptionAcquiredEvent {
  constructor(
    readonly id: SubscriptionId,
    readonly subscriberId: SubscriberId,
  ) {}
}
