import { useRef } from "react";
import * as THREE from "three";
import { useHumidityStore } from "@/store/useHumidityStore";

const GlassContainer = () => {
  const glassRef = useRef<THREE.Mesh>(null);
  const { humidity } = useHumidityStore();

  const isOptimal = humidity >= 60 && humidity <= 85;
  const isWet = humidity > 85;

  const mistLayerOpacity = isOptimal
    ? Math.min(0.4, (humidity - 60) / 60)
    : isWet
      ? 0.4 + Math.min(0.6, (humidity - 85) / 25)
      : 0;

  const condensationOpacity = isWet ? Math.min(1, (humidity - 85) / 15) : 0;

  const glassRoughness = isWet
    ? 0.05 + Math.min(0.25, (humidity - 85) / 60)
    : 0.05;

  return (
    <group>
      <mesh ref={glassRef} position={[0, 0.5, 0]}>
        <cylinderGeometry args={[1.1, 1.2, 2, 64, 1, true]} />
        <meshPhysicalMaterial
          color="#e8f4f8"
          transparent
          opacity={0.25}
          roughness={glassRoughness}
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

      {mistLayerOpacity > 0 && (
        <>
          <mesh position={[0, 0.8, 0]}>
            <cylinderGeometry args={[1.07, 1.08, 1.3, 64, 1, true]} />
            <meshPhysicalMaterial
              color="#ffffff"
              transparent
              opacity={mistLayerOpacity * 0.12}
              roughness={0.85}
              transmission={0.4}
              side={THREE.BackSide}
            />
          </mesh>

          <mesh position={[0, 1.44, 0]}>
            <ringGeometry args={[1.0, 1.09, 64]} />
            <meshBasicMaterial
              color="#f0f8ff"
              transparent
              opacity={mistLayerOpacity * 0.35}
              side={THREE.DoubleSide}
            />
          </mesh>
        </>
      )}

      {condensationOpacity > 0 && (
        <>
          <mesh position={[0, 0.9, 0]}>
            <cylinderGeometry args={[1.085, 1.09, 1.5, 64, 1, true]} />
            <meshPhysicalMaterial
              color="#d4ebf1"
              transparent
              opacity={condensationOpacity * 0.18}
              roughness={0.95}
              transmission={0.2}
              side={THREE.BackSide}
            />
          </mesh>

          <mesh position={[0, 1.46, 0]}>
            <ringGeometry args={[1.02, 1.09, 64]} />
            <meshBasicMaterial
              color="#ffffff"
              transparent
              opacity={condensationOpacity * 0.5}
              side={THREE.DoubleSide}
            />
          </mesh>
        </>
      )}
    </group>
  );
};

export default GlassContainer;
