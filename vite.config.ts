import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ogl: ['ogl']
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.indexOf('.otf') !== -1) {
            return 'fonts/[name].[hash][extname]';
          }
          return 'assets/[name].[hash][extname]';
        }
      }
    }
  },
  optimizeDeps: {
    include: ['ogl']
  },
  assetsInclude: ['**/*.otf'],
  publicDir: 'public',
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})