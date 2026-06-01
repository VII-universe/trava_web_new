import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (id.includes('react-dom') || id.includes('react/'))  return 'react';
          if (id.includes('framer-motion'))                        return 'motion';
          if (id.includes('lenis'))                                return 'lenis';
          if (id.includes('@supabase'))                            return 'supabase';
          if (id.includes('lucide-react'))                         return 'icons';
          return 'vendor';
        },
      },
    },
    chunkSizeWarningLimit: 600,
    // Minification + tree-shaking jsou defaultně zapnuté v Vite production buildu
  },
})
