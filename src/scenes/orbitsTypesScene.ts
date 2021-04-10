import { CanvasInfo } from '../types'
import { planets } from '../planets'
import Planet from '../planet'
import { drawSun } from '../sun'
import { drawMeanOrbit, drawMeanPositionedBody, drawOrbit } from '../orbits'
import Scene from './scene'

class OrbitsTypesScene extends Scene {
  planet: Planet

  constructor() {
    super()
    this.planet = planets[2] // Earth
  }

  render({ ctx }: CanvasInfo) {
    this.planet.update(super.updateInterval())
    drawSun(ctx)
    drawMeanOrbit(ctx, this.planet)
    drawMeanPositionedBody(ctx, this.planet)

    drawOrbit(ctx, this.planet)
  }
}

export default OrbitsTypesScene
