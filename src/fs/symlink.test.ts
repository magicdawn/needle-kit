import { hfs } from '@humanfs/node'
import fse from 'fs-extra'
import { basename, join } from 'path'
import { lnsfSafe } from './symlink'

describe('symlink', () => {
  const target = import.meta.filename
  const _path = join(import.meta.dirname, '../../test/fixtures/symlink/', basename(target) + '.txt')

  it('lnsfSafe', async () => {
    // remove _path first
    fse.removeSync(_path)

    // first create is ok
    lnsfSafe(target, _path)
    // second overwrite is ok
    lnsfSafe(target, _path)
  })

  it('lnsfSafe on a normal file', async () => {
    // remove _path
    fse.removeSync(_path)
    // nornal file
    await hfs.write(_path, 'hello world')

    // should throw error
    expect(() => lnsfSafe(target, _path)).toThrowError(/normal file/)
    expect(() => lnsfSafe(target, _path, { onExistingFile: 'throw' })).toThrowError(/normal file/)

    // should overwrite
    lnsfSafe(target, _path, { onExistingFile: 'delete' })
  })
})
