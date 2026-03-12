// vite.config.js
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        pageLPE: resolve(__dirname, 'pageLessonPlayEnhanced.html'),
        admin: resolve(__dirname, 'admin.html')
      },
    },
  },
  define: {
    // Firebase 일부 패키지가 process.env를 참조하는 경우가 있으므로 아래 추가
    'process.env': {},
  },
});
