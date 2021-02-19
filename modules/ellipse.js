import { fill, stroke } from "./canvas.js";
import { br, span } from "./dom.js";
import { circle, dashedLine, ellipse, line } from "./drawing.js";

const colors = {
  ink: "#bbbbbb",
  semiMajor: "#ff531e",
  semiMinor: "#0f93d4",
  linearEccentricity: "#1db11d",
};

class Ellipse {
  constructor(statusEl) {
    this.statusEl = statusEl;
    this.a = undefined; // semi-major axis
    this.b = undefined; // semi-minor axis
    this.le = undefined; // linear eccentricity (center to focus)
  }

  updateStatus() {
    this.statusEl.innerHTML =
      span(`semi-major axis: ${this.a}`, colors.semiMajor) +
      br() +
      span(`semi-minor axis: ${this.b}`, colors.semiMinor) +
      br() +
      span(`linear eccentricity: ${this.le}`, colors.linearEccentricity);
  }

  render({ ctx, width, height }) {
    this.b = Math.round(Math.min((width * 0.8) / 3, height / 2 - 100));
    this.a = Math.round(this.b * 1.5);
    this.le = Math.round(Math.sqrt(this.a ** 2 - this.b ** 2));

    ellipse(ctx, 0, 0, this.a, this.b);
    stroke(ctx, colors.ink);

    // axes
    dashedLine(ctx, -this.a, 0, this.a, 0);
    dashedLine(ctx, 0, -this.b, 0, this.b);

    // semi-axes
    line(ctx, -this.a, 0, 0, 0, colors.semiMajor);
    line(ctx, -this.le, 0, 0, -this.b, colors.semiMajor, 1);
    line(ctx, 0, -this.b, 0, 0, colors.semiMinor);

    // linear eccentricity
    line(ctx, this.le, 0, 0, 0, colors.linearEccentricity);

    // foci
    circle(ctx, -this.le, 0, 5);
    circle(ctx, this.le, 0, 5);
    fill(ctx, colors.ink);

    this.updateStatus();
  }
}

export default Ellipse;
