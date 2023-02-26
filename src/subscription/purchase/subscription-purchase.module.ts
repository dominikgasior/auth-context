import { Module } from '@nestjs/common';
import { FinalizeSubscriptionPurchaseUseCase } from './features/finalize-subscription-purchase/finalize-subscription-purchase.use-case';
import { PurchaseSubscriptionUseCase } from './features/purchase-subscription/purchase-subscription.use-case';
import { SubscriptionPurchaseRepository } from './domain/repositories/subscription-purchase.repository';
import { SubscriberRepository } from './domain/repositories/subscriber.repository';
import { AuthModule } from '../../shared/auth/auth.module';
import { PricingStrategyFactory } from './domain/pricing/pricing-strategy.factory';
import { ClockModule } from '../../shared/clock/clock.module';
import { CqrsModule } from '@nestjs/cqrs';
import { FinalizeNewPurchaseForSubscriberAfterSubscriptionPurchaseFinalizedEventHandler } from './features/finalize-subscription-purchase/finalize-new-purchase-for-subscriber-after-subscription-purchase-finalized.event-handler';
import { FinalizeSubscriptionPurchaseController } from './features/finalize-subscription-purchase/finalize-subscription-purchase.controller';
import { PurchaseSubscriptionController } from './features/purchase-subscription/purchase-subscription.controller';

@Module({
  imports: [AuthModule, ClockModule, CqrsModule],
  controllers: [
    PurchaseSubscriptionController,
    FinalizeSubscriptionPurchaseController,
  ],
  providers: [
    PurchaseSubscriptionUseCase,
    FinalizeSubscriptionPurchaseUseCase,
    SubscriptionPurchaseRepository,
    SubscriberRepository,
    FinalizeNewPurchaseForSubscriberAfterSubscriptionPurchaseFinalizedEventHandler,
    PricingStrategyFactory,
  ],
})
export class SubscriptionPurchaseModule {}
