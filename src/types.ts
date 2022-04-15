type PlanetData = Readonly<{
  id: number
  name: string
  mass: number
  diameter: number
  density: number
  gravity: number
  escapeVelocity: number
  rotationPeriod: number
  lengthOfDay: number
  distanceFromSun: number
  perihelion: number
  aphelion: number
  orbitalPeriod: number
  orbitalVelocity: number
  orbitalInclination: number
  orbitalEccentricity: number
  obliquityToOrbit: number
  meanTemperature: number
  surfacePressure: number | null
  numberOfMoons: number
  hasRingSystem: boolean
  hasGlobalMagneticField: boolean
}>

type Celestial = Readonly<{
  changeSceneType: (sceneType: SceneType) => void
  endSimulation: () => void
}>

enum SceneType {
  Ellipse,
  OrbitTypes,
  CircularOrbits,
}

export type { Celestial, PlanetData }
export { SceneType }
