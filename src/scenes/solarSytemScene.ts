import Scene from './scene'
import Planet from '../planet'
import { planets } from '../planets'
import { CanvasInfo } from '../types'
import { drawSun } from '../sun'

class SolarSystemScene extends Scene {
  planets: Planet[]

  constructor() {
    super()
    // TODO: hide outer planets until having a meaningful way to display them. E.g., zooming.
    this.planets = planets.slice(0, 4)
  }

  render({ ctx }: CanvasInfo): void {
    drawSun(ctx)
    this.planets.forEach((p) => {
      p.update(super.updateInterval())
      p.draw(ctx)
    })
  }
}

export default SolarSystemScene
