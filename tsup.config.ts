import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  target: "es2023",
  dts: true,
  sourcemap: true,
  clean: true,
  minify: false,
  splitting: false,
});