import {
  ExecutionContext,
  ForbiddenException,
  createParamDecorator,
} from '@nestjs/common';

export const GetUser = createParamDecorator(
  async (_data: unknown, context: ExecutionContext) => {
    const { user } = context.switchToHttp().getRequest();
    try {
      if (!user) {
        throw new ForbiddenException('siapa anda?');
      }
      return user;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  },
);
