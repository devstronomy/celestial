import { CanvasInfo } from '../types'
import { newPlanetByName } from '../planets'
import Planet from '../planet'
import { drawSun } from '../sun'
import { drawMeanOrbit, drawMeanPositionedBody, drawOrbit } from '../orbits'
import Scene from './scene'
import { br, preInline } from '../dom'
import { colors } from './scenes'
import * as C from '../computations'

const DELTA = 0.5

const formatKm = (x: number): string => x.toFixed().padStart(3, ' ')

class OrbitsTypesScene extends Scene {
  private readonly planet: Planet = newPlanetByName('Earth')
  private delta: number = DELTA
  private a: number = 0 // semi-major axis
  private b: number = 0 // semi-minor axis
  private le: number = 0 // linear eccentricity (center to focus)
  private oe: number = 0 // orbital eccentricity
  private readonly planetInfo: {
    aphelionKm6: number
    perihelionKm6: number
  }

  constructor(private readonly statusEl: HTMLElement) {
    super()
    this.planetInfo = {
      aphelionKm6: C.auToKm6(this.planet.aphelionAU),
      perihelionKm6: C.auToKm6(this.planet.perihelionAU),
    }
  }

  updateStatus() {
    this.statusEl.innerHTML =
      preInline(`orbital eccentricity : ${this.oe.toFixed(2)}`, colors.orbitalEccentricity) +
      br() +
      br() +
      preInline(`semi-major axis      : ${formatKm(this.a)}`, colors.semiMajor) +
      br() +
      preInline(`semi-minor axis      : ${formatKm(this.b)}`, colors.semiMinor) +
      br() +
      preInline(`linear eccentricity  : ${formatKm(this.le)}`, colors.linearEccentricity) +
      br() +
      br() +
      preInline(`perihelion           : ${formatKm(this.planetInfo.perihelionKm6)}`, 'white') +
      br() +
      preInline(`aphelion             : ${formatKm(this.planetInfo.aphelionKm6)}`, 'white')
  }

  render({ ctx }: CanvasInfo) {
    const p = this.planetInfo
    if (p.aphelionKm6 > C.auToKm6(1.85)) {
      this.delta = -DELTA
    }
    if (p.aphelionKm6 < C.auToKm6(1.01)) {
      this.delta = DELTA
    }
    p.perihelionKm6 -= this.delta
    p.aphelionKm6 += this.delta

    this.a = C.semiMajor(p.perihelionKm6, p.aphelionKm6)
    this.le = C.leFromAP(this.a, p.perihelionKm6)
    this.b = C.bFromALe(this.a, this.le)
    this.oe = this.le / this.a
    drawSun(ctx)
    drawMeanOrbit(ctx, this.planet)
    drawMeanPositionedBody(ctx, this.planet)

    drawOrbit(ctx, C.km6ToAu(p.perihelionKm6), C.km6ToAu(p.aphelionKm6))
    this.updateStatus()
  }
}

export default OrbitsTypesScene
