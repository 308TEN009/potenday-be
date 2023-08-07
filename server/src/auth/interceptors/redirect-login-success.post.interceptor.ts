import { IsAuthenticationConfig } from '@config';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { Observable, map } from 'rxjs';

@Injectable()
export class RedirectInterceptor implements NestInterceptor {
  constructor(
    private readonly configService: ConfigService<IsAuthenticationConfig, true>,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(() => {
        const response = context.switchToHttp().getResponse<Response>();

        response.redirect(this.configService.get('loginSuccessRedirectUrl'));
      }),
    );
  }
}
