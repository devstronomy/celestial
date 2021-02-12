import { fill, stroke } from "./canvas.js";
import { getPlanets } from "./planets.js";
import { circle } from "./shapes.js";
import C from "./config.js";

const SUN_RADIUS_KM = 695700;

function drawSun(ctx) {
  circle(ctx, 0, 0, SUN_RADIUS_KM * C.sun.radiusScalingFactor);
  fill(ctx, "yellow");
  stroke(ctx, "orange");
}

class SolarSystem {
  constructor() {
    // TODO: hide outer planets until having a meaningful way to display them. E.g., zooming.
    this.planets = getPlanets().slice(0, 4);
    this.startMs = Date.now();
  }

  render({ ctx }) {
    this.planets.forEach((p) => {
      p.update((Date.now() - this.startMs) / 1000);
      p.draw(ctx);
    });
    drawSun(ctx);
  }
}

export default SolarSystem;

export { drawSun };
