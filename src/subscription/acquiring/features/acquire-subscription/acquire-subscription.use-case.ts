import { Injectable } from '@nestjs/common';
import { SubscriberId } from '../../../purchase/domain/subscriber-id';
import { Subscription } from '../../domain/subscription';
import { LimitedSubscriptionExpiryPolicy } from '../../domain/subscription-expiry-policies/limited.subscription-expiry-policy';
import { SubscriptionRepository } from '../../domain/repositories/subscription.repository';
import { Clock } from '../../../../shared/clock/clock';
import { EventBus } from '@nestjs/cqrs';

export class AcquireSubscriptionCommand {
  constructor(readonly subscriberId: SubscriberId) {}
}

@Injectable()
export class AcquireSubscriptionUseCase {
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository,
    private readonly clock: Clock,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: AcquireSubscriptionCommand): Promise<void> {
    const subscriptionId = await this.subscriptionRepository.nextId();

    const subscription = Subscription.acquire(
      subscriptionId,
      command.subscriberId,
      LimitedSubscriptionExpiryPolicy.validForMonths(3, this.clock),
    );

    await this.subscriptionRepository.save(subscription);

    this.eventBus.publishAll(subscription.getUncommittedEvents());
  }
}
