import fse from 'fs-extra'
import { homedir } from 'os'
import path, { basename, join } from 'path'
import { lnsfSafe } from './symlink'

describe('symlink', () => {
  const target = import.meta.filename
  const _path = join(import.meta.dirname, '../../test/fixtures/symlink/', basename(target) + '.txt')

  it('lnsfSafe', async () => {
    // remove _path first
    fse.removeSync(_path)

    // first create is ok
    await lnsfSafe(target, _path)
    // second overwrite is ok
    await lnsfSafe(target, _path)
  })

  it('lnsfSafe on a normal file', async () => {
    // remove _path
    fse.removeSync(_path)
    // nornal file
    fse.outputFileSync(_path, 'hello world')

    // should throw error
    expect(() => lnsfSafe(target, _path)).rejects.toThrowError(/normal file/)
    expect(() => lnsfSafe(target, _path, { onExistingFile: 'throw' })).rejects.toThrowError(
      /normal file/,
    )

    // should overwrite
    await lnsfSafe(target, _path, { onExistingFile: 'delete' })
  })

  it('supports ~ in _path', async ({ skip }) => {
    if (!process.env.CI) {
      return skip()
    }

    const dir = '__tmp_needle-kit-tests__'
    const _pathPart = `${dir}/test.txt`
    await lnsfSafe(__filename, `~/${_pathPart}`)

    // clean up
    fse.removeSync(path.join(homedir(), dir))
  })
})
