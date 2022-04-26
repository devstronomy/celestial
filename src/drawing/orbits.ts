import { CanvasInfo, circle, ellipse, fillRGB, line, stroke } from '@devstronomy/canvas'

import { bFromALe, leFromAP, semiMajor } from '../computations'
import conf from '../config'
import Planet from '../planet'
import { colors } from '../scenes/scenes'

function computeRadius(radiusKm: number): number {
  return radiusKm * conf.planets.radiusScalingFactor
}

function scaledDistance(distanceAU: number): number {
  return distanceAU * conf.planets.distanceFactor
}

function drawMeanPositionedBody(ctx: CanvasRenderingContext2D, planet: Readonly<Planet>): void {
  ctx.save()
  ctx.beginPath()
  ctx.rotate(planet.thetaRad)
  ctx.translate(planet.scaledDistance(), 0)
  circle(ctx, { x: 0, y: 0, r: computeRadius(planet.radiusKm) })
  fillRGB(ctx, planet.color.r, planet.color.g, planet.color.b)
  stroke(ctx, 'black')
  ctx.restore()
}

function drawMeanOrbit(ci: CanvasInfo, { distanceAu }: Readonly<Planet>): void {
  ci.ctx.save()
  ci.ctx.beginPath()
  circle(ci.ctx, {
    x: 0,
    y: 0,
    r: scaledDistance(distanceAu),
    color: colors.dashedLine,
    dashed: true,
    width: 1 / ci.zoom.level,
  })
  ci.ctx.restore()
}

function drawOrbit(ctx: CanvasRenderingContext2D, perihelionKm: number, aphelionKm: number): void {
  ctx.save()
  ctx.beginPath()
  ctx.setLineDash([5, 5])
  const a = semiMajor(perihelionKm, aphelionKm)
  const le = leFromAP(a, perihelionKm)
  const b = bFromALe(a, le)
  ellipse(ctx, { x: 0 - scaledDistance(le), y: 0, rx: scaledDistance(a), ry: scaledDistance(b) })
  stroke(ctx, colors.dashedLine)
  ctx.restore()
}

function drawOrbitalElements(
  ctx: CanvasRenderingContext2D,
  meanPerihelionAu: number,
  meanAphelionAu: number
) {
  const meanPerihelion = scaledDistance(meanPerihelionAu)
  const meanAphelion = scaledDistance(meanAphelionAu)

  const a = semiMajor(meanPerihelion, meanAphelion)
  const le = leFromAP(a, meanPerihelion)
  const b = bFromALe(a, le)
  const aphelion = a + le
  const perihelion = a - le

  // axes
  line(ctx, { x1: -aphelion, y1: 0, x2: perihelion, y2: 0, color: colors.dashedLine, width: 3 }) // x
  line(ctx, { x1: -le, y1: 0, x2: -le, y2: b, color: colors.dashedLine, width: 3 }) // y

  line(ctx, { x1: -aphelion, y1: -2, x2: -le, y2: -2, color: colors.semiMajor, width: 3 })
  line(ctx, { x1: -le, y1: -b, x2: -2 * le, y2: 0, color: colors.semiMajor, width: 1 })
  line(ctx, { x1: -le, y1: 0, x2: -le, y2: -b, color: colors.semiMinor, width: 3 })
  line(ctx, { x1: 0, y1: -2, x2: -le, y2: -2, color: colors.linearEccentricity, width: 3 })
  line(ctx, { x1: 0, y1: 2, x2: -aphelion, y2: 2, color: colors.aphelion, width: 3 })
  line(ctx, { x1: 0, y1: 0, x2: perihelion, y2: 0, color: colors.perihelion, width: 3 })
}

export { drawMeanOrbit, drawMeanPositionedBody, drawOrbit, drawOrbitalElements }
