import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { IamModule } from './iam/iam.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { ContentManagementModule } from './content-management/content-management.module';

@Module({
  imports: [IamModule, SubscriptionModule, ContentManagementModule],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe(),
    },
  ],
})
export class AppModule {}
