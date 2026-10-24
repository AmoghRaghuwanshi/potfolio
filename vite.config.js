import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      output: {
        manualChunks: { three: ['three', 'three/addons/geometries/RoundedBoxGeometry.js', 'three/addons/environments/RoomEnvironment.js'] },
      },
    },
  },
});
