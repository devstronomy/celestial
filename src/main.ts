import './style.css'

import { CanvasInfo } from '@devstronomy/canvas'

import { getStatusElement, resetStatusElement } from './dom'
import { checkDefined } from './preconditions'
import { EllipseScene, OrbitsTypesScene, Scene, SolarSystemScene } from './scenes'
import { SceneType } from './types'
import type { Celestial } from './types'

type CelestialState = {
  sceneType: SceneType
}

let currentSceneType: SceneType
let currentScene: Scene

function getScene(selectedSceneType: SceneType) {
  if (selectedSceneType !== currentSceneType) {
    resetStatusElement()
    currentSceneType = selectedSceneType
    switch (selectedSceneType) {
      case SceneType.Ellipse:
        // TODO: MK: fix me and the same comment below
        // getHeaderElement().innerHTML = 'Basic <b>Ellipse</b> Terminology'
        currentScene = new EllipseScene(getStatusElement())
        break
      case SceneType.OrbitTypes:
        // getHeaderElement().innerHTML = 'Shows different type of planetary orbits'
        currentScene = new OrbitsTypesScene(getStatusElement())
        break
      case SceneType.CircularOrbits:
        // getHeaderElement().innerHTML = 'Simulation of the Solar System with <b>mean orbits</b>'
        currentScene = new SolarSystemScene()
        break
      default:
        throw new Error(`Unknown scene type: ${selectedSceneType}`)
    }
  }
  return currentScene
}

function startSimulation(canvas: HTMLCanvasElement): Celestial {
  const ctx = checkDefined(canvas.getContext('2d'), 'canvas context')
  const state: CelestialState = {
    sceneType: SceneType.OrbitTypes,
  }

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
    getScene(state.sceneType).render(canvasInfo)
    ctx.restore()
    requestAnimationFrame(mainLoop)
  }

  mainLoop()

  return {
    setSceneType: (type: SceneType) => {
      console.log(`%cMK: setSceneType(${type})`, 'font-weight: bold')
      state.sceneType = type
    },
  }
}

export { startSimulation }
// TODO: MK: remove
// window.onload = startSimulation
