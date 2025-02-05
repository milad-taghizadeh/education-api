import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name); // Logger instance

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse() as string;
    }

    // Log the actual error for debugging
    this.logger.error(`Exception: ${JSON.stringify(exception)}`, exception instanceof Error ? exception.stack : '');

    // Send a generic response to the client
    response.status(status).json({
      statusCode: status,
      message: status === HttpStatus.INTERNAL_SERVER_ERROR ? 'Internal server error' : message,
      timestamp: new Date().toISOString(),
    });
  }
}