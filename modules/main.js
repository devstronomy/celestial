import { getHeaderElement, getStatusElement, resetStatusElement } from "./dom.js";
import Ellipse from "./ellipse.js";
import SolarSystem from "./solarSytem.js";

function removeLoadingIndicator() {
  document.getElementById("loading-indicator").style.display = "none";
}

function getSelectedSceneType() {
  return document.querySelector('input[name="scene-type"]:checked').value;
}

let currentSceneType;
let currentScene;

function getScene() {
  const selectedSceneType = getSelectedSceneType();
  if (selectedSceneType !== currentSceneType) {
    resetStatusElement();
    currentSceneType = selectedSceneType;
    if (selectedSceneType === "mean-orbits") {
      getHeaderElement().innerHTML = "Simulation of the Solar System with <b>mean orbits</b>";
      currentScene = new SolarSystem();
    } else if (selectedSceneType === "ellipse") {
      getHeaderElement().innerHTML = "Basic <b>Ellipse</b> Terminology";
      currentScene = new Ellipse(getStatusElement());
    } else {
      throw new Error(`Unknown scene type: ${selectedSceneType}`);
    }
  }
  return currentScene;
}

function startSimulation() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const canvasInfo = {
    canvas,
    ctx,
    width: undefined,
    height: undefined,
  };

  const resizeCanvas = () => {
    // Lookup the size the browser is displaying the canvas.
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    // Check if the canvas is not the same size.
    if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
      // Make the canvas the same size
      canvas.width = displayWidth;
      canvas.height = displayHeight;
      canvasInfo.width = displayWidth;
      canvasInfo.height = displayHeight;
    }
  };

  function mainLoop() {
    // prepare canvas
    resizeCanvas();
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // draw the scene
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    getScene().render(canvasInfo);
    ctx.restore();
    requestAnimationFrame(mainLoop);
  }

  removeLoadingIndicator();
  mainLoop();
}

window.onload = startSimulation;
