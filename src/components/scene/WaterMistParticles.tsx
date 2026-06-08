import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useHumidityStore } from "@/store/useHumidityStore";

const WaterMistParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const { humidity } = useHumidityStore();

  const particleCount = 250;

  const [positions, speeds, sizes] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const spd = new Float32Array(particleCount);
    const sze = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.3 + Math.random() * 0.75;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = -0.1 + Math.random() * 1.6;
      pos[i * 3 + 2] = Math.sin(angle) * radius;

      spd[i] = 0.15 + Math.random() * 0.35;
      sze[i] = 0.015 + Math.random() * 0.03;
    }

    return [pos, spd, sze];
  }, []);

  const visible = humidity >= 60 && humidity <= 85;
  const intensity = visible
    ? Math.min(1, Math.min(humidity - 60, 85 - humidity) / 12.5)
    : 0;

  useFrame((_, delta) => {
    if (!pointsRef.current) return;

    const posArray = pointsRef.current.geometry.attributes.position
      .array as Float32Array;

    for (let i = 0; i < particleCount; i++) {
      posArray[i * 3 + 1] += speeds[i] * delta;

      if (posArray[i * 3 + 1] > 1.55) {
        posArray[i * 3 + 1] = -0.1;
        const angle = Math.random() * Math.PI * 2;
        const radius = 0.3 + Math.random() * 0.75;
        posArray[i * 3] = Math.cos(angle) * radius;
        posArray[i * 3 + 2] = Math.sin(angle) * radius;
      }

      posArray[i * 3] += Math.sin(Date.now() * 0.0005 + i) * 0.0005;
      posArray[i * 3 + 2] += Math.cos(Date.now() * 0.0005 + i) * 0.0005;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  if (!visible) return null;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.035}
        transparent
        opacity={intensity * 0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default WaterMistParticles;
