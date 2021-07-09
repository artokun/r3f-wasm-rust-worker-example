export default function Lights() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight intensity={1} position={[10, 10, 5]} />
    </>
  );
}
