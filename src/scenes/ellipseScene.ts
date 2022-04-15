import { CanvasInfo, circle, ellipse, fill, line, stroke } from '@devstronomy/canvas'

import { leFromAB, oe } from '../computations'
import Scene from './scene'
import { colors, tabularize } from './scenes'

class EllipseScene extends Scene {
  private a = 0 // semi-major axis
  private b = 0 // semi-minor axis
  private le = 0 // linear eccentricity (center to focus)
  private oe = 0 // orbital eccentricity

  constructor(private readonly statusEl: HTMLElement) {
    super(true)
  }

  updateStatus() {
    this.statusEl.innerHTML = tabularize([
      ['semi-major axis     ', this.a.toFixed(2), colors.semiMajor],
      ['semi-minor axis     ', this.b.toFixed(2), colors.semiMinor],
      ['linear eccentricity ', this.le.toFixed(2), colors.linearEccentricity],
      ['orbital eccentricity', this.oe.toFixed(2), colors.orbitalEccentricity],
    ])
  }

  render({ ctx, width, height }: CanvasInfo) {
    this.b = Math.min((width * 0.8) / 3, height / 2 - 100)
    this.a = this.b * 1.5
    this.le = leFromAB(this.a, this.b)
    this.oe = oe(this.a, this.b)

    ellipse(ctx, { x: 0, y: 0, rx: this.a, ry: this.b })
    stroke(ctx, colors.ink)

    // axes
    line(ctx, { x1: -this.a, y1: 0, x2: this.a, y2: 0, width: 3 })
    line(ctx, { x1: 0, y1: this.b, x2: 0, y2: this.b, width: 3 })

    // semi-axes
    line(ctx, { x1: -this.a, y1: 0, x2: 0, y2: 0, color: colors.semiMajor, width: 3 })
    line(ctx, { x1: -this.le, y1: 0, x2: 0, y2: -this.b, color: colors.semiMajor, width: 1 })
    line(ctx, { x1: 0, y1: -this.b, x2: 0, y2: 0, color: colors.semiMinor, width: 3 })

    // linear eccentricity
    line(ctx, { x1: this.le, y1: 0, x2: 0, y2: 0, color: colors.linearEccentricity, width: 3 })

    // foci
    circle(ctx, { x: -this.le, y: 0, r: 5 })
    fill(ctx, colors.ink)
    circle(ctx, { x: this.le, y: 0, r: 5 })
    fill(ctx, colors.ink)

    this.updateStatus()
  }
}

export default EllipseScene
