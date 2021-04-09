const linearEccentricity = (semiMajor: number, semiMinor: number): number =>
  Math.sqrt(semiMajor ** 2 - semiMinor ** 2)

const orbitalEccentricity = (semiMajor: number, semiMinor: number): number =>
  linearEccentricity(semiMajor, semiMinor) / semiMajor

const semiMajor = (periapsis: number, apoapsis: number): number => (periapsis + apoapsis) / 2

const semiMinor = (periapsis: number, apoapsis: number): number => (periapsis + apoapsis) / 2

export { linearEccentricity, orbitalEccentricity, semiMajor, semiMinor }
