import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  build: {
    minify: 'terser', // Usar Terser para minificar el JS en producción
    sourcemap: process.env.NODE_ENV === 'development' ? 'inline' : false, // Habilitar los sourcemaps solo en desarrollo
    assetsDir: 'assets',
  },
});
