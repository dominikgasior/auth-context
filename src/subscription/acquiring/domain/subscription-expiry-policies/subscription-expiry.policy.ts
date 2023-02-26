import { Clock } from '../../../../shared/clock/clock';

export interface SubscriptionExpiryPolicy {
  isValid(clock: Clock): boolean;
}
