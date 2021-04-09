type CanvasInfo = Readonly<{
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  width: number
  height: number
}>

type Color = Readonly<{
  r: string
  g: string
  b: string
}>

export type { CanvasInfo, Color }
