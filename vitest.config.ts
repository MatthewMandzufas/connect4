import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: { setupFiles: ["./vitest-custom-matchers.ts"] },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
