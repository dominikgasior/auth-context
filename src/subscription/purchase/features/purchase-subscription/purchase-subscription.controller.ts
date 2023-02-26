import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationGuard } from '../../../../shared/auth/authentication.guard';
import { AuthorizationGuard } from '../../../../shared/auth/authorization.guard';
import { Roles } from '../../../../shared/auth/roles.decorator';
import { Role } from '../../../../shared/auth/role';
import {
  AuthenticatedUser,
  AuthUser,
} from '../../../../shared/auth/authenticated-user';
import { SubscriptionPurchaseId } from '../../domain/subscription-purchase-id';
import { SubscriberId } from '../../domain/subscriber-id';
import { IsNotEmpty, IsUUID } from 'class-validator';
import {
  PurchaseSubscriptionCommand,
  PurchaseSubscriptionUseCase,
} from './purchase-subscription.use-case';

class PurchaseSubscriptionRequestBody {
  @IsNotEmpty()
  @IsUUID()
  subscriptionPurchaseId: string;
}

@Controller()
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class PurchaseSubscriptionController {
  constructor(
    private readonly purchaseSubscriptionUseCase: PurchaseSubscriptionUseCase,
  ) {}

  @Post('subscription/purchase')
  @Roles(Role.User)
  purchase(
    @AuthUser() authenticatedUser: AuthenticatedUser,
    @Body() requestBody: PurchaseSubscriptionRequestBody,
  ): Promise<void> {
    return this.purchaseSubscriptionUseCase.execute(
      new PurchaseSubscriptionCommand(
        new SubscriptionPurchaseId(requestBody.subscriptionPurchaseId),
        new SubscriberId(authenticatedUser.id),
      ),
    );
  }
}
