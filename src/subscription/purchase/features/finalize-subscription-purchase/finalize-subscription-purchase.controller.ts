import { Body, Controller, Put, UseGuards } from '@nestjs/common';
import { AuthenticationGuard } from '../../../../shared/auth/authentication.guard';
import { AuthorizationGuard } from '../../../../shared/auth/authorization.guard';
import { Roles } from '../../../../shared/auth/roles.decorator';
import { Role } from '../../../../shared/auth/role';
import { SubscriptionPurchaseId } from '../../domain/subscription-purchase-id';
import { Money } from '../../../../shared/money';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import {
  FinalizeSubscriptionPurchaseCommand,
  FinalizeSubscriptionPurchaseUseCase,
} from './finalize-subscription-purchase.use-case';

class FinalizeSubscriptionPurchaseRequestBody {
  @IsNotEmpty()
  @IsUUID()
  subscriptionPurchaseId: string;

  @IsNotEmpty()
  @IsNumber()
  money: number;
}

@Controller()
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class FinalizeSubscriptionPurchaseController {
  constructor(
    private readonly finalizeSubscriptionPurchaseUseCase: FinalizeSubscriptionPurchaseUseCase,
  ) {}

  @Put('subscription/purchase/finalize')
  @Roles(Role.User)
  finalizePurchase(
    @Body() requestBody: FinalizeSubscriptionPurchaseRequestBody,
  ): Promise<void> {
    return this.finalizeSubscriptionPurchaseUseCase.execute(
      new FinalizeSubscriptionPurchaseCommand(
        new SubscriptionPurchaseId(requestBody.subscriptionPurchaseId),
        new Money(requestBody.money),
      ),
    );
  }
}
