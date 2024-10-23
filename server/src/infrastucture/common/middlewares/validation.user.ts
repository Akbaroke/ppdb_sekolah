import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request as ExpressRequest, Response, NextFunction } from 'express';
import { IPayloadToken } from 'src/infrastucture/authentication/token-management/token.interface';

interface CustomRequest extends ExpressRequest {
  user: IPayloadToken;
}

@Injectable()
export class CheckUserIdMiddleware implements NestMiddleware {
  use(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const userIdFromToken = req.user.id;
      const userIdFromParams = req.params.id;

      if (userIdFromToken === userIdFromParams) {
        next();
      } else {
        throw new UnauthorizedException('Unauthorized access');
      }
    } catch (error) {
      throw new UnauthorizedException('Unauthorized access');
    }
  }
}
