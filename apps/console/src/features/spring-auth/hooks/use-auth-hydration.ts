import { useEffect, useState } from 'react';
import { useSpringAuthStore } from '../store';
import { springApiClient } from '../api-client';

export function useAuthHydration() {
  const { refreshToken, setTokens, clearTokens } = useSpringAuthStore();
  const [isHydrating, setIsHydrating] = useState(true);

  useEffect(() => {
    let mounted = true;

    const hydrate = async () => {
      // If we don't have a refresh token (even in cookies, though we check local state here), we can skip.
      // In a real prod app with HttpOnly cookies, you might always attempt this on boot.
      if (!refreshToken) {
        if (mounted) setIsHydrating(false);
        return;
      }

      try {
        const { data } = await springApiClient.post('/api/auth/refresh', {
          refreshToken,
        });
        
        if (mounted) {
          setTokens(data.accessToken, data.refreshToken || refreshToken);
        }
      } catch (error) {
        if (mounted) {
          clearTokens();
        }
      } finally {
        if (mounted) {
          setIsHydrating(false);
        }
      }
    };

    hydrate();

    return () => {
      mounted = false;
    };
  }, []); // Run exactly once on mount

  return { isHydrating };
}
