import { IMessage } from '../message.interface';
export declare class ResponseRegister implements IMessage {
    httpStatus: number;
    message: string;
    email: string;
}
export declare class ResponseLogin implements IMessage {
    httpStatus: number;
    message: string;
    token: string;
}
export declare class ResponseGetOTP implements IMessage {
    httpStatus: number;
    message: string;
    email: string;
}
export declare class ResponsePostOTP implements IMessage {
    httpStatus: number;
    message: string;
    email: string;
    token: string;
}
export declare class ResponseResetPassword implements IMessage {
    httpStatus: number;
    message: string;
}
export declare class ResponseRefreshToken implements IMessage {
    httpStatus: number;
    message: string;
    token: string;
}
