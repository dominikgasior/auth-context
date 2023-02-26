import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): AuthenticatedUser => {
    const { user } = context.switchToHttp().getRequest();

    if (!user) {
      throw new Error(
        'User is not added to the request, enable AuthenticationGuard',
      );
    }

    return user;
  },
);

export type AuthenticatedUser = {
  id: string;
  roles: string[];
};
