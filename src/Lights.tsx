export default function Lights() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight intensity={0.5} position={[3, 3, 3]} />
    </>
  );
}
