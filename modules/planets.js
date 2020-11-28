import Planet from "./planet.js";

// inner planets
const mercury = new Planet(0.39, 2439.7, 87.97, 224, 194, 150);
const venus = new Planet(0.723, 6051.8, 224.7, 145, 77, 19);
const earth = new Planet(1, 6378.1, 365.26, 171, 227, 254);
const mars = new Planet(1.524, 3396.2, 687, 97, 51, 35);

// outer giant planets
// TODO: hide outer planets until having a meaningful way to display them. E.g., zooming.
// const jupiter = new Planet(5.203, 71492, 4331, 180, 180, 180);
// const saturn = new Planet(9.539, 60268, 10747, 180, 180, 180);
// const uranus = new Planet(19.18, 25559, 30589, 180, 180, 180);
// const neptune = new Planet(30.06, 24764, 59800, 180, 180, 180);

function getPlanets() {
  return [mercury, venus, earth, mars]; // , jupiter, saturn, uranus, neptune];
}

export {
  mercury,
  venus,
  earth,
  mars,
  // TODO: the same above 👆
  // jupiter,
  // saturn,
  // uranus,
  // neptune,
  getPlanets,
};
