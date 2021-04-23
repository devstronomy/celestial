import { fill, stroke } from '../canvas'
import { circle, dashedLine, ellipse, line } from '../drawing'
import { CanvasInfo } from '../types'
import Scene from './scene'
import { leFromAB, oe } from '../computations'
import { colors, tabularize } from './scenes'

class EllipseScene extends Scene {
  statusEl: HTMLElement
  a: number // semi-major axis
  b: number // semi-minor axis
  le: number // linear eccentricity (center to focus)
  oe: number // orbital eccentricity

  constructor(statusEl: HTMLElement) {
    super()
    this.statusEl = statusEl
    this.a = 0
    this.b = 0
    this.le = 0
    this.oe = 0
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

    ellipse(ctx, 0, 0, this.a, this.b)
    stroke(ctx, colors.ink)

    // axes
    dashedLine(ctx, -this.a, 0, this.a, 0)
    dashedLine(ctx, 0, -this.b, 0, this.b)

    // semi-axes
    line(ctx, -this.a, 0, 0, 0, colors.semiMajor)
    line(ctx, -this.le, 0, 0, -this.b, colors.semiMajor, 1)
    line(ctx, 0, -this.b, 0, 0, colors.semiMinor)

    // linear eccentricity
    line(ctx, this.le, 0, 0, 0, colors.linearEccentricity)

    // foci
    circle(ctx, -this.le, 0, 5)
    fill(ctx, colors.ink)
    circle(ctx, this.le, 0, 5)
    fill(ctx, colors.ink)

    this.updateStatus()
  }
}

export default EllipseScene
