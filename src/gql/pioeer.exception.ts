import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';

export class PioneerException extends HttpException {
  constructor(reason: any) {
    super(reason, 500);
  }
}

@Catch(HttpException)
export class PioneerExceptionFilter
  implements ExceptionFilter<PioneerException>
{
  private readonly logger = new Logger(PioneerExceptionFilter.name);

  catch(exception: PioneerException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    this.logger.error(exception);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
