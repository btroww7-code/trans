import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class RateLimitGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    // ...rate limit logic (5 attempts / 15 min)...
    return true;
  }
}
