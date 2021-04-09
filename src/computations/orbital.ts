const linearEccentricity = (semiMajor: number, semiMinor: number): number =>
  Math.sqrt(semiMajor ** 2 - semiMinor ** 2)

const orbitalEccentricity = (semiMajor: number, semiMinor: number): number =>
  linearEccentricity(semiMajor, semiMinor) / semiMajor

export { linearEccentricity, orbitalEccentricity }
