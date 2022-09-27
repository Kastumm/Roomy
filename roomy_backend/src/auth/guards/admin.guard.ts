import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requireState = this.reflector.getAllAndOverride<boolean>('isAdmin', [context.getHandler(), context.getClass()]);
    if (!requireState) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    if (requireState === user.isAdmin) {
      return true;
    }
  }
}
