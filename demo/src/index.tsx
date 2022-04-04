import { createRoot } from 'react-dom/client'

import Canvas from './Canvas'

const container = document.getElementById('canvas-container')
if (container === null) {
  console.error("Unable to find element with 'canvas-container' id.")
} else {
  createRoot(container).render(<Canvas />)
}
