/**
 * Although abbreviations are not the best developer's friend, for mathematical computations to be
 * readable the bellow shorthands are used:
 *
 * Module terminology:
 * - a: semi-major axis
 * - b: semi-minor axis
 * - le: linear eccentricity
 * - oe: orbital eccentricity
 * - peri: periapsis
 * - apo: apoapsis
 */

const semiMajor = (peri: number, apo: number): number => (peri + apo) / 2

/** Linear eccentricity from semi-major and semi-minor. */
const leFromAB = (a: number, b: number): number => Math.sqrt(a ** 2 - b ** 2)

/** Linear eccentricity from semi-major and peri. */
const leFromAP = (a: number, peri: number): number => a - peri

/** Linear eccentricity from semi-major and peri. */
const leFromAOe = (a: number, oe: number): number => a * oe

const oe = (a: number, b: number): number => leFromAB(a, b) / a

/** Semi-minor from semi-major and linear eccentricity. */
const bFromALe = (a: number, le: number): number => Math.sqrt(a ** 2 - le ** 2)

export { leFromAB, leFromAP, leFromAOe, oe, semiMajor, bFromALe }
