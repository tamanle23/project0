import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig(() => {
  // Resolve the path directly to the external package's production output directory
  const externalWebBuildPath = resolve(__dirname, '../../dist/web');

  return {
    // root: externalWebBuildPath, // Point root to the pre-built dist folder
    // base: './',                 // Ensure relative assets for file:// or custom protocols

    // Completely disable development server polling and middleware
    server: {
      middlewareMode: false,     // Disables Vite's own CLI HTML server serving mechanism
      hmr: false,               // Turn off Hot Module Replacement
      watch: null,              // Stop file watching to save system resources
    },

    build: {
      outDir: resolve(__dirname, '.vite/renderer/main_window'), // Output to a temporary directory for Electron to load
      emptyOutDir: true,
      rollupOptions: {
        // Feed the pre-built index.html from the external dist directory
        input: resolve(externalWebBuildPath, 'index.html'),
      },
    },
    resolve: {
      preserveSymlinks: true,
    },
  };
});
