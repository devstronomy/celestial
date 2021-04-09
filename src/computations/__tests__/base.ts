import { randomFloat, TAU } from '../base'

describe('base', () => {
  describe('randomFloat', () => {
    it('should pass sanity check', () => {
      for (let i = 0; i < 100; i++) {
        expect(randomFloat(TAU)).toBeLessThanOrEqual(TAU)
      }
    })
  })
})
