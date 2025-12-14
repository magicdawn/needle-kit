import path from 'node:path'
import memoize from 'memoize'

export class LocalFile {
  /** 目录 */
  public dir: string
  /** 字段包含 name: 表示长名, 包括扩展名 */
  public basename: string
  /** 字段不含 name: 表示短名, 不包括扩展名 */
  public base: string
  /** 字段包含 name: 表示长名, 包括 . */
  public extname: string
  /** 字段不含 name: 表示短名, 不包括 . */
  public ext: string

  public constructor(public filePath: string) {
    this.filePath = path.resolve(filePath)

    const file = this.filePath
    this.dir = path.dirname(file)

    this.basename = path.basename(file)
    this.base = path.basename(file, path.extname(file)) // 不带扩展名

    this.extname = path.extname(file)
    this.ext = path.extname(file).slice(1) // 不带 .
  }
}
const newLocalFile = (filePath: string) => new LocalFile(filePath)
export const localFile = memoize(newLocalFile)
