import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * @deprecated Not Using Cookie
 */
@Injectable()
export class JwtAuthRefreshGuard extends AuthGuard('refresh-jwt') {}
