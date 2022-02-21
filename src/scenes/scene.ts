import { CanvasInfo } from '@devstronomy/canvas'

abstract class Scene {
  private readonly startMs: number

  protected constructor() {
    this.startMs = Date.now()
  }

  abstract render(canvasInfo: CanvasInfo): void

  protected updateInterval() {
    return (Date.now() - this.startMs) / 1000
  }
}

export default Scene
