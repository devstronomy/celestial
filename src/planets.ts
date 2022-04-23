import type { Color } from '@devstronomy/canvas'

import { km6ToAu } from './computations'
import planetsData from './data/planets.json'
import Planet from './planet'
import { checkDefined } from './preconditions'
import { PlanetData } from './types'

const color: (r: number, g: number, b: number) => Color = (r, g, b) => ({
  r: String(r),
  g: String(g),
  b: String(b),
})

const planetColors: Record<string, Color> = {
  Mercury: color(172, 175, 175),
  Venus: color(252, 131, 10),
  Earth: color(15, 120, 243),
  Mars: color(238, 0, 10),
  Jupiter: color(187, 98, 6),
  Saturn: color(255, 207, 162),
  Uranus: color(37, 255, 252),
  Neptune: color(8, 67, 241),
  Pluto: color(180, 180, 180),
}

const newPlanetByName = (name: string): Readonly<Planet> =>
  newPlanet(
    checkDefined(
      planetsData.find((p) => p.name === name),
      `Planet with ${name} not found`
    )
  )

const newPlanet = (p: PlanetData): Readonly<Planet> =>
  new Planet(
    p.name,
    km6ToAu(p.distanceFromSun),
    km6ToAu(p.perihelion),
    km6ToAu(p.aphelion),
    p.diameter / 2,
    p.orbitalPeriod,
    p.orbitalEccentricity,
    planetColors[p.name]
  )

const planets: Readonly<Planet>[] = planetsData
  .filter((p) => p.name !== 'Pluto')
  .map((p) => newPlanet(p))

const plutoData = checkDefined(
  planetsData.find((p) => p.name === 'Pluto'),
  'Pluto not found'
)

const pluto: Readonly<Planet> = newPlanet(plutoData)

export { planets, pluto, newPlanetByName }
