import { leFromAB, leFromAP, orbitalEccentricity, semiMajor, semiMinorFromLeA } from '../orbital'

import planets from '../../../data/planets.json'

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

  describe('semiMajor', () => {
    it('should pass sanity check', () => {
      planets.forEach((planet) =>
        expect(semiMajor(planet.aphelion, planet.perihelion)).toBeCloseTo(planet.distanceFromSun, 0)
      )
    })
  })

  describe('semiMinorFromLeA', () => {
    it('should pass sanity check', () => {
      planets.forEach((planet) => {
        const a = semiMajor(planet.perihelion, planet.aphelion)
        const le = leFromAP(a, planet.perihelion)
        const expectedLe = undefined // MK: Fixme
        expect(semiMinorFromLeA(a, le)).toBeCloseTo(expectedLe, 0)
      })
    })
  })
})
