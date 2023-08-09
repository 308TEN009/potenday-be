export const AuthName = {
  ACCESS_TOKEN: 'x-access-token',
  REFRESH_TOKEN: 'x-refresh-token',
} as const;

export type AuthNameType = (typeof AuthName)[keyof typeof AuthName];
