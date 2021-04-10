// Linear eccentricity from semi-major and semi-minor.
const leFromAB = (semiMajor: number, semiMinor: number): number =>
  Math.sqrt(semiMajor ** 2 - semiMinor ** 2)

// Linear eccentricity from semi-major and periapsis.
const leFromAP = (semiMajor: number, periapsis: number): number => semiMajor - periapsis

const orbitalEccentricity = (semiMajor: number, semiMinor: number): number =>
  leFromAB(semiMajor, semiMinor) / semiMajor

const semiMajor = (periapsis: number, apoapsis: number): number => (periapsis + apoapsis) / 2

// Semi-minor from semi-major and linear eccentricity.
const semiMinorFromLeA = (semiMajor: number, linearEccentricity: number): number =>
  Math.sqrt(semiMajor ** 2 - linearEccentricity ** 2)

export { leFromAB, leFromAP, orbitalEccentricity, semiMajor, semiMinorFromLeA }
