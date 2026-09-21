/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CLERK_PUBLISHABLE_KEY?: string
  readonly VITE_FACEBOOK_APP_ID?: string
  readonly VITE_FACEBOOK_APP_SECRET?: string
  readonly VITE_YOUTUBE_CLIENT_ID?: string
  readonly VITE_YOUTUBE_CLIENT_SECRET?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
