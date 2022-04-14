import { CanvasInfo } from '@devstronomy/canvas'

abstract class Scene {
  private readonly startMs: number

  protected constructor(readonly isStatic: boolean) {
    this.startMs = Date.now()
  }

  abstract render(canvasInfo: CanvasInfo): void

  public initialize(canvasInfo: CanvasInfo): void {
    if (this.isStatic) {
      canvasInfo.redraw()
    } else {
      canvasInfo.startLoop()
    }
  }

  protected updateInterval() {
    return (Date.now() - this.startMs) / 1000
  }
}

export default Scene
