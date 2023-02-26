import { PricingStrategy } from './pricing.strategy';
import { Clock } from '../../../../shared/clock/clock';
import { Money } from '../../../../shared/money';
import { Day } from '../../../../shared/clock/day';

export class DefaultPricing implements PricingStrategy {
  calculate(clock: Clock): Money {
    const now = clock.now();
    const day = now.getDay();

    if (day >= Day.Monday && day <= Day.Friday) {
      return new Money(50);
    }

    return new Money(25);
  }
}
