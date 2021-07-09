import { Box } from "@react-three/drei";

export function Floor() {
  return (
    <Box args={[1, 1, 1]} position={[0, -0.5, 0]}>
      <meshStandardMaterial color="red" />
    </Box>
  );
}
