import { getPlanets } from "./planets.js";
import { drawSun } from "./solarSytem.js";

class OrbitalElements {
  constructor() {
    this.planet = getPlanets().find((m) => m.name === "Mercury");
    this.startMs = Date.now();
  }

  render({ ctx }) {
    this.planet.update((Date.now() - this.startMs) / 1000);
    this.planet.draw(ctx);
    drawSun(ctx);
  }
}

export default OrbitalElements;
