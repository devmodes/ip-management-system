import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "src/assets"),
      "@components": path.resolve(__dirname, "src/components"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@lib": path.resolve(__dirname, "src/lib"),
      "@providers": path.resolve(__dirname, "src/providers"),
      "@routes": path.resolve(__dirname, "src/routes"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@layouts": path.resolve(__dirname, "src/layouts"),
      "@store": path.resolve(__dirname, "src/store"),
    },
  },
});
