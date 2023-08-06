import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: [{ find: "@/lib", replacement: path.resolve(__dirname, "./src/lib") }],
  },
  test: {
    globals: true,
  },
});
