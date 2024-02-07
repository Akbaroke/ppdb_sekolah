import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { LoggerService } from '../../logger/logger.service';
export declare class ExceptionsFilter implements ExceptionFilter {
    private readonly httpAdapterHost;
    private readonly logger;
    constructor(httpAdapterHost: HttpAdapterHost, logger: LoggerService);
    catch(exception: unknown, host: ArgumentsHost): void;
    private logMessage;
}
