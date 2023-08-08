import { AuthNameType } from '@common';
import { Request } from 'express';

export const extractTokenFromRequest = (
  req: Request,
  cookieName: AuthNameType,
): string | null => {
  if (
    req.cookies &&
    cookieName in req.cookies &&
    req.cookies[cookieName].length > 0
  ) {
    return req.cookies[cookieName];
  }

  return null;
};

export function extractTokenFromHeader(request: Request): string | null {
  const [type, token] = request.headers.authorization?.split(' ') ?? [];
  return type === 'Bearer' ? token : null;
}
