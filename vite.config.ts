import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Empty prefix loads every var from .env (not just VITE_*) into this
  // Node-only config, without exposing BACKEND_ORIGIN to the client bundle.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react({ babel: { plugins: ['babel-plugin-react-compiler'] } }),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
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
