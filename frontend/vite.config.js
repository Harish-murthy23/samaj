import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',         // important to expose to network
    port: 5173,
    strictPort: true,
    allowedHosts: 'all'      // optional but helpful
  }
});