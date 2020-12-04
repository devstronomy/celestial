function ellipse(ctx, x, y, radiusX, radiusY) {
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(x, y, radiusX, radiusY, 0, 0, Math.PI * 2);
  ctx.restore();
}

function circle(ctx, x, y, radius) {
  ellipse(ctx, x, y, radius, radius);
}

// https://stackoverflow.com/a/26080467/526228
function arrow(ctx, fromX, fromY, toX, toY, width, color) {
  ctx.strokeStyle = color;
  ctx.fillStyle = color;

  // variables to be used when creating the arrow
  const headLen = 10;

  // This makes it so the end of the arrow head is located at toX, toY, don't ask where 1.15 comes from
  const angle = Math.atan2(toY - fromY, toX - fromX);

  toX -= Math.cos(angle) * (width * 1.15);
  toY -= Math.sin(angle) * (width * 1.15);

  // starting path of the arrow from the start square to the end square and drawing the stroke
  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.lineWidth = width;
  ctx.stroke();

  // starting a new path from the head of the arrow to one of the sides of the point
  ctx.beginPath();
  ctx.moveTo(toX, toY);
  ctx.lineTo(
    toX - headLen * Math.cos(angle - Math.PI / 7),
    toY - headLen * Math.sin(angle - Math.PI / 7)
  );

  // path from the side point of the arrow, to the other side point
  ctx.lineTo(
    toX - headLen * Math.cos(angle + Math.PI / 7),
    toY - headLen * Math.sin(angle + Math.PI / 7)
  );

  // path from the side point back to the tip of the arrow, and then again to the opposite side point
  ctx.lineTo(toX, toY);
  ctx.lineTo(
    toX - headLen * Math.cos(angle - Math.PI / 7),
    toY - headLen * Math.sin(angle - Math.PI / 7)
  );
  ctx.fill();
}

export { ellipse, circle, arrow };
