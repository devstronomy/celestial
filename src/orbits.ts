import { circle, colors } from './drawing'
import { fillRGB, stroke } from './canvas'
import conf from './config'
import Planet from './planet'

function computeRadius(radiusKm: number): number {
  return radiusKm * conf.planets.radiusScalingFactor
}

function scaledDistance(distanceAU: number): number {
  return distanceAU * conf.planets.distanceFactor
}

function drawMeanPositionedBody(ctx: CanvasRenderingContext2D, planet: Planet): void {
  ctx.save()
  ctx.beginPath()
  ctx.rotate(planet.thetaRad)
  ctx.translate(planet.scaledDistance(), 0)
  circle(ctx, 0, 0, computeRadius(planet.radiusKm))
  fillRGB(ctx, planet.color.r, planet.color.g, planet.color.b)
  stroke(ctx, 'black')
  ctx.restore()
}

function drawMeanOrbit(ctx: CanvasRenderingContext2D, { distanceAU }: Planet): void {
  ctx.save()
  ctx.beginPath()
  ctx.setLineDash([5, 5])
  circle(ctx, 0, 0, scaledDistance(distanceAU))
  stroke(ctx, colors.dashedLine)
  ctx.restore()
}

function drawOrbit(ctx: CanvasRenderingContext2D, { distanceAU }: Planet): void {
  ctx.save()
  ctx.beginPath()
  ctx.setLineDash([5, 5])
  circle(ctx, 0, 0, scaledDistance(distanceAU))
  stroke(ctx, colors.dashedLine)
  ctx.restore()
}

export { drawMeanOrbit, drawOrbit, drawMeanPositionedBody }
