import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap, map } from 'rxjs';
import { CookieOptions, Response as ExpressResponse } from 'express';
import { CookieName } from '@common';
import { AuthenticationResponse } from '../interfaces';

@Injectable()
export class AddTokenToCookiePostInterceptor<T extends AuthenticationResponse>
  implements NestInterceptor
{
  constructor(
    private readonly cookieOption: CookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    },
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap((data: T) => {
        const response: ExpressResponse = context.switchToHttp().getResponse();
        const accessToken = data.accessToken;
        const refreshToken = data.refreshToken;

        response.cookie(
          CookieName.ACCESS_TOKEN,
          accessToken,
          this.cookieOption,
        );
        response.cookie(
          CookieName.REFRESH_TOKEN,
          refreshToken,
          this.cookieOption,
        );
      }),
      map((data: T) => {
        delete (data as Partial<Pick<T, 'accessToken'>>).accessToken;
        delete (data as Partial<Pick<T, 'refreshToken'>>).refreshToken;

        return data;
      }),
    );
  }
}
