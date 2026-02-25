import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      // Bất cứ request nào bắt đầu bằng /api sẽ được đẩy sang Backend cổng 5000
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  }
});