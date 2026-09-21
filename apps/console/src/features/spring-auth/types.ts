export interface JwtPayload {
  sub: string;
  roles: string[];
  iat: number;
  exp: number;
  [key: string]: any;
}

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: JwtPayload | null;
  isAuthenticated: boolean;
  isSandbox: boolean;

  setTokens: (access: string, refresh: string) => void;
  clearTokens: () => void;
  expireAccessToken: () => void; // Dev helper
  expireRefreshToken: () => void; // Dev helper
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshResponse {
  accessToken: string;
  refreshToken?: string;
}
