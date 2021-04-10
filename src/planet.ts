import conf from './config'
import { randomFloat, TAU } from './computations'
import { Color } from './types'
import { drawMeanOrbit, drawMeanPositionedBody } from './orbits'

class Planet {
  name: string
  distanceAU: number
  radiusKm: number
  orbitalPeriodDE: number
  color: Color
  startTheta: number
  thetaRad: number

  /**
   * Creates an instance of a planet.
   *
   * @param name name of the planet
   * @param distanceAU average distance from the Sun in astronomical units.
   * @param radiusKm radius of the body in km.
   * @param orbitalPeriodDE orbital period in Earth days
   * @param color the color in { r, g, b } shape.
   */
  constructor(
    name: string,
    distanceAU: number,
    radiusKm: number,
    orbitalPeriodDE: number,
    color: Color
  ) {
    this.name = name
    this.distanceAU = distanceAU
    this.radiusKm = radiusKm
    this.orbitalPeriodDE = orbitalPeriodDE
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
