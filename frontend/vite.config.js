import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://backend-app:3000',  // Change localhost to backend-app
        secure: false,
      },
    },
  },
  plugins: [react()],
})
