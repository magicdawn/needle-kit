import { defineConfig } from 'tsup'

export default defineConfig(() => {
  return {
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    target: 'node20',
    clean: true,
    treeshake: { preset: 'recommended' },
    define: {
      'import.meta.vitest': 'undefined',
    },
    esbuildOptions(options, context) {
      options.charset = 'utf8'
    },
  }
})
