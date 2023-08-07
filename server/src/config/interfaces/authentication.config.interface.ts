export interface IsAuthenticationConfig {
  readonly jwtPublicKey: string;
  readonly jwtPrivateKey: string;
  readonly loginSuccessRedirectUrl: string;
}
