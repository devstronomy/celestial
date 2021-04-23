import { CanvasInfo } from '../types'
import { newPlanetByName } from '../planets'
import Planet from '../planet'
import { drawSun } from '../sun'
import { drawMeanOrbit, drawMeanPositionedBody, drawOrbit, drawOrbitalElements } from '../drawing'
import Scene from './scene'
import { colors, tabularize } from './scenes'
import * as C from '../computations'

const DELTA = 0.5

const formatKm = (x: number): string => x.toFixed().padStart(3, ' ')
const km6line = (s: string) => `${s} km<sup>6</sup>`

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
    this.statusEl.innerHTML = tabularize([
      ['orbital eccentricity', this.oe.toFixed(2), colors.orbitalEccentricity],
      ['semi-major axis     ', km6line(formatKm(this.a)), colors.semiMajor],
      ['semi-minor axis     ', km6line(formatKm(this.b)), colors.semiMinor],
      ['linear eccentricity ', km6line(formatKm(this.le)), colors.linearEccentricity],
      ['perihelion          ', km6line(formatKm(this.planetInfo.perihelionKm6)), colors.perihelion],
      ['aphelion            ', km6line(formatKm(this.planetInfo.aphelionKm6)), colors.aphelion],
    ])
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

    drawOrbitalElements(ctx, C.km6ToAu(p.perihelionKm6), C.km6ToAu(p.aphelionKm6))

    drawSun(ctx)

    drawMeanOrbit(ctx, this.planet)
    drawMeanPositionedBody(ctx, this.planet)

    drawOrbit(ctx, C.km6ToAu(p.perihelionKm6), C.km6ToAu(p.aphelionKm6))
    this.updateStatus()
  }
}

export default OrbitsTypesScene
