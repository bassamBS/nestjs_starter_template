import { HttpStatus, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger();

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      const { method, url } = req;
      const { statusCode } = res;
      const request = `[${method}] ${url} — ${statusCode}`;

      const { FORBIDDEN, NOT_FOUND, METHOD_NOT_ALLOWED } = HttpStatus;

      if ([FORBIDDEN, NOT_FOUND, METHOD_NOT_ALLOWED].includes(statusCode)) {
        return this.logger.warn(request);
      }

      this.logger.log(request);
    });

    next();
  }
}
