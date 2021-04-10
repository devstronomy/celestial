import { circle } from './drawing'
import conf from './config'
import { fill, stroke } from './canvas'

const sunRadiusKm = 695700

function drawSun(ctx: CanvasRenderingContext2D): void {
  circle(ctx, 0, 0, sunRadiusKm * conf.sun.radiusScalingFactor)
  fill(ctx, 'yellow')
  stroke(ctx, 'orange')
}

export { drawSun }
