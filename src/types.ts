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

type CanvasInfo = Readonly<{
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  width: number
  height: number
}>

type Color = Readonly<{
  r: string
  g: string
  b: string
}>

export type { PlanetData, CanvasInfo, Color }
