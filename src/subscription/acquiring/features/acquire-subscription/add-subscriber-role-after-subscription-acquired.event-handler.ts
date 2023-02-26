import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SubscriptionAcquiredEvent } from '../../domain/events/subscription-acquired.event';
import { IamFacade } from '../../../../iam/iam.facade';
import { Role } from '../../../../shared/auth/role';

@EventsHandler(SubscriptionAcquiredEvent)
export class AddSubscriberRoleAfterSubscriptionAcquiredEventHandler
  implements IEventHandler<SubscriptionAcquiredEvent>
{
  constructor(private readonly iamFacade: IamFacade) {}

  async handle(event: SubscriptionAcquiredEvent): Promise<void> {
    await this.iamFacade.addRoleToUser(
      event.subscriberId.toString(),
      Role.Subscriber,
    );
  }
}
