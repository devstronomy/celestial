import Planet from './planet'
import { Color, PlanetData } from './types'
import { checkDefined } from './preconditions'
import planetsData from '../data/planets.json'
import { km6ToAu } from './computations'

const color: (r: number, g: number, b: number) => Color = (r, g, b) => ({
  r: String(r),
  g: String(g),
  b: String(b),
})

const planetColors: Record<string, Color> = {
  Mercury: color(224, 194, 150),
  Venus: color(145, 77, 19),
  Earth: color(171, 227, 254),
  Mars: color(97, 51, 35),
  Jupiter: color(180, 180, 180),
  Saturn: color(180, 180, 180),
  Uranus: color(180, 180, 180),
  Neptune: color(180, 180, 180),
  Pluto: color(180, 180, 180),
}

const newPlanetByName = (name: string) =>
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

const planets: readonly Planet[] = planetsData
  .filter((p) => p.name !== 'Pluto')
  .map((p) => newPlanet(p))

const plutoData = checkDefined(
  planetsData.find((p) => p.name === 'Pluto'),
  'Pluto not found'
)

const pluto: Planet = newPlanet(plutoData)

export { planets, pluto, newPlanetByName }
