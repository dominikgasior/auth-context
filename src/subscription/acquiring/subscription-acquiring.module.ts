import { Module } from '@nestjs/common';
import { AcquireSubscriptionUseCase } from './features/acquire-subscription/acquire-subscription.use-case';
import { AcquireSubscriptionAfterSubscriptionPurchaseFinalizedEventHandler } from './features/acquire-subscription/acquire-subscription-after-subscription-purchase-finalized.event-handler';
import { SubscriptionRepository } from './domain/repositories/subscription.repository';
import { ClockModule } from '../../shared/clock/clock.module';
import { CqrsModule } from '@nestjs/cqrs';
import { AddSubscriberRoleAfterSubscriptionAcquiredEventHandler } from './features/acquire-subscription/add-subscriber-role-after-subscription-acquired.event-handler';
import { IamModule } from '../../iam/iam.module';

@Module({
  imports: [ClockModule, CqrsModule, IamModule],
  providers: [
    AcquireSubscriptionUseCase,
    AcquireSubscriptionAfterSubscriptionPurchaseFinalizedEventHandler,
    AddSubscriberRoleAfterSubscriptionAcquiredEventHandler,
    SubscriptionRepository,
  ],
})
export class SubscriptionAcquiringModule {}
