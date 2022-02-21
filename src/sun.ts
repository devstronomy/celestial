import { circle, fill, stroke } from '@devstronomy/canvas'

import conf from './config'

const sunRadiusKm = 695700

function drawSun(ctx: CanvasRenderingContext2D): void {
  circle(ctx, { x: 0, y: 0, r: sunRadiusKm * conf.sun.radiusScalingFactor })
  fill(ctx, 'yellow')
  stroke(ctx, 'orange')
}

export { drawSun }
