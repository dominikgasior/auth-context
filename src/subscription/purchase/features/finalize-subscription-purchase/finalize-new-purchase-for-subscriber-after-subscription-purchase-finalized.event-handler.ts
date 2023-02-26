import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SubscriptionPurchaseFinalizedEvent } from '../../domain/events/subscription-purchase-finalized.event';
import { SubscriberRepository } from '../../domain/repositories/subscriber.repository';

@EventsHandler(SubscriptionPurchaseFinalizedEvent)
export class FinalizeNewPurchaseForSubscriberAfterSubscriptionPurchaseFinalizedEventHandler
  implements IEventHandler<SubscriptionPurchaseFinalizedEvent>
{
  constructor(private readonly subscriberRepository: SubscriberRepository) {}

  async handle(event: SubscriptionPurchaseFinalizedEvent): Promise<void> {
    const subscriber = await this.subscriberRepository.get(event.subscriberId);

    subscriber.finalizeNewPurchase();

    await this.subscriberRepository.save(subscriber);
  }
}
