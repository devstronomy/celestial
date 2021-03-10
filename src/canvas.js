function clear({ ctx, width, height }) {
  ctx.save();
  ctx.beginPath();
  ctx.translate(-100, 0);
  ctx.clearRect(0, 0, width, height);
  ctx.restore();
}

function stroke(ctx, color) {
  ctx.strokeStyle = color;
  ctx.stroke();
}

function fill(ctx, color) {
  ctx.fillStyle = color;
  ctx.fill();
}

function fillRGB(ctx, r, g, b) {
  ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
  ctx.fill();
}

export { clear, fill, fillRGB, stroke };
