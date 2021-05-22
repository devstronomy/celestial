import conf from './config'
import { randomFloat, TAU } from './computations'
import { Color } from './types'
import { drawMeanOrbit, drawMeanPositionedBody } from './drawing'

class Planet {
  // Angular position. Set random initial angular position for a planet in radians.
  private readonly startTheta: number = randomFloat(TAU)

  // current theta in radians
  thetaRad = 0

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
    readonly name: string,
    readonly distanceAu: number,
    readonly perihelionAu: number,
    readonly aphelionAu: number,
    readonly radiusKm: number,
    readonly orbitalPeriodDE: number,
    readonly orbitalEccentricity: number,
    readonly color: Color
  ) {}

  scaledDistance(): number {
    return this.distanceAu * conf.planets.distanceFactor
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
