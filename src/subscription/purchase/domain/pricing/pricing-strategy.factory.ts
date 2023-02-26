import { PricingStrategy } from './pricing.strategy';
import { Injectable } from '@nestjs/common';
import { PremiumPricing } from './premium-pricing';
import { DefaultPricing } from './default-pricing';
import { SubscriberId } from '../subscriber-id';
import { SubscriberRepository } from '../repositories/subscriber.repository';

@Injectable()
export class PricingStrategyFactory {
  constructor(private readonly subscriberRepository: SubscriberRepository) {}

  async choose(subscriberId: SubscriberId): Promise<PricingStrategy> {
    if (await this.isSubscriberPremium(subscriberId)) {
      return new PremiumPricing();
    }

    return new DefaultPricing();
  }

  private async isSubscriberPremium(
    subscriberId: SubscriberId,
  ): Promise<boolean> {
    const subscriber = await this.subscriberRepository.get(subscriberId);

    return subscriber.isPremium();
  }
}
