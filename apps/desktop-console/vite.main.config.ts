import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  // 1. Load env variables from the root directory based on current mode (dev or prod)
  // Set the 3rd parameter to '' to capture ALL keys instead of just those prefixed with VITE_
  const env = loadEnv(mode, process.cwd(), '');

  return {
    // 2. Use 'define' to globally stringify and inject variables into the bundle
    define: {
      'process.env.RENDERER_URL': JSON.stringify(env.RENDERER_URL),
    },
  };
});
