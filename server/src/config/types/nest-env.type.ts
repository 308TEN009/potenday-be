/** Server Environment Variable */
export const NEST_ENV = {
  PRODUCTION: 'production',
  DEV: 'development',
  STAGING: 'test',
} as const;

/** Server Environment Variable Type */
export type NestEnvType = (typeof NEST_ENV)[keyof typeof NEST_ENV];
