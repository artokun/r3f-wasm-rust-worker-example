import React, { useCallback, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Box, Html } from "@react-three/drei";
import { useControls } from "leva";

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
    fibonacci(40);
    setJsTime((Math.floor(Date.now() - startTime) / 1000).toFixed(2) + "s JS");
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
      >
        <meshStandardMaterial color={colorLeft} toneMapped={false} />
        <Html center style={{ pointerEvents: "none" }}>
          <p style={{ textAlign: "center", width: 100 }}>{jsTime}</p>
        </Html>
      </Box>

      {/* Green Rust Box */}
      <Box ref={boxRef2} args={[1, 1, 1]} position={[1, 0, 0]}>
        <meshStandardMaterial color={colorRight} toneMapped={false} />
        <Html center style={{ pointerEvents: "none" }}>
          <p style={{ textAlign: "center", width: 100 }}>{rsTime}</p>
        </Html>
      </Box>
    </>
  );
};

export default App;
