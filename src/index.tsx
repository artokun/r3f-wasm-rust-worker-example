import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Canvas } from "@react-three/fiber";
import { Loader, Stats, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

import App from "./App";
import Lights from "./Lights";

import "./assets/styles/App.scss";

ReactDOM.render(
  <React.StrictMode>
    <Canvas
      onCreated={({ gl }: any) => {
        gl.physicallyCorrectLights = true;
        gl.outputEncoding = THREE.sRGBEncoding;
      }}
      camera={{ position: [3, 3, 3], fov: 75 }}
      dpr={Math.min(window.devicePixelRatio, 2)}
    >
      <Lights />
      <Suspense fallback={null}>
        <App />
      </Suspense>
      <Stats />
      <OrbitControls />
    </Canvas>
    <Loader dataInterpolation={(p) => `Loading ${p.toFixed(0)}%`} />
  </React.StrictMode>,
  document.getElementById("root")
);
