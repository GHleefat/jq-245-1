import { useRef } from "react";
import * as THREE from "three";
import { useHumidityStore } from "@/store/useHumidityStore";

const GlassContainer = () => {
  const glassRef = useRef<THREE.Mesh>(null);
  const { humidity } = useHumidityStore();

  const isOptimal = humidity >= 60 && humidity <= 85;
  const isWet = humidity > 85;

  const mistLayerOpacity = isOptimal
    ? Math.min(0.3, (humidity - 60) / 80)
    : isWet
      ? 0.2 + Math.min(0.4, (humidity - 85) / 35)
      : 0;

  const condensationOpacity = isWet ? Math.min(0.8, (humidity - 85) / 20) : 0;

  const glassRoughness = isWet
    ? 0.05 + Math.min(0.2, (humidity - 85) / 75)
    : 0.05;

  return (
    <group>
      <mesh ref={glassRef} position={[0, 0.5, 0]}>
        <cylinderGeometry args={[1.1, 1.2, 2, 64, 1, true]} />
        <meshPhysicalMaterial
          color="#e8f4f8"
          transparent
          opacity={0.22}
          roughness={glassRoughness}
          metalness={0}
          transmission={0.92}
          thickness={0.05}
          envMapIntensity={1}
          clearcoat={0.8}
          clearcoatRoughness={0.1}
          ior={1.45}
        />
      </mesh>

      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[1.1, 1.1, 0.02, 64]} />
        <meshPhysicalMaterial
          color="#e0f0f8"
          transparent
          opacity={0.25}
          roughness={0.15}
          metalness={0}
          transmission={0.88}
          thickness={0.04}
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
        <mesh position={[0, 0.75, 0]}>
          <cylinderGeometry args={[1.075, 1.085, 1.45, 64, 1, true]} />
          <meshPhysicalMaterial
            color="#f5faff"
            transparent
            opacity={mistLayerOpacity * 0.08}
            roughness={0.9}
            transmission={0.55}
            side={THREE.BackSide}
          />
        </mesh>
      )}

      {condensationOpacity > 0 && (
        <mesh position={[0, 0.8, 0]}>
          <cylinderGeometry args={[1.085, 1.092, 1.55, 64, 1, true]} />
          <meshPhysicalMaterial
            color="#e4f1f7"
            transparent
            opacity={condensationOpacity * 0.12}
            roughness={0.95}
            transmission={0.35}
            side={THREE.BackSide}
          />
        </mesh>
      )}
    </group>
  );
};

export default GlassContainer;
