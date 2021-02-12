import { fillRGB, stroke } from "./canvas.js";
import { computeTrueAnomaly, computeTrueDistance } from "./computations.js";
import C from "./config.js";
import { radToDeg } from "./math.js";
import { randomFloat, TAU } from "./math.js";
import { arrow, circle, ellipse } from "./shapes.js";

const maColor = "#44aa44";
const taColor = "#556655";

class Planet {
  /**
   * Creates an instance of a planet.
   *
   * @param name name of the planet
   * @param distanceAU average distance from the Sun in astronomical units.
   * @param radiusKm radius of the body in km.
   * @param orbitalPeriodDE orbital period in Earth days
   * @param aphelionAU
   * @param perihelionAU
   * @param orbitalEccentricity orbital eccentricity
   * @param color the color in { r, g, b } shape.
   * @param statusEl used for displaying the planet information; can be undefined.
   */
  constructor(
    name,
    distanceAU,
    radiusKm,
    orbitalPeriodDE,
    aphelionAU,
    perihelionAU,
    orbitalEccentricity,
    color,
    statusEl
  ) {
    this.name = name;
    this.radiusKm = radiusKm;
    this.orbitalPeriodDE = orbitalPeriodDE;
    this.orbitalEccentricity = orbitalEccentricity;

    this.distanceAU = distanceAU;
    this.aphelionAU = aphelionAU;
    this.perihelionAU = perihelionAU;

    this.color = color;
    this.statusEl = statusEl;

    // Angular position. Set random initial angular position for a planet in radians.
    if (statusEl) {
      this.initialMA = 0;
    } else {
      this.initialMA = randomFloat(TAU);
    }
    // current mean anomaly in radians
    this.ma = this.initialMA;
    this.ta = computeTrueAnomaly(this.ma, this.orbitalEccentricity);
    this.ta = computeTrueDistance(this.aphelionAU, this.ta, this.orbitalEccentricity);
  }

  scaledDistance(d) {
    return d * C.planets.distanceFactor;
  }

  computeBodyRadius() {
    return this.radiusKm * C.planets.radiusScalingFactor;
  }

  update(day) {
    const fullMa = (TAU / this.orbitalPeriodDE) * day;
    this.ma = (this.initialMA + fullMa * C.planets.speedFactor) % TAU;
    this.ta = computeTrueAnomaly(this.ma, this.orbitalEccentricity);
    this.td = computeTrueDistance(this.aphelionAU, this.ta, this.orbitalEccentricity);
  }

  drawBodyAt(ctx, theta, distance) {
    ctx.save();
    ctx.beginPath();
    ctx.rotate(-theta);
    ctx.translate(distance, 0);
    circle(ctx, 0, 0, this.computeBodyRadius());
    fillRGB(ctx, this.color.r, this.color.g, this.color.b);
    stroke(ctx, "black");
    ctx.restore();
  }

  drawMeanOrbit(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.setLineDash([5, 5]);
    circle(ctx, 0, 0, this.scaledDistance(this.distanceAU));
    stroke(ctx, "#444444");
    ctx.restore();
  }

  drawTrueOrbit(ctx) {
    const a = this.scaledDistance(
      computeTrueDistance(this.aphelionAU, 0, this.orbitalEccentricity)
    );
    const b = this.scaledDistance(
      computeTrueDistance(this.perihelionAU, 90, this.orbitalEccentricity)
    );
    const le = Math.sqrt(a ** 2 - b ** 2); // linear eccentricity (focal distance)
    ctx.save();
    ctx.beginPath();
    ctx.setLineDash([5, 5]);
    ellipse(ctx, 0 - le, 0, a, b);
    stroke(ctx, "#444444");
    ctx.restore();
  }

  drawRadiusVectors(ctx, anomaly, distance, color, isArrow) {
    if (this.statusEl) {
      ctx.save();
      ctx.beginPath();
      ctx.rotate(-anomaly);
      if (isArrow) {
        arrow(ctx, 0, 0, distance, 0, 1, color);
      } else {
        ctx.lineTo(0, 0);
        ctx.lineTo(distance, 0);
      }
      stroke(ctx, color);
      ctx.restore();
    }
  }

  updateStatus() {
    if (this.statusEl) {
      const maDeg = radToDeg(this.ma).toFixed(0);
      const taDeg = radToDeg(this.ta).toFixed(0);
      const maHtml = `<span style="color: ${maColor}">mean = ${maDeg}&deg;</span>`;
      const taHtml = `<span style="color: ${taColor}">true = ${taDeg}&deg;</span>`;
      const anomaliesHtml = `anomalies: ${maHtml}, ${taHtml}`;

      const mdHtml = `<span style="color: ${maColor}">mean = ${this.distanceAU.toFixed(2)}</span>`;
      const tdHtml = `<span style="color: ${taColor}">true = ${this.td.toFixed(2)}</span>`;
      const distancesHtml = `distances: ${mdHtml}, ${tdHtml}`;

      this.statusEl.innerHTML = `${this.name}:<br> - ${anomaliesHtml}<br/> - ${distancesHtml}`;
    }
  }

  draw(ctx) {
    this.drawMeanOrbit(ctx);
    this.drawTrueOrbit(ctx);

    this.drawRadiusVectors(ctx, this.ma, this.scaledDistance(this.distanceAU), maColor, false);
    this.drawRadiusVectors(ctx, this.ta, this.scaledDistance(this.td), taColor, false);

    this.drawBodyAt(ctx, this.ma, this.scaledDistance(this.distanceAU));
    this.drawBodyAt(ctx, this.ta, this.scaledDistance(this.td));

    this.updateStatus();
  }
}

export default Planet;
