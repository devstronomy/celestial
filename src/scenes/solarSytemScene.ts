import { CanvasInfo } from '@devstronomy/canvas'

import { planets } from '../planets'
import { drawSun } from '../sun'
import Scene from './scene'

class SolarSystemScene extends Scene {
  constructor() {
    super(false)
  }

  render(ci: CanvasInfo): void {
    drawSun(ci.ctx)
    planets.forEach((p) => {
      p.update(super.updateInterval())
      p.draw(ci)
    })
  }
}

export default SolarSystemScene
