import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {VitePWA, VitePWAOptions} from 'vite-plugin-pwa';
// https://vitejs.dev/config/


export default defineConfig({
  base: './',
  plugins: [react(), ],
});
