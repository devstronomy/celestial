import { linearEccentricity, orbitalEccentricity } from '../orbital'

describe('orbital', () => {
  describe('linearEccentricity', () => {
    it('should pass sanity check', () => {
      expect(linearEccentricity(5, 4)).toBe(3)
      expect(linearEccentricity(5, 3)).toBe(4)
    })

    it('should work for circle ', () => {
      expect(linearEccentricity(5, 5)).toBe(0)
    })

    it('should work flat line "ellipse"', () => {
      expect(linearEccentricity(5, 0)).toBe(5)
      expect(linearEccentricity(0, 5)).toBeNaN()
    })
  })

  describe('orbitalEccentricity', () => {
    it('should pass sanity check ', () => {
      expect(orbitalEccentricity(5, 4)).toBe(0.6)
      expect(orbitalEccentricity(5, 3)).toBe(0.8)
    })

    it('should work for circle ', () => {
      expect(orbitalEccentricity(5, 5)).toBe(0)
    })

    it('should work flat line "ellipse"', () => {
      expect(orbitalEccentricity(5, 0)).toBe(1)
      expect(orbitalEccentricity(0, 5)).toBeNaN()
    })
  })
})
