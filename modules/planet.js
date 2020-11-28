import { TAU, randomFloat } from "./math.js";
import { stroke, fillRGB } from "./canvas.js";
import { circle } from "./shapes.js";
import C from "./config.js";

class Planet {
  /**
   * Creates an instance of a planet.
   *
   * @param distanceAU average distance from the Sun in astronomical units.
   * @param radiusKm radius of the body in km.
   * @param orbitalPeriodDE orbital period in Earth days
   * @param r red part
   * @param g green part
   * @param b blue part
   */
  constructor(distanceAU, radiusKm, orbitalPeriodDE, r, g, b) {
    this.distanceAU = distanceAU;
    this.radiusKm = radiusKm;
    this.orbitalPeriodDE = orbitalPeriodDE;
    this.color = { r, g, b }; // planet color

    // Angular position. Set random initial angular position for a planet in radians.
    this.startTheta = randomFloat(TAU);
    // current theta in radians
    this.thetaRad = 0;
  }

  update(day) {
    const rawTheta = -(TAU / this.orbitalPeriodDE) * day;
    this.thetaRad = (this.startTheta + rawTheta * C.planets.speedFactor) % TAU;
  }

  draw(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.rotate(this.thetaRad);
    ctx.translate(this.distanceAU * C.planets.distanceFactor, 0);
    const r = this.radiusKm * C.planets.radiusScalingFactor;
    circle(ctx, 0, 0, r);
    fillRGB(ctx, this.color.r, this.color.g, this.color.b);
    stroke(ctx, "black");
    ctx.restore();
  }
}

export default Planet;
