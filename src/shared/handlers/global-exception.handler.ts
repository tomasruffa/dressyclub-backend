import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

@Catch()
export class GlobalErrorHandler implements ExceptionFilter {
  private readonly logger = new Logger(GlobalErrorHandler.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const http = host.switchToHttp();
    const response: FastifyReply = http.getResponse();
    const request = http.getRequest<FastifyRequest>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseMessage =
      exception instanceof HttpException &&
      status !== HttpStatus.INTERNAL_SERVER_ERROR
        ? exception.message
        : 'Unexpected Error';

    const responseTime = `+${response.getResponseTime().toFixed(0)}ms`;
    const url = request.url;
    const method = request.method;

    const responseLog = `Response ${status} {${url}, ${method}} route ${responseTime}`;

    this.logger.error(
      responseLog,
      exception['stack'] ?? exception['message'] ?? 'unknown error',
    );

    response.status(status).send({
      status: 'error',
      code: status,
      data: {
        message: responseMessage,
      },
    });
  }
}
