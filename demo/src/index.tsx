import { createRoot } from 'react-dom/client'

import CelestialCanvas from '../../src/components/CelestialCanvas'

const container = document.getElementById('canvas-container')
if (container === null) {
  console.error("Unable to find element with 'canvas-container' id.")
} else {
  createRoot(container).render(<CelestialCanvas />)
}
