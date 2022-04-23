import './style.css'

import { CanvasInfo, initializeCanvas } from '@devstronomy/canvas'

import { getStatusElement, resetStatusElement } from './dom'
import { check } from './preconditions'
import { EllipseScene, OrbitsTypesScene, Scene, SolarSystemScene } from './scenes'
import type { Celestial } from './types'
import { SceneType } from './types'

type CelestialState = {
  sceneType: SceneType
  scene: Scene
}

let state: CelestialState = {
  sceneType: SceneType.OrbitTypes,
  scene: createScene(SceneType.OrbitTypes),
}

function changeSceneType(newType: SceneType, canvasInfo: CanvasInfo): void {
  // stop current scene
  if (!state.scene.isStatic) {
    canvasInfo.stopLoop()
  }

  state = {
    sceneType: newType,
    scene: createScene(newType),
  }

  state.scene.initialize(canvasInfo)
}

function createScene(selectedSceneType: SceneType) {
  resetStatusElement()
  switch (selectedSceneType) {
    case SceneType.Ellipse:
      return new EllipseScene(getStatusElement())
      break
    case SceneType.OrbitTypes:
      return new OrbitsTypesScene(getStatusElement())
      break
    case SceneType.CircularOrbits:
      return new SolarSystemScene()
      break
    default:
      throw new Error(`Unknown scene type: ${selectedSceneType}`)
  }
}

function drawScene(ci: CanvasInfo): void {
  ci.ctx.save()
  ci.ctx.translate(ci.canvas.width / 2, ci.canvas.height / 2)
  state.scene.render(ci)
  ci.ctx.restore()
}

function startSimulation(canvasElement: HTMLCanvasElement, sceneType: SceneType): Celestial {
  state = {
    sceneType,
    scene: createScene(sceneType),
  }
  const canvasInfo = initializeCanvas(canvasElement, drawScene)

  // Uncomment to show debugbox. Use switcher when implemented.
  canvasInfo.showDebugBox()

  check(canvasInfo.width > 0, `canvasInfo.width = ${canvasInfo.width}`)
  check(canvasInfo.height > 0, `canvasInfo.height = ${canvasInfo.height}`)
  state.scene.initialize(canvasInfo)

  return {
    changeSceneType: (newType: SceneType) => changeSceneType(newType, canvasInfo),
    endSimulation: () => {
      canvasInfo.stopLoop()
      canvasInfo.destroy()
    },
  }
}

export { startSimulation }
