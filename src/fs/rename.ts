import path from 'node:path'

export function transformFilename(
  file: string,
  {
    baseSuffix = '',
    transformBase,
    newExt,
  }: {
    baseSuffix?: string
    transformBase?: (base: string) => string
    newExt?: string
  },
) {
  const dir = path.dirname(file)
  let ext = path.extname(file)
  let base = path.basename(file, ext)

  // ext
  if (newExt) {
    ext = newExt
    if (!ext.startsWith('.')) ext = `.${ext}`
  }

  // base
  if (baseSuffix) base += baseSuffix
  if (transformBase) base = transformBase(base)

  return path.join(dir, base + ext)
}

if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest
  test('transformFilename', () => {
    expect(transformFilename('a.txt', { baseSuffix: '-b' })).toBe('a-b.txt')
    expect(transformFilename('a.txt', { baseSuffix: '-b', newExt: '.js' })).toBe('a-b.js')
    expect(transformFilename('/a/b/c/d.txt', { baseSuffix: '-e', newExt: '.js' })).toBe('/a/b/c/d-e.js')
  })
}
