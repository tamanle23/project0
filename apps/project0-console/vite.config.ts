import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const disableDevtools =
    process.argv.includes('--no-devtools') ||
    process.argv.includes('--disable-devtools') ||
    process.env.VITE_DISABLE_DEVTOOLS === 'true' ||
    mode === 'no-devtools'

  return {
    base: './',
    build: {
      outDir: 'dist/web',
    },
    define: {
      'import.meta.env.VITE_DISABLE_DEVTOOLS': JSON.stringify(
        disableDevtools ? 'true' : 'false'
      ),
    },
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
    ssr: {
      // Force Vite to bundle all npm packages into your server chunk
      noExternal: true,
      // Specify target environment constraints
      target: 'webworker'
    }
  }
})
