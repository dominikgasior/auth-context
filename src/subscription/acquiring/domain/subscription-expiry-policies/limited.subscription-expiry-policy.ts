import { Clock } from '../../../../shared/clock/clock';
import { SubscriptionExpiryPolicy } from './subscription-expiry.policy';

export class LimitedSubscriptionExpiryPolicy
  implements SubscriptionExpiryPolicy
{
  constructor(private readonly validTo: Date) {}

  static validForMonths(
    months: number,
    clock: Clock,
  ): LimitedSubscriptionExpiryPolicy {
    const now = clock.now();

    const validTo = new Date(now.setMonth(now.getMonth() + months));

    return new LimitedSubscriptionExpiryPolicy(validTo);
  }

  isValid(clock: Clock): boolean {
    const now = clock.now();

    return now < this.validTo;
  }
}
