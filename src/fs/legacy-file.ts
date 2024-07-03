import fse from 'fs-extra'

export async function processLegacyFiles(targetFile: string, legacyFiles: string[]) {
  for (const legacyFile of legacyFiles) {
    if (await fse.exists(legacyFile)) {
      if (!(await fse.exists(targetFile))) {
        await fse.rename(legacyFile, targetFile)
      } else {
        await fse.rm(legacyFile)
      }
    }
  }
}
