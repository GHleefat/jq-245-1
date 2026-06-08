import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useHumidityStore } from "@/store/useHumidityStore";

const Moss = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { humidity } = useHumidityStore();

  const mossColor = useMemo(() => {
    const healthyColor = new THREE.Color("#5B8C5A");
    const dryColor = new THREE.Color("#C9A227");
    const dryness = Math.max(0, (40 - humidity) / 40);
    return healthyColor.clone().lerp(dryColor, dryness);
  }, [humidity]);

  const mossData = useMemo(() => {
    const clusters: Array<{
      position: [number, number, number];
      scale: [number, number, number];
      rotation: [number, number, number];
    }> = [];

    const mainPositions: Array<[number, number, number]> = [
      [0, -0.13, 0],
      [0.35, -0.15, 0.2],
      [-0.3, -0.14, 0.25],
      [0.15, -0.16, -0.35],
      [-0.25, -0.13, -0.2],
      [0.5, -0.14, -0.15],
      [-0.45, -0.15, -0.05],
    ];

    mainPositions.forEach((pos) => {
      clusters.push({
        position: pos,
        scale: [1 + Math.random() * 0.3, 0.6 + Math.random() * 0.4, 1 + Math.random() * 0.3],
        rotation: [0, Math.random() * Math.PI, 0],
      });
    });

    const smallCount = 12;
    for (let i = 0; i < smallCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.2 + Math.random() * 0.7;
      clusters.push({
        position: [
          Math.cos(angle) * radius,
          -0.16 + Math.random() * 0.03,
          Math.sin(angle) * radius,
        ],
        scale: [0.25 + Math.random() * 0.3, 0.2 + Math.random() * 0.15, 0.25 + Math.random() * 0.3],
        rotation: [0, Math.random() * Math.PI, 0],
      });
    }

    return clusters;
  }, []);

  const bladeRefs = useRef<Array<THREE.Mesh>>([]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    bladeRefs.current.forEach((blade, i) => {
      if (blade) {
        blade.rotation.z = Math.sin(t * 0.8 + i * 0.5) * 0.03;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {mossData.map((data, i) => (
        <group
          key={i}
          position={data.position}
          rotation={data.rotation}
          scale={data.scale}
        >
          <mesh
            ref={(el) => {
              if (el) bladeRefs.current[i] = el;
            }}
            position={[0, 0.08, 0]}
          >
            <sphereGeometry args={[0.25, 16, 12]} />
            <meshStandardMaterial
              color={mossColor}
              roughness={0.95}
              metalness={0}
            />
          </mesh>
          <mesh position={[0, 0.02, 0]}>
            <cylinderGeometry args={[0.28, 0.3, 0.08, 16]} />
            <meshStandardMaterial
              color={mossColor.clone().multiplyScalar(0.85)}
              roughness={1}
              metalness={0}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
};

export default Moss;
