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

  const enableThemeSettings =
    process.argv.includes('--theme-settings') ||
    process.argv.includes('--enable-theme-settings') ||
    process.env.VITE_ENABLE_THEME_SETTINGS === 'true' ||
    mode === 'theme-settings'

  // Sandbox mode flag: enabled by default in dev unless --no-sandbox or VITE_ENABLE_SANDBOX=false
  const isSandboxExplicitOff =
    process.argv.includes('--no-sandbox') ||
    process.argv.includes('--disable-sandbox') ||
    process.env.VITE_ENABLE_SANDBOX === 'false' ||
    mode === 'no-sandbox'

  const enableSandbox = !isSandboxExplicitOff

  return {
    base: './',
    build: {
      outDir: 'dist/electron-web',
    },
    define: {
      'import.meta.env.VITE_DISABLE_DEVTOOLS': JSON.stringify(
        disableDevtools ? 'true' : 'false'
      ),
      'import.meta.env.VITE_ENABLE_THEME_SETTINGS': JSON.stringify(
        enableThemeSettings ? 'true' : 'false'
      ),
      'import.meta.env.VITE_ENABLE_SANDBOX': JSON.stringify(
        enableSandbox ? 'true' : 'false'
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
}})
