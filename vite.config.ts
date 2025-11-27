// File: vite.config.ts (MODIFIED to add API proxy)

import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        // --- NEW PROXY CONFIGURATION START ---
        proxy: {
            '/api': {
                target: 'http://localhost:5000', // Forward /api requests to your Express server
                changeOrigin: true,             // Needed for virtual hosts
                secure: false,                  // Set to true if you are using HTTPS
            }
        },
        // --- NEW PROXY CONFIGURATION END ---
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});