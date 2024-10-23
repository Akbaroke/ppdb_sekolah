import { ROLE_USER } from 'src/domain/user/user.interface';
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: ROLE_USER[]) => SetMetadata('roles', roles);
