import { getHeaderElement, getStatusElement, resetStatusElement } from './dom'
import { CanvasInfo } from './types'
import { checkDefined } from './preconditions'
import { EllipseScene, OrbitsTypesScene, Scene, SolarSystemScene } from './scenes'

function removeLoadingIndicator() {
  ;(document.getElementById('loading-indicator') as HTMLElement).style.display = 'none'
}

function getSelectedSceneType(): string {
  const element = document.querySelector('input[name="scene-type"]:checked') as HTMLInputElement
  return element.value
}

let currentSceneType: string
let currentScene: Scene

function getScene() {
  const selectedSceneType = getSelectedSceneType()
  if (selectedSceneType !== currentSceneType) {
    resetStatusElement()
    currentSceneType = selectedSceneType
    if (selectedSceneType === 'mean-orbits') {
      getHeaderElement().innerHTML = 'Simulation of the Solar System with <b>mean orbits</b>'
      currentScene = new SolarSystemScene()
    } else if (selectedSceneType === 'orbits-types') {
      getHeaderElement().innerHTML = 'Shows different type of planetary orbits'
      currentScene = new OrbitsTypesScene()
    } else if (selectedSceneType === 'ellipse') {
      getHeaderElement().innerHTML = 'Basic <b>Ellipse</b> Terminology'
      currentScene = new EllipseScene(getStatusElement())
    } else {
      throw new Error(`Unknown scene type: ${selectedSceneType}`)
    }
  }
  return currentScene
}

function startSimulation() {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement
  const ctx = checkDefined(canvas.getContext('2d'), 'canvas context')

  const adjustCanvas = (canvasInfo: CanvasInfo) => {
    // Lookup the size the browser is displaying the canvas.
    const displayWidth = canvas.clientWidth
    const displayHeight = canvas.clientHeight

    // Check if the canvas is not the same size and possibly adjust.
    if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
      canvas.width = displayWidth
      canvas.height = displayHeight
      return {
        ...canvasInfo,
        width: displayWidth,
        height: displayHeight,
      }
    }
    return canvasInfo
  }

  let canvasInfo: CanvasInfo = {
    canvas,
    ctx,
    width: 0,
    height: 0,
  }

  function mainLoop() {
    // prepare canvas
    canvasInfo = adjustCanvas(canvasInfo)
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // draw the scene
    ctx.save()
    ctx.translate(canvas.width / 2, canvas.height / 2)
    getScene().render(canvasInfo)
    ctx.restore()
    requestAnimationFrame(mainLoop)
  }

  removeLoadingIndicator()
  mainLoop()
}

window.onload = startSimulation
