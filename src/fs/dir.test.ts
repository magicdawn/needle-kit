import { searchUpDir } from './dir'

test('getAncestorDir', () => {
  const fn = searchUpDir
  expect(fn('/a/b/c/d', 'b')).toBe('/a/b')
  expect(fn('/a/b/c/d', 'a')).toBe('/a')
  expect(fn('/a/b/c/d', 'c')).toBe('/a/b/c')
  expect(fn('/a/b/c/d', 'd')).toBe('/a/b/c/d')
  expect(() => fn('/a/b/c/d', 'e')).toThrow(/not in/)
})
