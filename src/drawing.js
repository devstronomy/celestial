import { stroke } from "./canvas.js";

const colors = {
  dashedLine: "#444444",
};

function line(ctx, x1, y1, x2, y2, color, width = 3) {
  ctx.save();
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  stroke(ctx, color);
  ctx.restore();
}

function dashedLine(ctx, x1, y1, x2, y2) {
  ctx.save();
  ctx.beginPath();
  ctx.setLineDash([5, 5]);
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  stroke(ctx, colors.dashedLine);
  ctx.restore();
}

function ellipse(ctx, x, y, radiusX, radiusY) {
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(x, y, radiusX, radiusY, 0, 0, Math.PI * 2);
  ctx.restore();
}

function circle(ctx, x, y, radius) {
  ellipse(ctx, x, y, radius, radius);
}

export { colors, line, dashedLine, ellipse, circle };
