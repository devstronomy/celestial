import { CanvasInfo } from '@devstronomy/canvas'

import { planets } from '../planets'
import { drawSun } from '../sun'
import Scene from './scene'

class SolarSystemScene extends Scene {
  constructor() {
    super(false)
  }

  render({ ctx }: CanvasInfo): void {
    drawSun(ctx)
    planets.forEach((p) => {
      p.update(super.updateInterval())
      p.draw(ctx)
    })
  }
}

export default SolarSystemScene
