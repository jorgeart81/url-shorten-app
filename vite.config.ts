import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Empty prefix loads every var from .env (not just VITE_*) into this
  // Node-only config, without exposing BACKEND_ORIGIN to the client bundle.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      babel({
        presets: [reactCompilerPreset()],
      }),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, './src'),
      },
    },
    server: {
      proxy: {
        // Same convention as nginx in production: the app only ever calls
        // "/api" (VITE_API_BASE_URL), and it's proxied here to the real
        // backend so the browser never sees BACKEND_ORIGIN directly.
        '/api': {
          target: env.BACKEND_ORIGIN,
          changeOrigin: true,
        },
      },
    },
  };
});
