import { CanvasInfo } from '../types'

interface Scene {
  render(canvasInfo: CanvasInfo): void
}

export default Scene
