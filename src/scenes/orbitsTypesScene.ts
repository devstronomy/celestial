import { CanvasInfo } from '../types'
import { planets } from '../planets'
import Planet from '../planet'
import { drawSun } from '../sun'
import { drawMeanOrbit, drawMeanPositionedBody, drawOrbit } from '../orbits'
import Scene from './scene'

class OrbitsTypesScene extends Scene {
  planet: Planet
  delta: number

  constructor() {
    super()
    this.planet = planets[2] // Earth
    this.delta = 0.01
  }

  render({ ctx }: CanvasInfo) {
    if (this.planet.aphelionAU > 1.85) {
      this.delta = -0.005
    }
    if (this.planet.aphelionAU < 1) {
      this.delta = 0.005
    }
    this.planet.aphelionAU = this.planet.aphelionAU + this.delta
    this.planet.perihelionAU = this.planet.perihelionAU - this.delta
    this.planet.update(super.updateInterval())
    drawSun(ctx)
    drawMeanOrbit(ctx, this.planet)
    drawMeanPositionedBody(ctx, this.planet)

    drawOrbit(ctx, this.planet)
  }
}

export default OrbitsTypesScene
