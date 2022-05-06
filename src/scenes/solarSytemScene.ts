import { CanvasInfo, line } from '@devstronomy/canvas'

import conf from '../config'
import { planets } from '../planets'
import { drawSun } from '../sun'
import Scene from './scene'

class SolarSystemScene extends Scene {
  constructor() {
    super(false)
  }

  render(ci: CanvasInfo): void {
    drawGrid(ci)
    drawSun(ci.ctx)
    planets.forEach((p) => {
      p.update(super.updateInterval())
      p.draw(ci)
    })
  }
}

function drawGrid(ci: CanvasInfo) {
  const width = ci.width
  const height = ci.height
  const scaledWidth = ci.scale(width)
  const scaledHeight = ci.scale(height)
  const gridGap = conf.planets.distanceFactor
  const lineBase = {
    color: `hsl(0, 0%, 20%)`,
    width: Math.min(ci.scale(1), 4),
  }

  // horizontal lines
  const xStart = -scaledWidth / 2 + ((scaledWidth / 2) % gridGap)
  for (let x = xStart; x < scaledWidth / 2; x += gridGap) {
    line(ci.ctx, { x1: x, y1: -scaledHeight / 2, x2: x, y2: scaledHeight / 2, ...lineBase })
  }

  // vertical lines
  const yStart = -scaledHeight / 2 + ((scaledHeight / 2) % gridGap)
  for (let y = yStart; y < scaledHeight / 2; y += gridGap) {
    line(ci.ctx, { x1: -scaledWidth / 2, y1: y, x2: scaledWidth, y2: y, ...lineBase })
  }
}

export default SolarSystemScene
