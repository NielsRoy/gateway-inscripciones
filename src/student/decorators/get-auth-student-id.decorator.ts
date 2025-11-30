import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetAuthStudentId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.studentId;
  },
);