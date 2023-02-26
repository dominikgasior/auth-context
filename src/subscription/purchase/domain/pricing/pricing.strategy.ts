import { Clock } from '../../../../shared/clock/clock';
import { Money } from '../../../../shared/money';

export interface PricingStrategy {
  calculate(clock: Clock): Money;
}
