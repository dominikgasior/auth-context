import { SubscriberId } from '../../purchase/domain/subscriber-id';
import { SubscriptionExpiryPolicy } from './subscription-expiry-policies/subscription-expiry.policy';
import { AggregateRoot } from '@nestjs/cqrs';
import { SubscriptionId } from './subscription-id';
import { SubscriptionAcquiredEvent } from './events/subscription-acquired.event';

export class Subscription extends AggregateRoot {
  constructor(
    readonly id: SubscriptionId,
    readonly subscriberId: SubscriberId,
    private readonly expiryPolicy: SubscriptionExpiryPolicy,
  ) {
    super();
  }

  static acquire(
    id: SubscriptionId,
    subscriberId: SubscriberId,
    expiryPolicy: SubscriptionExpiryPolicy,
  ): Subscription {
    const subscription = new Subscription(id, subscriberId, expiryPolicy);

    subscription.apply(new SubscriptionAcquiredEvent(id, subscriberId));

    return subscription;
  }
}
