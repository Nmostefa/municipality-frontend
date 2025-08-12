    import { defineConfig } from 'vite';
    import react from '@vitejs/plugin-react';

    export default defineConfig({
      plugins: [react()],
      build: {
        rollupOptions: {
          external: ['lucide-react'], // أضف هذا السطر لتعريف lucide-react كحزمة خارجية
        },
      },
      server: {
        host: true, // للسماح بالوصول من الشبكة المحلية أو Docker
      }
    });
    