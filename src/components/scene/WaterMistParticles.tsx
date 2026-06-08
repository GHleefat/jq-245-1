import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useHumidityStore } from "@/store/useHumidityStore";

const GLASS_RADIUS_INNER = 1.02;

const WaterMistParticles = () => {
  const mistRef = useRef<THREE.Points>(null);
  const dropletRef = useRef<THREE.Points>(null);
  const { humidity } = useHumidityStore();

  const mistCount = 300;
  const dropletCount = 150;

  const [mistPositions, mistSpeeds, mistSizes, mistAngles, mistRadii] =
    useMemo(() => {
      const pos = new Float32Array(mistCount * 3);
      const spd = new Float32Array(mistCount);
      const sze = new Float32Array(mistCount);
      const ang = new Float32Array(mistCount);
      const rad = new Float32Array(mistCount);

      for (let i = 0; i < mistCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = GLASS_RADIUS_INNER - 0.02 - Math.random() * 0.06;
        ang[i] = angle;
        rad[i] = radius;
        pos[i * 3] = Math.cos(angle) * radius;
        pos[i * 3 + 1] = -0.05 + Math.random() * 1.5;
        pos[i * 3 + 2] = Math.sin(angle) * radius;

        spd[i] = 0.08 + Math.random() * 0.18;
        sze[i] = 0.018 + Math.random() * 0.022;
      }

      return [pos, spd, sze, ang, rad];
    }, []);

  const [dropletPositions, dropletSizes] = useMemo(() => {
    const pos = new Float32Array(dropletCount * 3);
    const sze = new Float32Array(dropletCount);

    for (let i = 0; i < dropletCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = GLASS_RADIUS_INNER - 0.005 - Math.random() * 0.015;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = 0.1 + Math.random() * 1.3;
      pos[i * 3 + 2] = Math.sin(angle) * radius;

      sze[i] = 0.025 + Math.random() * 0.04;
    }

    return [pos, sze];
  }, []);

  const isOptimal = humidity >= 60 && humidity <= 85;
  const isWet = humidity > 85;
  const visible = isOptimal || isWet;

  const mistIntensity = isOptimal
    ? Math.min(0.5, (humidity - 60) / 50)
    : isWet
      ? 0.5 + Math.min(0.5, (humidity - 85) / 30)
      : 0;

  const dropletIntensity = isWet ? Math.min(1, (humidity - 85) / 15) : 0;

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();

    if (mistRef.current) {
      const posArray = mistRef.current.geometry.attributes.position
        .array as Float32Array;

      for (let i = 0; i < mistCount; i++) {
        posArray[i * 3 + 1] += mistSpeeds[i] * delta;

        if (posArray[i * 3 + 1] > 1.5) {
          posArray[i * 3 + 1] = -0.05;
          mistAngles[i] = Math.random() * Math.PI * 2;
          mistRadii[i] = GLASS_RADIUS_INNER - 0.02 - Math.random() * 0.06;
        }

        const wobble = Math.sin(t * 0.6 + i * 0.7) * 0.008;
        const angle = mistAngles[i] + Math.sin(t * 0.3 + i) * 0.015;
        posArray[i * 3] = Math.cos(angle) * (mistRadii[i] + wobble);
        posArray[i * 3 + 2] = Math.sin(angle) * (mistRadii[i] + wobble);
      }

      mistRef.current.geometry.attributes.position.needsUpdate = true;
    }

    if (dropletRef.current) {
      const posArray = dropletRef.current.geometry.attributes.position
        .array as Float32Array;

      for (let i = 0; i < dropletCount; i++) {
        posArray[i * 3 + 1] -= (0.02 + (i % 5) * 0.008) * delta;

        if (posArray[i * 3 + 1] < 0) {
          posArray[i * 3 + 1] = 1.4;
          const angle = Math.random() * Math.PI * 2;
          const radius = GLASS_RADIUS_INNER - 0.005 - Math.random() * 0.015;
          posArray[i * 3] = Math.cos(angle) * radius;
          posArray[i * 3 + 2] = Math.sin(angle) * radius;
        }
      }

      dropletRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  if (!visible) return null;

  return (
    <group>
      <points ref={mistRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={mistCount}
            array={mistPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#e8f4f8"
          size={0.028}
          transparent
          opacity={mistIntensity * 0.5}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {dropletIntensity > 0 && (
        <points ref={dropletRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={dropletCount}
              array={dropletPositions}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            color="#ffffff"
            size={0.035}
            transparent
            opacity={dropletIntensity * 0.8}
            sizeAttenuation
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
      )}
    </group>
  );
};

export default WaterMistParticles;
