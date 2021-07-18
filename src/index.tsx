import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Canvas } from "@react-three/fiber";
import { Loader, Stats, OrbitControls } from "@react-three/drei";
import { Leva } from "leva";
import * as THREE from "three";

import App from "./App";
import Lights from "./Lights";

import "./assets/styles/App.scss";

ReactDOM.render(
  <React.StrictMode>
    <Canvas
      onCreated={({ gl }: any) => {
        // gl.physicallyCorrectLights = true;
        gl.outputEncoding = THREE.sRGBEncoding;
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.gammaFactor = 2.2;
        gl.antialias = true;
        gl.setClearColor(0x111111);
      }}
      camera={{ position: [0, 0, 3], fov: 75 }}
      dpr={Math.min(window.devicePixelRatio, 2)}
    >
      <Suspense fallback={null}>
        <App />
      </Suspense>
      <Lights />
      <OrbitControls />
    </Canvas>
    <Stats />
    <Leva />
    <Loader dataInterpolation={(p) => `Loading ${p.toFixed(0)}%`} />
  </React.StrictMode>,
  document.getElementById("root")
);
