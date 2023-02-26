import { Injectable } from '@nestjs/common';
import { SubscriberId } from '../../domain/subscriber-id';
import { Clock } from '../../../../shared/clock/clock';
import { Money } from '../../../../shared/money';
import { SubscriberRepository } from '../../domain/repositories/subscriber.repository';
import { SubscriptionPurchaseId } from '../../domain/subscription-purchase-id';
import { SubscriptionPurchaseRepository } from '../../domain/repositories/subscription-purchase.repository';
import { PricingStrategyFactory } from '../../domain/pricing/pricing-strategy.factory';
import { SubscriptionPurchase } from '../../domain/subscription-purchase';

export class PurchaseSubscriptionCommand {
  constructor(
    readonly subscriptionPurchaseId: SubscriptionPurchaseId,
    readonly subscriberId: SubscriberId,
  ) {}
}

@Injectable()
export class PurchaseSubscriptionUseCase {
  constructor(
    private readonly subscriberRepository: SubscriberRepository,
    private readonly subscriptionPurchaseRepository: SubscriptionPurchaseRepository,
    private readonly pricingStrategyFactory: PricingStrategyFactory,
    private readonly clock: Clock,
  ) {}

  async execute(command: PurchaseSubscriptionCommand): Promise<void> {
    const { subscriptionPurchaseId, subscriberId } = command;

    const price = await this.calculatePrice(subscriberId);

    const subscriptionPurchase = new SubscriptionPurchase(
      subscriptionPurchaseId,
      subscriberId,
      price,
    );

    await this.subscriptionPurchaseRepository.save(subscriptionPurchase);
  }

  private async calculatePrice(subscriberId: SubscriberId): Promise<Money> {
    return (await this.pricingStrategyFactory.choose(subscriberId)).calculate(
      this.clock,
    );
  }
}
