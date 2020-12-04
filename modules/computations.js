function computeTrueAnomaly(ma, eccentricity) {
  const ec = 2 * eccentricity * Math.sin(ma);
  return ma + ec;
}

export { computeTrueAnomaly };
