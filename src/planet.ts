import conf from './config'
import { randomFloat, TAU } from './computations'
import { Color } from './types'
import { drawMeanOrbit, drawMeanPositionedBody } from './drawing'

class Planet {
  name: string
  distanceAU: number
  perihelionAU: number
  aphelionAU: number
  radiusKm: number
  orbitalPeriodDE: number
  orbitalEccentricity: number

  color: Color
  startTheta: number
  thetaRad: number

  /**
   * Creates an instance of a planet.
   *
   * @param name name of the planet
   * @param distanceAu average distance from the Sun in astronomical units.
   * @param perihelionAu perihelion in astronomical units.
   * @param aphelionAu aphelion in astronomical units.
   * @param radiusKm radius of the body in km.
   * @param orbitalPeriodDE orbital period in Earth days
   * @param orbitalEccentricity orbital eccentricity
   * @param color the color in { r, g, b } shape.
   */
  constructor(
    name: string,
    distanceAu: number,
    perihelionAu: number,
    aphelionAu: number,
    radiusKm: number,
    orbitalPeriodDE: number,
    orbitalEccentricity: number,
    color: Color
  ) {
    this.name = name
    this.distanceAU = distanceAu
    this.perihelionAU = perihelionAu
    this.aphelionAU = aphelionAu
    this.distanceAU = distanceAu
    this.radiusKm = radiusKm
    this.orbitalPeriodDE = orbitalPeriodDE
    this.orbitalEccentricity = orbitalEccentricity
    this.color = color

    // Angular position. Set random initial angular position for a planet in radians.
    this.startTheta = randomFloat(TAU)
    // current theta in radians
    this.thetaRad = 0
  }

  scaledDistance(): number {
    return this.distanceAU * conf.planets.distanceFactor
  }

  update(day: number): void {
    const rawTheta = -(TAU / this.orbitalPeriodDE) * day
    this.thetaRad = (this.startTheta + rawTheta * conf.planets.speedFactor) % TAU
  }

  draw(ctx: CanvasRenderingContext2D): void {
    drawMeanOrbit(ctx, this)
    drawMeanPositionedBody(ctx, this)
  }
}

export default Planet
