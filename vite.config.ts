import { defineConfig } from "vite";
import RubyPlugin from "vite-plugin-ruby";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [RubyPlugin(), tailwindcss()],
  resolve: {
    alias: {
      "@javascript": path.resolve(__dirname, "./app/frontend"),
    },
  },
});
