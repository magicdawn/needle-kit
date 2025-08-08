import { lstatSync, rmSync, symlinkSync } from 'node:fs'
import { lstat, rm, symlink } from 'node:fs/promises'
import { dirname } from 'node:path'
import { ensureDir, ensureDirSync } from 'fs-extra'
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
export async function lnsfSafe(
  target: string,
  path: string,
  { onExistingFile = 'throw' }: { onExistingFile?: 'delete' | 'throw' } = {},
) {
  if (path.startsWith('~')) {
    path = untildify(path)
  }

  // dir
  await ensureDir(dirname(path))

  // not exists
  if (!(await symlinkExists(path))) {
    await symlink(target, path)
    return
  }

  const stat = await lstat(path)
  const isSymlink = stat.isSymbolicLink()

  if (isSymlink) {
    await rm(path)
  }
  // normal file
  else if (onExistingFile === 'delete') {
    await rm(path)
  } else {
    throw new Error(`path (${path}) in \`symlink(target,path)\` exists, it's a normal file(none symlink)`)
  }

  await symlink(target, path)
}

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
export function lnsfSafeSync(
  target: string,
  path: string,
  { onExistingFile = 'throw' }: { onExistingFile?: 'delete' | 'throw' } = {},
) {
  if (path.startsWith('~')) {
    path = untildify(path)
  }

  // dir
  ensureDirSync(dirname(path))

  // not exists
  if (!symlinkExistsSync(path)) {
    symlinkSync(target, path)
    return
  }

  const stat = lstatSync(path)
  const isSymlink = stat.isSymbolicLink()

  if (isSymlink) {
    rmSync(path)
  }
  // normal file
  else if (onExistingFile === 'delete') {
    rmSync(path)
  } else {
    throw new Error(`path (${path}) in \`symlink(target,path)\` exists, it's a normal file(none symlink)`)
  }

  symlinkSync(target, path)
}

export async function symlinkExists(symlinkPath: string) {
  try {
    await lstat(symlinkPath)
  } catch {
    return false
  }
  return true
}
export function symlinkExistsSync(symlinkPath: string) {
  try {
    lstatSync(symlinkPath)
  } catch {
    return false
  }
  return true
}
