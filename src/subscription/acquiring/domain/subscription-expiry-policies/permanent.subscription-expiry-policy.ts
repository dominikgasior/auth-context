import { SubscriptionExpiryPolicy } from './subscription-expiry.policy';

export class PermanentSubscriptionExpiryPolicy
  implements SubscriptionExpiryPolicy
{
  isValid(): boolean {
    return true;
  }
}
