import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { componentTagger } from 'lovable-tagger';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: '::',
    port: 8080,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Shree Raghavendra Swami Temple',
        short_name: 'Shree Raghavendra Swami Temple',
        description:
          'Official website of Shree Raghavendra Swami Temple. Explore seva bookings, daily poojas, temple events, annadana seva, and more.',
        theme_color: ' #ffd700',
        icons: [
          {
            src: '/favicon.ico',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/favicon.ico',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/favicon.ico',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}));
