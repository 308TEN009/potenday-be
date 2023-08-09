import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { HttpStatusCode } from 'axios';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl } = req;
    const userAgent = req.get('user-agent') || '';
    res.on('finish', () => {
      const { statusCode } = res;

      if (statusCode <= HttpStatusCode.PermanentRedirect) {
        this.logger.log(
          `${method} ${statusCode} - ${originalUrl} - ${ip} - ${userAgent}`,
        );
      } else {
        this.logger.error(
          `${method} ${statusCode} - ${originalUrl} - ${ip} - ${userAgent}`,
        );
      }
    });
    next();
  }
}
