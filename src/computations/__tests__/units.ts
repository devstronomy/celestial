import { auToKm, auToKm6, km6ToAu, kmToAu } from '../units'
import { AU_m } from '../../constants'

describe('units', () => {
  describe('kmToAu', () => {
    it('should compute properly', () => {
      expect(kmToAu(AU_m / 1000)).toBe(1)
    })
  })
  describe('km6ToAu', () => {
    it('should compute properly', () => {
      expect(km6ToAu(AU_m / 10 ** 9)).toBe(1)
    })
  })
  describe('auToKm', () => {
    it('should compute properly', () => {
      expect(auToKm(1)).toBeCloseTo(AU_m / 1000)
    })
  })
  describe('auToKm6', () => {
    it('should compute properly', () => {
      expect(auToKm6(1)).toBeCloseTo(AU_m / 10 ** 9)
    })
  })
})
