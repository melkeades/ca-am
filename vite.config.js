import { defineConfig } from 'vite'
// import eslintPlugin from 'vite-plugin-eslint'

// vite.config.js
export default defineConfig({
  // plugins: [eslintPlugin({ cache: false })],
  server: {
    host: 'localhost',
    cors: '*',
    hmr: {
      host: 'localhost',
      protocol: 'ws',
    },
    watch: {
      usePolling: true,
    },
  },
  build: {
    // sourcemap: 'inline',
    minify: true,
    manifest: true,
    rollupOptions: {
      input: './main.js',
      output: {
        format: 'umd',
        entryFileNames: 'main.js',
        esModule: false,
        compact: true,
        globals: {
          jquery: '$',
        },
      },
      external: ['jquery'],
    },
  },
})
