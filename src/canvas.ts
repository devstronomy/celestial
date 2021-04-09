import { CanvasInfo } from './types'

function clear({ ctx, width, height }: CanvasInfo): void {
  ctx.save()
  ctx.beginPath()
  ctx.translate(-100, 0)
  ctx.clearRect(0, 0, width, height)
  ctx.restore()
}

function stroke(ctx: CanvasRenderingContext2D, color: string): void {
  ctx.strokeStyle = color
  ctx.stroke()
}

function fill(ctx: CanvasRenderingContext2D, color: string): void {
  ctx.fillStyle = color
  ctx.fill()
}

function fillRGB(ctx: CanvasRenderingContext2D, r: string, g: string, b: string): void {
  ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
  ctx.fill()
}

export { clear, fill, fillRGB, stroke }
