import { User } from '../user/user.entity';

export interface IPayloadSaveToken {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface IGetToken {
  user: User;
}
