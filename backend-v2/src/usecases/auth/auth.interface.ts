import { IMessage } from '../message.interface';
import { IPayloadToken } from '../../infrastucture/authentication/token-management/token.interface';

export type TMessageWithEmail = IMessage & { email: string };
export type TMessageWithToken = IMessage & { token: string };
export type TMessageLogin = IMessage & {
  token: string;
  email: string;
  role: string;
};
export type TMessageWithIPayloadToken = IMessage & IPayloadToken;
