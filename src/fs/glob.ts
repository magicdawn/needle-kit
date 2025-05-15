import { finderSort } from '@magicdawn/finder-sort'
import fg from 'fast-glob'
import mm from 'micromatch'
import { isDirectory, isFile, isSymlink } from 'path-type'

export function customFinderSort(files: string[]) {
  return finderSort(files, { locale: 'zh-CN' })
}

export async function matchFromList(selected: string[], pattern: string | string[], fgOptions?: Partial<fg.Options>) {
  const hasSlash = [pattern].flat().some((p) => p.includes('/'))
  const baseNameMatch = fgOptions?.baseNameMatch ?? !hasSlash

  const queue: string[] = []
  for (const item of selected) {
    if (await isSymlink(item)) {
      continue
    }

    // dir
    if (await isDirectory(item)) {
      const files = await fg(pattern, {
        caseSensitiveMatch: true,
        cwd: item,
        absolute: true,
        followSymbolicLinks: false,
        baseNameMatch,
        ...fgOptions,
      })
      queue.push(...customFinderSort(files))
    }
    // file
    else if (await isFile(item)) {
      // https://github.com/micromatch/micromatch/issues/9#issuecomment-1529612035
      queue.push(...mm([item], pattern, { basename: baseNameMatch }))
    }
  }

  return queue
}
