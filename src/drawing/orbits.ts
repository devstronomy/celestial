import { circle, dashedLine, ellipse, line } from './index'
import { fillRGB, stroke } from '../canvas'
import conf from '../config'
import Planet from '../planet'
import { leFromAP, semiMajor, bFromALe } from '../computations'
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
  circle(ctx, 0, 0, computeRadius(planet.radiusKm))
  fillRGB(ctx, planet.color.r, planet.color.g, planet.color.b)
  stroke(ctx, 'black')
  ctx.restore()
}

function drawMeanOrbit(ctx: CanvasRenderingContext2D, { distanceAu }: Readonly<Planet>): void {
  ctx.save()
  ctx.beginPath()
  ctx.setLineDash([5, 5])
  circle(ctx, 0, 0, scaledDistance(distanceAu))
  stroke(ctx, colors.dashedLine)
  ctx.restore()
}

function drawOrbit(ctx: CanvasRenderingContext2D, perihelionKm: number, aphelionKm: number): void {
  ctx.save()
  ctx.beginPath()
  ctx.setLineDash([5, 5])
  const a = semiMajor(perihelionKm, aphelionKm)
  const le = leFromAP(a, perihelionKm)
  const b = bFromALe(a, le)
  ellipse(ctx, 0 - scaledDistance(le), 0, scaledDistance(a), scaledDistance(b))
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
  dashedLine(ctx, -aphelion, 0, perihelion, 0) // x
  dashedLine(ctx, -le, 0, -le, b) // y

  line(ctx, -aphelion, -2, -le, -2, colors.semiMajor)
  line(ctx, -le, -b, -2 * le, 0, colors.semiMajor, 1)
  line(ctx, -le, 0, -le, -b, colors.semiMinor)
  line(ctx, 0, -2, -le, -2, colors.linearEccentricity)
  line(ctx, 0, 2, -aphelion, 2, colors.aphelion)
  line(ctx, 0, 0, perihelion, 0, colors.perihelion)
}

export { drawMeanOrbit, drawMeanPositionedBody, drawOrbit, drawOrbitalElements }
