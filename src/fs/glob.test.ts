import { matchFromList } from './glob'

describe('glob', () => {
  describe('matchFromList', () => {
    it('no slash => baseNameMatch=true', async () => {
      const fromList = [import.meta.dirname]
      const matched = await matchFromList(fromList, '*.test.ts')
      expect(matched.includes(import.meta.filename)).toBe(true)
    })

    it('has slash => baseNameMatch=false', async () => {
      const fromList = [import.meta.dirname]
      const matched = await matchFromList(fromList, './**/*.test.ts')
      expect(matched.includes(import.meta.filename)).toBe(true)
    })

    it('case: default strict', async () => {
      const fromList = [import.meta.dirname]
      const matched = await matchFromList(fromList, '*.test.TS')
      expect(matched.length).toBe(0)
    })
    it('case: insensitive works', async () => {
      const fromList = [import.meta.dirname]
      const matched = await matchFromList(fromList, '*.test.TS', { caseSensitiveMatch: false })
      expect(matched.includes(import.meta.filename)).toBe(true)
    })
  })
})
