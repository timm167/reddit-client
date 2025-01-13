import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Ensure this matches the directory you're deploying
    assetsDir: 'assets'
  },
  base: '/reddit-client/' // Set the base path if your repo name is reddit-client
})