import { useEffect, useRef, useState } from 'react'

import { startSimulation } from '../main'
import { Celestial, SceneType } from '../types'

const defaultSceneType = SceneType.OrbitTypes

const CelestialCanvas = () => {
  console.log('%cMK: CelestialCanvas()', 'font-weight: bold')
  const [celestial, setCelestial] = useState<Celestial | null>(null)
  const [scene, setScene] = useState<SceneType>(defaultSceneType)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const loading = celestial == null

  useEffect(() => {
    console.log('MK: starting simulation')
    if (canvasRef.current != null) {
      const simulation = startSimulation(canvasRef.current, defaultSceneType)
      setCelestial(simulation)
    }
  }, [canvasRef])

  useEffect(() => {
    celestial?.changeSceneType(scene)
  }, [scene, celestial])

  return (
    <>
      {loading && <div id="loading-indicator">Loading...</div>}
      <div id="textContainer">
        {loading && (
          <div id="header" className="box">
            Loading...
          </div>
        )}

        {scene === SceneType.CircularOrbits ? (
          <div id="header" className="box">
            Simulation of the Solar System with <b>mean orbits</b>{' '}
          </div>
        ) : scene === SceneType.Ellipse ? (
          <div id="header" className="box">
            Basic <b>Ellipse</b> Terminology{' '}
          </div>
        ) : (
          <div id="header" className="box">
            Shows different type of planetary orbits
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
