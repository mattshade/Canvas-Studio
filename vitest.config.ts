import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    // Scoped to workspace source — avoid picking up **/node_modules/**/*.test.ts from deps (e.g. zod).
    include: [
      "lib/**/src/**/*.test.ts",
      "artifacts/**/src/**/*.test.ts",
      "scripts/**/*.test.ts",
    ],
    exclude: ["**/node_modules/**", "**/dist/**", ".pnpm-store", "**/generated/**"],
  },
});
