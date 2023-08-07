import { CookieNameType } from '@common';
import { Request } from 'express';

export const extractTokenFromRequest = (
  req: Request,
  cookieName: CookieNameType,
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
