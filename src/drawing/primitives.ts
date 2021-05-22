import { stroke } from '../canvas'
import { colors } from '../scenes/scenes'

function line(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color: string,
  width = 3
): void {
  ctx.save()
  ctx.beginPath()
  ctx.lineWidth = width
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  stroke(ctx, color)
  ctx.restore()
}

function dashedLine(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number
): void {
  ctx.save()
  ctx.beginPath()
  ctx.setLineDash([5, 5])
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  stroke(ctx, colors.dashedLine)
  ctx.restore()
}

function ellipse(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radiusX: number,
  radiusY: number
): void {
  ctx.save()
  ctx.beginPath()
  ctx.ellipse(x, y, radiusX, radiusY, 0, 0, Math.PI * 2)
  ctx.restore()
}

function circle(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number): void {
  ellipse(ctx, x, y, radius, radius)
}

export { line, dashedLine, ellipse, circle }
