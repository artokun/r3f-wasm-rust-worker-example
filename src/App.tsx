import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Box } from "@react-three/drei";

const App: React.FC = () => {
  const boxRef = useRef<THREE.Mesh>();

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();

    if (boxRef.current) {
      boxRef.current.rotation.y = a;
    }
  });

  return (
    <>
      <Box ref={boxRef} args={[1, 1, 1]} position={[0, 0, 0]}>
        <meshStandardMaterial color="red" />
      </Box>
    </>
  );
};

export default App;
