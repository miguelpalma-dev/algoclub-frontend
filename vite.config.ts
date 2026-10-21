import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Cuando tu app pida '/api/vestige', Vite lo redirigirá a 'https://api.vestige.fi'
      '/api/vestige': {
        target: 'https://api.vestige.fi',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/vestige/, ''),
      },
    },
  },
})