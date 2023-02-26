import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SubscriptionPurchaseFinalizedEvent } from '../../../purchase/domain/events/subscription-purchase-finalized.event';
import {
  AcquireSubscriptionCommand,
  AcquireSubscriptionUseCase,
} from './acquire-subscription.use-case';

@EventsHandler(SubscriptionPurchaseFinalizedEvent)
export class AcquireSubscriptionAfterSubscriptionPurchaseFinalizedEventHandler
  implements IEventHandler<SubscriptionPurchaseFinalizedEvent>
{
  constructor(
    private readonly acquireSubscriptionUseCase: AcquireSubscriptionUseCase,
  ) {}

  async handle(event: SubscriptionPurchaseFinalizedEvent): Promise<void> {
    await this.acquireSubscriptionUseCase.execute(
      new AcquireSubscriptionCommand(event.subscriberId),
    );
  }
}
