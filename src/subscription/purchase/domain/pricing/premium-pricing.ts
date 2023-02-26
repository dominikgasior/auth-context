import { PricingStrategy } from './pricing.strategy';
import { Clock } from '../../../../shared/clock/clock';
import { Money } from '../../../../shared/money';

export class PremiumPricing implements PricingStrategy {
  calculate(clock: Clock): Money {
    return new Money(1);
  }
}
