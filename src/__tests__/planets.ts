import { planets, pluto } from '../planets'

describe('planets', () => {
  describe('planets', () => {
    it('should return all planets of Solar System', () => {
      expect(planets.length).toBe(8)
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
