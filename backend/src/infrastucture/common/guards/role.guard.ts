import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TokenService } from 'src/domain/token/token.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly tokenService: TokenService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.getAllAndOverride('roles', [
      context.getHandler(),
    ]);

    if (roles?.length) {
      try {
        const request = context.switchToHttp().getRequest();
        const token = request.headers['authorization'].split(' ')[1];
        const payload = await this.tokenService.verifyToken(token);
        if (roles.includes(payload.role)) {
          return true;
        }
        return false;
      } catch (error) {
        return false;
      }
    }

    return true;
  }
}
