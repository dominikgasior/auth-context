import { Injectable } from '@nestjs/common';
import { SubscriptionPurchase } from '../subscription-purchase';
import { SubscriptionPurchaseId } from '../subscription-purchase-id';

@Injectable()
export class SubscriptionPurchaseRepository {
  private readonly subscriptionPurchases: Map<string, SubscriptionPurchase> =
    new Map();

  async save(subscriptionPurchase: SubscriptionPurchase): Promise<void> {
    this.subscriptionPurchases.set(
      subscriptionPurchase.id.toString(),
      subscriptionPurchase,
    );
  }

  async get(id: SubscriptionPurchaseId): Promise<SubscriptionPurchase> {
    const subscriptionPurchase = this.subscriptionPurchases.get(id.toString());

    if (!subscriptionPurchase) {
      throw new Error('Subscription purchase not found');
    }

    return subscriptionPurchase;
  }
}
