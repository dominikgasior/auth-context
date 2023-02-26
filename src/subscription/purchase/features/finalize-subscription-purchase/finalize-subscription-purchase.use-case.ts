import { Injectable } from '@nestjs/common';
import { Money } from '../../../../shared/money';
import { SubscriptionPurchaseId } from '../../domain/subscription-purchase-id';
import { SubscriptionPurchaseRepository } from '../../domain/repositories/subscription-purchase.repository';
import { EventBus } from '@nestjs/cqrs';

export class FinalizeSubscriptionPurchaseCommand {
  constructor(
    readonly subscriptionPurchaseId: SubscriptionPurchaseId,
    readonly price: Money,
  ) {}
}

@Injectable()
export class FinalizeSubscriptionPurchaseUseCase {
  constructor(
    private readonly subscriptionPurchaseRepository: SubscriptionPurchaseRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: FinalizeSubscriptionPurchaseCommand): Promise<void> {
    const { subscriptionPurchaseId, price } = command;

    const subscriptionPurchase = await this.subscriptionPurchaseRepository.get(
      subscriptionPurchaseId,
    );

    subscriptionPurchase.finalize(price);

    await this.subscriptionPurchaseRepository.save(subscriptionPurchase);

    this.eventBus.publishAll(subscriptionPurchase.getUncommittedEvents());
  }
}
