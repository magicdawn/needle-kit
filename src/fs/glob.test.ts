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
  })
})
