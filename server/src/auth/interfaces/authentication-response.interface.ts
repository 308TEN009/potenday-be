export interface AuthenticationResponse {
  /** JWT AccessToken */
  accessToken: string;

  /** Refresh Token */
  refreshToken: string;
}
