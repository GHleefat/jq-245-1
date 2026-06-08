const Wood = () => {
  return (
    <group>
      <group position={[0.4, -0.02, -0.1]} rotation={[0.1, 0.3, 0.25]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.08, 0.1, 0.55, 12]} />
          <meshStandardMaterial
            color="#6b4423"
            roughness={0.95}
            metalness={0}
          />
        </mesh>
        <mesh position={[0, 0.28, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.09, 12]} />
          <meshStandardMaterial
            color="#8b5a2b"
            roughness={0.9}
            metalness={0}
          />
        </mesh>
        <mesh position={[0, -0.28, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.07, 12]} />
          <meshStandardMaterial
            color="#5a3a1b"
            roughness={0.95}
            metalness={0}
          />
        </mesh>
      </group>

      <group position={[-0.35, -0.04, -0.05]} rotation={[0.15, -0.5, -0.2]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.06, 0.07, 0.4, 10]} />
          <meshStandardMaterial
            color="#5c3d2e"
            roughness={0.95}
            metalness={0}
          />
        </mesh>
        <mesh position={[0, 0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.06, 10]} />
          <meshStandardMaterial
            color="#7a4a30"
            roughness={0.9}
            metalness={0}
          />
        </mesh>
        <mesh position={[0, -0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.05, 10]} />
          <meshStandardMaterial
            color="#4a2f20"
            roughness={0.95}
            metalness={0}
          />
        </mesh>
      </group>

      <group position={[-0.1, -0.08, 0.45]} rotation={[0.8, 0.2, 0.6]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.05, 0.06, 0.35, 10]} />
          <meshStandardMaterial
            color="#704a30"
            roughness={0.95}
            metalness={0}
          />
        </mesh>
      </group>
    </group>
  );
};

export default Wood;
