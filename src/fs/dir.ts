import tildify from 'tildify'
import untildify from 'untildify'

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

/**
 * Convert between `tilde path (~/foo)` and `absolute path (/Users/sindresorhus/foo)`
 */
export const HomeDir = {
  /**
   * Convert a tilde path to an absolute path: `~/dev` → `/Users/sindresorhus/dev`.
   *
   * Also expands `~username` when the username matches the current user.
   */
  expand: untildify,

  /**
   * Convert an absolute path to a tilde path: `/Users/sindresorhus/dev` → `~/dev`.
   */
  fold: tildify,
}
