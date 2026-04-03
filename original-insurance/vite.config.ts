// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteImagemin from "vite-plugin-imagemin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteImagemin({
      gifsicle: false,
      optipng: { optimizationLevel: 5 },
      mozjpeg: { quality: 78, progressive: true },
      webp: { quality: 78 },
      svgo: {
        plugins: [
          { name: "removeViewBox", active: false },
          { name: "removeEmptyAttrs", active: true },
        ],
      },
    }),
  ],

  // ensure relative assets load correctly on Firebase
  base: "./",

  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    target: "es2015",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          animations: ["framer-motion", "lenis"],
          ui: ["lucide-react"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },

  server: {
    port: 5173,
    open: true,
  },

  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
