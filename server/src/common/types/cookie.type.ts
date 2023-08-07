export const CookieName = {
  ACCESS_TOKEN: 'x-access-token',
  REFRESH_TOKEN: 'x-refresh-token',
} as const;

export type CookieNameType = (typeof CookieName)[keyof typeof CookieName];
