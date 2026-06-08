const SoilBase = () => {
  return (
    <group position={[0, -0.35, 0]}>
      <mesh position={[0, 0, 0]} receiveShadow>
        <cylinderGeometry args={[1.08, 1.15, 0.35, 64]} />
        <meshStandardMaterial
          color="#5c4033"
          roughness={0.95}
          metalness={0}
        />
      </mesh>

      <mesh position={[0, 0.17, 0]}>
        <cylinderGeometry args={[1.05, 1.08, 0.02, 64]} />
        <meshStandardMaterial
          color="#3d2b1f"
          roughness={1}
          metalness={0}
        />
      </mesh>
    </group>
  );
};

export default SoilBase;
