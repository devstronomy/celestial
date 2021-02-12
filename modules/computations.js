/*
 * Notes:
 *  a - aphelion
 *  e - eccentricity
 *  ta - true anomaly
 */

function computeTrueAnomaly(ta, e) {
  return ta + 2 * e * Math.sin(ta);
}

// Semi-latus rectum.
const slr = (a, e) => a * (1 - e ** 2);

function computeTrueDistance(a, ta, e) {
  return slr(a, e) / (1 + e * Math.cos(ta));
}

export { computeTrueAnomaly, computeTrueDistance };
