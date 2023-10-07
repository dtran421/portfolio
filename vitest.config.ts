import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: [{ find: "@/utils", replacement: path.resolve(__dirname, "./src/utils") }],
  },
  test: {
    globals: true,
  },
});
