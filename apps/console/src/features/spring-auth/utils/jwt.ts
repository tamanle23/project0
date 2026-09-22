import type { JwtPayload } from '../types';

export function decodeJwt(token: string): JwtPayload | null {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;
    
    // Replace non-url compatible chars with base64 standard chars
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    
    // Decode base64 to string, then handle URI component encoding for special chars
    const jsonPayload = decodeURIComponent(
      window.atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    
    return JSON.parse(jsonPayload) as JwtPayload;
  } catch {
    return null;
  }
}

export function isTokenExpired(token: string, bufferSeconds = 10): boolean {
  const decoded = decodeJwt(token);
  if (!decoded || !decoded.exp) return true;
  return (decoded.exp * 1000) < (Date.now() + bufferSeconds * 1000);
}
