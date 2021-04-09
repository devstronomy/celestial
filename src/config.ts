type Configuration = Readonly<{
  planets: Readonly<{
    speedFactor: number
    distanceFactor: number
    radiusScalingFactor: number
  }>
  sun: Readonly<{
    radiusScalingFactor: number
  }>
}>

const configuration: Configuration = {
  planets: {
    speedFactor: 10,
    distanceFactor: 300,
    radiusScalingFactor: 1 / 300,
  },
  sun: {
    radiusScalingFactor: 1 / 20000, // Sun scaling factor to have not the Sun too big until solved more wisely.
  },
}

export default configuration
