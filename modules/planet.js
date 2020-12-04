import { fillRGB, stroke } from "./canvas.js";
import { computeTrueAnomaly } from "./computations.js";
import C from "./config.js";
import { radToDeg } from "./math.js";
import { randomFloat, TAU } from "./math.js";
import { circle } from "./shapes.js";

class Planet {
  /**
   * Creates an instance of a planet.
   *
   * @param name name of the planet
   * @param distanceAU average distance from the Sun in astronomical units.
   * @param radiusKm radius of the body in km.
   * @param orbitalPeriodDE orbital period in Earth days
   * @param orbitalEccentricity orbital eccentricity
   * @param color the color in { r, g, b } shape.
   * @param statusEl used for displaying the planet information; can be undefined.
   */
  constructor(name, distanceAU, radiusKm, orbitalPeriodDE, orbitalEccentricity, color, statusEl) {
    this.name = name;
    this.distanceAU = distanceAU;
    this.radiusKm = radiusKm;
    this.orbitalPeriodDE = orbitalPeriodDE;
    this.orbitalEccentricity = orbitalEccentricity;
    this.color = color;
    this.statusEl = statusEl;

    // Angular position. Set random initial angular position for a planet in radians.
    if (statusEl) {
      this.initialMA = 0;
    } else {
      this.initialMA = randomFloat(TAU);
    }
    // current mean anomaly in radians
    this.totalMa = this.initialMA;
  }

  scaledDistance() {
    return this.distanceAU * C.planets.distanceFactor;
  }

  computeRadius() {
    return this.radiusKm * C.planets.radiusScalingFactor;
  }

  update(day) {
    const ma = (TAU / this.orbitalPeriodDE) * day;
    this.totalMa = (this.initialMA + ma * C.planets.speedFactor) % TAU;
  }

  drawBody(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.rotate(-this.totalMa);
    ctx.translate(this.scaledDistance(), 0);
    circle(ctx, 0, 0, this.computeRadius());
    fillRGB(ctx, this.color.r, this.color.g, this.color.b);
    stroke(ctx, "black");
    ctx.restore();
  }

  drawOrbit(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.setLineDash([5, 5]);
    circle(ctx, 0, 0, this.scaledDistance());
    stroke(ctx, "#444444");
    ctx.restore();
  }

  updateStatus() {
    if (this.statusEl) {
      const maDeg = radToDeg(this.totalMa).toFixed(0);
      const ta = radToDeg(computeTrueAnomaly(this.totalMa, this.orbitalEccentricity)).toFixed(0);
      this.statusEl.innerHTML =
        `${this.name} anomalies: mean = ${maDeg}&deg;` + `, true = ${ta}&deg;`;
    }
  }

  draw(ctx) {
    this.drawOrbit(ctx);
    this.drawBody(ctx);
    this.updateStatus();
  }
}

export default Planet;
