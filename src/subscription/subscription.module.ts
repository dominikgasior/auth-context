import { Module } from '@nestjs/common';
import { SubscriptionPurchaseModule } from './purchase/subscription-purchase.module';
import { SubscriptionAcquiringModule } from './acquiring/subscription-acquiring.module';

@Module({
  imports: [SubscriptionPurchaseModule, SubscriptionAcquiringModule],
})
export class SubscriptionModule {}
