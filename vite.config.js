import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "./", // 🔥 This line is essential for Firebase
  plugins: [react(), tailwindcss()],
});
