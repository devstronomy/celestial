import { CanvasInfo } from '../types'
import { newPlanetByName } from '../planets'
import Planet from '../planet'
import { drawSun } from '../sun'
import { drawMeanOrbit, drawMeanPositionedBody, drawOrbit } from '../orbits'
import Scene from './scene'
import { br, span } from '../dom'
import { colors } from './scenes'

class OrbitsTypesScene extends Scene {
  private readonly planet: Planet = newPlanetByName('Earth')
  private delta: number = 0.01
  private a: number = 0 // semi-major axis
  private b: number = 0 // semi-minor axis
  private le: number = 0 // linear eccentricity (center to focus)
  private oe: number = 0 // orbital eccentricity

  constructor(private readonly statusEl: HTMLElement) {
    super()
  }

  updateStatus() {
    this.statusEl.innerHTML =
      span('TODO: UPDATE TEXTs BELOW', 'red') +
      br() +
      span(`semi-major axis: ${this.a.toFixed(2)}`, colors.semiMajor) +
      br() +
      span(`semi-minor axis: ${this.b.toFixed(2)}`, colors.semiMinor) +
      br() +
      span(`linear eccentricity: ${this.le.toFixed(2)}`, colors.linearEccentricity) +
      br() +
      span(`orbital eccentricity: ${this.oe.toFixed(2)}`, colors.orbitalEccentricity)
  }

  render({ ctx }: CanvasInfo) {
    if (this.planet.aphelionAU > 1.85) {
      this.delta = -0.005
    }
    if (this.planet.aphelionAU < 1) {
      this.delta = 0.005
    }
    this.planet.aphelionAU = this.planet.aphelionAU + this.delta
    this.planet.perihelionAU = this.planet.perihelionAU - this.delta
    drawSun(ctx)
    drawMeanOrbit(ctx, this.planet)
    drawMeanPositionedBody(ctx, this.planet)

    drawOrbit(ctx, this.planet)
    this.updateStatus()
  }
}

export default OrbitsTypesScene
