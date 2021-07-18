import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Box } from "@react-three/drei";

const App: React.FC = () => {
  const boxRef1 = useRef<THREE.Mesh>();
  const boxRef2 = useRef<THREE.Mesh>();

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();

    boxRef1.current!.rotation.y = a / 2;
    boxRef2.current!.rotation.y = a / 2;
  });

  return (
    <>
      {/* Good for 3D that needs to have nice shadow values */}
      <Box ref={boxRef1} args={[1, 1, 1]} position={[-1, 0, 0]}>
        <meshStandardMaterial color="red" toneMapped={false} />
      </Box>

      {/* Good for UI that needs to map to CSS exactly */}
      <Box ref={boxRef2} args={[1, 1, 1]} position={[1, 0, 0]}>
        <meshBasicMaterial color="red" toneMapped={false} />
      </Box>
    </>
  );
};

export default App;
