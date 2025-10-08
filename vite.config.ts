import { defineConfig } from 'vite'

export default defineConfig({
  base:'/',
  build:{
    outDir:'dist'
  },
  server: {
    host: true,       // Escucha en 0.0.0.0 (todas las IPs disponibles)
    port: 5173,       // Puedes cambiar el puerto si lo deseas
  },
  plugins: [
    {
      name: 'replace-public-paths',
      enforce: 'pre',
      transform(code, id) {
        if (/\.(js|ts|vue|html|png|ico|jpg)$/.test(id)) {
          return code.replace(/\/public\//g, '/')
        }
      }
    }
  ]
})