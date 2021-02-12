import { AU } from "./constants.js";
import Planet from "./planet.js";

import rawPlanets from "../data/planets.js";

const color = (r, g, b) => ({ r, g, b });

const statusEl = document.getElementById("status");
const statusPlanet = "Mercury";

const colors = {
  Mercury: color(224, 194, 150),
  Venus: color(145, 77, 19),
  Earth: color(171, 227, 254),
  Mars: color(97, 51, 35),
  Jupiter: color(180, 180, 180),
  Saturn: color(180, 180, 180),
  Uranus: color(180, 180, 180),
  Neptune: color(180, 180, 180),
  Pluto: color(180, 180, 180),
};

// convert from 10^6 km to AUs.
const fromMkmToAu = (mKm) => (mKm * 10 ** 9) / AU;

const planets = rawPlanets.map(
  (p) =>
    new Planet(
      p.name,
      fromMkmToAu(p.distanceFromSun),
      p.diameter / 2,
      p.orbitalPeriod,
      fromMkmToAu(p.aphelion),
      fromMkmToAu(p.perihelion),
      p.orbitalEccentricity,
      colors[p.name],
      p.name === statusPlanet ? statusEl : undefined // TODO: Ugly hardcoded. But for now OK.
    )
);

const getPlanets = () => planets;

export { getPlanets };
