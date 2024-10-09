import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDocument } from './users/models/user.schema';

const getCurrentUserByContext = (context: ExecutionContext): UserDocument => {
  const user = context.switchToHttp().getRequest().user;
  console.error('USER: ' + JSON.stringify(user));
  return user;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    return getCurrentUserByContext(context);
  },
);
