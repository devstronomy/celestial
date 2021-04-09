import Scene from './scene'
import Planet from '../planet'
import { getPlanets } from '../planets'
import conf from '../config'
import { circle } from '../drawing'
import { fill, stroke } from '../canvas'
import { CanvasInfo } from '../types'

class SolarSystemScene implements Scene {
  planets: Planet[]
  startMs: number

  constructor() {
    // TODO: hide outer planets until having a meaningful way to display them. E.g., zooming.
    this.planets = getPlanets().slice(0, 4)
    this.startMs = Date.now()
  }

  drawSun(ctx: CanvasRenderingContext2D): void {
    const sunRadiusKm = 695700
    circle(ctx, 0, 0, sunRadiusKm * conf.sun.radiusScalingFactor)
    fill(ctx, 'yellow')
    stroke(ctx, 'orange')
  }

  render({ ctx }: CanvasInfo): void {
    this.drawSun(ctx)
    this.planets.forEach((p) => {
      p.update((Date.now() - this.startMs) / 1000)
      p.draw(ctx)
    })
  }
}

export default SolarSystemScene
