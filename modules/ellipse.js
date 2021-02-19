import { stroke } from "./canvas.js";
import { br, span } from "./dom.js";
import { dashedLine, ellipse, line } from "./drawing.js";

const colors = {
  semiMajor: "#ff531e",
  semiMinor: "#0f93d4",
};

class Ellipse {
  constructor(statusEl) {
    this.statusEl = statusEl;
    this.semiMinorAxis = undefined;
    this.semiMajorAxis = undefined;
  }

  updateStatus() {
    this.statusEl.innerHTML =
      span(`semi-major axis: ${this.semiMajorAxis}`, colors.semiMajor) +
      br() +
      span(`semi-minor axis: ${this.semiMinorAxis}`, colors.semiMinor);
  }

  render({ ctx, width, height }) {
    this.semiMinorAxis = Math.round(Math.min((width * 0.8) / 3, height / 2 - 100));
    this.semiMajorAxis = Math.round(this.semiMinorAxis * 1.5);

    ellipse(ctx, 0, 0, this.semiMajorAxis, this.semiMinorAxis);
    stroke(ctx, "#9ecaed");

    dashedLine(ctx, -this.semiMajorAxis, 0, this.semiMajorAxis, 0);
    dashedLine(ctx, 0, -this.semiMinorAxis, 0, this.semiMinorAxis);
    line(ctx, -this.semiMajorAxis, 0, 0, 0, colors.semiMajor);
    line(ctx, 0, -this.semiMinorAxis, 0, 0, colors.semiMinor);

    this.updateStatus();
  }
}

export default Ellipse;
