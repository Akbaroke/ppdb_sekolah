import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TokenService } from 'src/domain/token/token.service';
export declare class RoleGuard implements CanActivate {
    private readonly reflector;
    private readonly tokenService;
    constructor(reflector: Reflector, tokenService: TokenService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
