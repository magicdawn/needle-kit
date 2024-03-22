/**
 * search `searchName` in `currentPath`
 * @example searchDirUp('/a/b/c/d', 'b') => '/a/b'
 */
export function searchDirUp(currentPath: string, searchName: string) {
  const parts = currentPath.split('/')

  if (!parts.includes(searchName)) {
    throw new Error(`searchName(${searchName}) not in currentPath(${currentPath})`)
  }

  while (parts.length && parts.at(-1) !== searchName) {
    parts.pop()
  }

  return parts.join('/')
}
