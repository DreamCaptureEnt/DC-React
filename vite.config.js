import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Bind to all IP addresses (allow access via local network)
    port: 8000        // Optional: Define the port number (default is 3000)
  }
})