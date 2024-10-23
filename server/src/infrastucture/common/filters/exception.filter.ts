import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { LoggerService } from '../../logger/logger.service';

interface IError {
  message: string;
  statusCode: number;
}

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly logger: LoggerService,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const { message, statusCode } =
      exception instanceof HttpException
        ? {
            message: (exception.getResponse() as IError).message,
            statusCode: exception.getStatus(),
          }
        : { message: (exception as IError).message, statusCode: 500 };

    const path = httpAdapter.getRequestUrl(request);
    const method = httpAdapter.getRequestMethod(request);
    const status = HttpStatus[statusCode];
    const responseBody = {
      path,
      method,
      status,
      ...(Array.isArray(message)
        ? { message: message[0], statusCode }
        : { message, statusCode }),
    };

    this.logMessage(path, method, status, statusCode, message);
    httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
  }

  private logMessage(
    path: string,
    method: string,
    status: string,
    statusCode: number,
    message: string,
  ) {
    if (statusCode === 500) {
      this.logger.error(
        `End Request for ${path}`,
        `method=${method} status=${status} statusCode=${statusCode} message=${message}`,
      );
    } else {
      this.logger.warn(
        `End Request for ${path}`,
        `method=${method} status=${status} statusCode=${statusCode} message=${message}`,
      );
    }
  }
}
