import { planets, pluto } from '../planets'

describe('planets', () => {
  describe('planets', () => {
    it('should contains all planets of Solar System', () => {
      expect(planets.length).toBe(8)
    })

    it('should be sorted by distance by default', () => {
      planets
        .map((p) => p.distanceAU)
        .reduce((prev: number, current: number) => {
          expect(prev).toBeLessThan(current)
          return current
        }, 0)
    })
  })

  describe('pluto', () => {
    it('should be defined properly', () => {
      expect(pluto).toBeDefined()
      expect(pluto.name).toBe('Pluto')
      expect(pluto.distanceAU).toBeCloseTo(39.48)
    })
  })
})
