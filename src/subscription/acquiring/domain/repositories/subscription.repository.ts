import { Injectable } from '@nestjs/common';
import { SubscriberId } from '../../../purchase/domain/subscriber-id';
import { Subscription } from '../subscription';
import { SubscriptionId } from '../subscription-id';
import { UuidGenerator } from '../../../../shared/uuid/uuid-generator';

@Injectable()
export class SubscriptionRepository {
  private readonly subscriptions: Map<string, Subscription> = new Map();

  async save(subscription: Subscription): Promise<void> {
    this.subscriptions.set(subscription.subscriberId.toString(), subscription);
  }

  async get(id: SubscriberId): Promise<Subscription> {
    const subscriber = this.subscriptions.get(id.toString());

    if (!subscriber) {
      throw new Error('Subscriber not found');
    }

    return subscriber;
  }

  async nextId(): Promise<SubscriptionId> {
    return new SubscriptionId(UuidGenerator.generate());
  }
}
