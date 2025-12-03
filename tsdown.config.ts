import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/index.ts'],
  format: 'esm',
  dts: true,
  target: 'node20',
  clean: true,
  treeshake: true,
  fixedExtension: false,
  define: {
    'import.meta.vitest': 'undefined',
  },
})
