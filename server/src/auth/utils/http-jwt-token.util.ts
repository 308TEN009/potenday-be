import { AuthNameType } from '@common';
import { Request } from 'express';

/**
 * HTTP 쿠키 추출
 * @param req Request
 * @param cookieName 쿠키이름 (key)
 * @returns string, 해당 쿠키 값
 * @returns null, 키값에 해당하는 쿠키가 존재하지 않는 경우
 */
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

/**
 * HTTP Authroization Header 추출
 * @param request Request
 * @returns string, JWT 토큰 본문 (Bearer 제거)
 * @returns null, 키값에 해당하는 토큰이 존재하지 않는 경우
 */
export function extractTokenFromHeader(request: Request): string | null {
  const [type, token] = request.headers.authorization?.split(' ') ?? [];
  return type === 'Bearer' ? token : null;
}
