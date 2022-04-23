import { useEffect, useRef, useState } from 'react'

import { startSimulation } from '../main'
import { Celestial, SceneType } from '../types'

const defaultSceneType = SceneType.SolarSystem

const CelestialCanvas = () => {
  const [celestial, setCelestial] = useState<Celestial | null>(null)
  const [scene, setScene] = useState<SceneType>(defaultSceneType)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const loading = celestial == null

  useEffect(() => {
    if (canvasRef.current != null) {
      const simulation = startSimulation(canvasRef.current, defaultSceneType)
      setCelestial(simulation)
      return () => simulation.endSimulation()
    }
    return () => ({})
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

        {scene === SceneType.SolarSystem ? (
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
            onClick={() => setScene(SceneType.OrbitTypes)}
          />
          <label htmlFor="orbits-types">Orbits Types</label>
          <br />

          <input
            id="solar-system"
            type="radio"
            name="scene-type"
            value="solar-system"
            defaultChecked
            onClick={() => setScene(SceneType.SolarSystem)}
          />
          <label htmlFor="solar-system">Solar System</label>
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
