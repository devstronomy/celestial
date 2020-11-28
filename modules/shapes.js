function ellipse(ctx, x, y, radiusX, radiusY) {
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(x, y, radiusX, radiusY, 0, 0, Math.PI * 2);
  ctx.restore();
}

function circle(ctx, x, y, radius) {
  ellipse(ctx, x, y, radius, radius);
}

export { ellipse, circle };
