import fse from 'fs-extra'
import { dirname } from 'path'
import untildify from 'untildify'

/**
 * `ln -sf`, but safe
 *
 * ## About Safe
 * 1. if `path` not exists, create the symlink. (✅ safe)
 * 2. if `path` exists as a symlink, delete existing symlink & create new one. (✅ safe)
 * 3. if `path` exists as a normal file(not a symlink), an error will be thrown. (❌ not safe, since u may lost data)
 *
 * ## Features
 * - `path` support tilde(~)
 */

export function lnsfSafe(
  target: string,
  path: string,
  { onExistingFile = 'throw' }: { onExistingFile?: 'delete' | 'throw' } = {},
) {
  if (path.startsWith('~')) {
    path = untildify(path)
  }

  // dir
  fse.ensureDirSync(dirname(path))

  // not exists
  if (!symlinkExists(path)) {
    fse.symlinkSync(target, path)
    return
  }

  const stat = fse.lstatSync(path)
  const isSymlink = stat.isSymbolicLink()

  if (isSymlink) {
    fse.rmSync(path)
  }
  // normal file
  else {
    if (onExistingFile === 'delete') {
      fse.rmSync(path)
    } else {
      throw new Error(
        `path (${path}) in \`symlink(target,path)\` exists, it's a normal file(none symlink)`,
      )
    }
  }

  fse.symlinkSync(target, path)
}

export function symlinkExists(symlinkPath: string) {
  try {
    fse.lstatSync(symlinkPath)
  } catch (e) {
    return false
  }
  return true
}
