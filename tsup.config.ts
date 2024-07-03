import { defineConfig } from 'tsup'

export default defineConfig((options) => {
  return {
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    target: 'node16',
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
