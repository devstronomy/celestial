import { useEffect, useRef, useState } from 'react'

import { startSimulation } from '../main'
import { Celestial, SceneType } from '../types'

const CelestialCanvas = () => {
  console.log('%cMK: CelestialCanvas()', 'font-weight: bold')
  const [celestial, setCelestial] = useState<Celestial | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const loading = celestial == null

  useEffect(() => {
    console.log('MK: starting simulation')
    if (canvasRef.current != null) {
      const simulation = startSimulation(canvasRef.current)
      setCelestial(simulation)
    }
  }, [canvasRef])

  const setScene = (scene: SceneType) => {
    celestial?.setSceneType(scene)
  }

  return (
    <>
      {loading && <div id="loading-indicator">Loading...</div>}
      <div id="textContainer">
        {loading && (
          <div id="header" className="box">
            Loading...
          </div>
        )}

        <form className="ib box">
          <input
            type="radio"
            id="ellipse"
            name="scene-type"
            value="ellipse"
            onClick={() => setScene(SceneType.Ellipse)}
          />
          <label htmlFor="ellipse">Ellipse</label>
          <br />

          <input
            id="orbits-types"
            type="radio"
            name="scene-type"
            value="orbits-types"
            defaultChecked
            onClick={() => setScene(SceneType.OrbitTypes)}
          />
          <label htmlFor="orbits-types">Orbits Types</label>
          <br />

          <input
            id="mean-orbits"
            type="radio"
            name="scene-type"
            value="mean-orbits"
            onClick={() => setScene(SceneType.CircularOrbits)}
          />
          <label htmlFor="mean-orbits">Circular Orbits</label>
        </form>
        <div id="statusContainer" className="ib boxPlain">
          <span id="status"></span>
        </div>
      </div>

      <canvas id="canvas" ref={canvasRef}></canvas>
    </>
  )
}

export default CelestialCanvas
