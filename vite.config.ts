import { defineConfig } from 'vite'

export default defineConfig({
  base:'/',
  build:{
    outDir:'dist',
    assetsDir:'public',
    copyPublicDir: true
  },
  server: {
    host: true,       // Escucha en 0.0.0.0 (todas las IPs disponibles)
    port: 5173,       // Puedes cambiar el puerto si lo deseas
  }
})