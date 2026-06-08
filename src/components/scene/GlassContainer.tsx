import { useRef } from "react";
import * as THREE from "three";
import { useHumidityStore } from "@/store/useHumidityStore";

const GlassContainer = () => {
  const glassRef = useRef<THREE.Mesh>(null);
  const { humidity } = useHumidityStore();

  const mistOpacity = humidity >= 60 && humidity <= 85
    ? Math.min(1, (humidity - 60) / 25)
    : 0;

  return (
    <group>
      <mesh ref={glassRef} position={[0, 0.5, 0]}>
        <cylinderGeometry args={[1.1, 1.2, 2, 64, 1, true]} />
        <meshPhysicalMaterial
          color="#e8f4f8"
          transparent
          opacity={0.25}
          roughness={0.05}
          metalness={0}
          transmission={0.9}
          thickness={0.05}
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          ior={1.45}
        />
      </mesh>

      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[1.12, 1.12, 0.04, 64]} />
        <meshPhysicalMaterial
          color="#d0eaf3"
          transparent
          opacity={0.4}
          roughness={0.1}
          metalness={0}
          transmission={0.8}
          thickness={0.08}
        />
      </mesh>

      <mesh position={[0, -0.5, 0]} receiveShadow>
        <cylinderGeometry args={[1.2, 1.2, 0.06, 64]} />
        <meshPhysicalMaterial
          color="#d0eaf3"
          transparent
          opacity={0.35}
          roughness={0.1}
          metalness={0}
          transmission={0.85}
          thickness={0.1}
        />
      </mesh>

      {mistOpacity > 0 && (
        <>
          <mesh position={[0, 0.8, 0]}>
            <cylinderGeometry args={[1.05, 1.05, 1.2, 64, 1, true]} />
            <meshPhysicalMaterial
              color="#ffffff"
              transparent
              opacity={mistOpacity * 0.08}
              roughness={0.8}
              transmission={0.5}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh position={[0, 1.42, 0]}>
            <ringGeometry args={[0.95, 1.08, 64]} />
            <meshBasicMaterial
              color="#ffffff"
              transparent
              opacity={mistOpacity * 0.25}
              side={THREE.DoubleSide}
            />
          </mesh>
        </>
      )}
    </group>
  );
};

export default GlassContainer;
