import planets from '../../../data/planets.json'
import { bFromALe, leFromAB, oe, semiMajor } from '../orbital'

describe('orbital', () => {
  describe('leFromAB', () => {
    it('should pass sanity check', () => {
      expect(leFromAB(5, 4)).toBe(3)
      expect(leFromAB(5, 3)).toBe(4)
    })

    it('should work for circle ', () => {
      expect(leFromAB(5, 5)).toBe(0)
    })

    it('should work flat line "ellipse"', () => {
      expect(leFromAB(5, 0)).toBe(5)
      expect(leFromAB(0, 5)).toBeNaN()
    })
  })

  describe('orbitalEccentricity', () => {
    it('should pass sanity check ', () => {
      expect(oe(5, 4)).toBe(0.6)
      expect(oe(5, 3)).toBe(0.8)
    })

    it('should work for circle ', () => {
      expect(oe(5, 5)).toBe(0)
    })

    it('should work flat line "ellipse"', () => {
      expect(oe(5, 0)).toBe(1)
      expect(oe(0, 5)).toBeNaN()
    })
  })

  describe('semiMajor', () => {
    it('should pass sanity check', () => {
      planets.forEach((planet) =>
        expect(semiMajor(planet.aphelion, planet.perihelion)).toBeCloseTo(planet.distanceFromSun, 0)
      )
    })
  })

  describe('semiMinorFromLeA', () => {
    it('should pass sanity check', () => {
      const a = 5
      const le = 4
      const b = bFromALe(a, le)
      expect(b).toBe(3)
    })
  })
})
