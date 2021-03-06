import React, { useCallback, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Box, Html } from "@react-three/drei";
import { useControls } from "leva";

const rust = import("./wasm/pkg");

const fibonacci = (n: number): number => {
  if (n < 1) {
    return 0;
  }

  return fibonacci(n - 1) + fibonacci(n - 2);
};

const App: React.FC = () => {
  const boxRef1 = useRef<THREE.Mesh>();
  const boxRef2 = useRef<THREE.Mesh>();
  const [jsTime, setJsTime] = useState("Start JS time");
  const [rsTime, setRsTime] = useState("Start RS Wasm time");

  const getJsTime = useCallback(() => {
    const startTime = Date.now();
    fibonacci(42);
    setJsTime((Math.floor(Date.now() - startTime) / 1000).toFixed(2) + "s JS");
  }, []);

  const getJsTimeAsync = useCallback(async () => {
    const startTime = Date.now();
    new Promise((resolve) => {
      fibonacci(42);
      resolve(null);
    }).then(() => {
      setJsTime(
        (Math.floor(Date.now() - startTime) / 1000).toFixed(2) + "s JS"
      );
    });
  }, []);

  const getRsTime = useCallback(async () => {
    const startTime = Date.now();
    const wasm = await rust;
    wasm.fibonacci(42);
    setRsTime((Math.floor(Date.now() - startTime) / 1000).toFixed(2) + "s RS");
  }, []);

  const getRsTimeAsync = useCallback(async () => {
    const startTime = Date.now();
    const wasm = await rust;
    new Promise((resolve) => {
      wasm.fibonacci(42);
      resolve(null);
    }).then(() => {
      setRsTime(
        (Math.floor(Date.now() - startTime) / 1000).toFixed(2) + "s RS"
      );
    });
  }, []);

  const { colorLeft, colorRight, speed } = useControls({
    colorLeft: "#ff0000",
    colorRight: "#00FF00",
    speed: [1, 1],
  });

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();

    boxRef1.current!.rotation.x = a * speed[0];
    boxRef1.current!.rotation.y = a * speed[1];
    boxRef2.current!.rotation.x = a * speed[0];
    boxRef2.current!.rotation.y = a * speed[1];
  });

  return (
    <>
      {/* Red JS Box */}
      <Box
        ref={boxRef1}
        args={[1, 1, 1]}
        position={[-1, 0, 0]}
        onClick={getJsTime}
        // onClick={getJsTimeAsync}
      >
        <meshStandardMaterial color={colorLeft} toneMapped={false} />
        <Html center style={{ pointerEvents: "none" }}>
          <p style={{ textAlign: "center", width: 100 }}>{jsTime}</p>
        </Html>
      </Box>

      {/* Green Rust Box */}
      <Box
        ref={boxRef2}
        args={[1, 1, 1]}
        position={[1, 0, 0]}
        onClick={getRsTime}
        // onClick={getRsTimeAsync}
      >
        <meshStandardMaterial color={colorRight} toneMapped={false} />
        <Html center style={{ pointerEvents: "none" }}>
          <p style={{ textAlign: "center", width: 100 }}>{rsTime}</p>
        </Html>
      </Box>
    </>
  );
};

export default App;
