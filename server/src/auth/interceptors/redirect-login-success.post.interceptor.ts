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
import { AuthenticationResponse } from '../interfaces';

@Injectable()
export class RedirectInterceptor<T extends AuthenticationResponse>
  implements NestInterceptor
{
  constructor(
    private readonly configService: ConfigService<IsAuthenticationConfig, true>,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: T) => {
        const response = context.switchToHttp().getResponse<Response>();
        const accessToken = data.accessToken;
        const refreshToken = data.refreshToken;

        response.redirect(
          `${this.configService.get(
            'loginSuccessRedirectUrl',
          )}?accessToken=${accessToken}&refreshToken=${refreshToken}`,
        );
      }),
    );
  }
}
