import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useHumidityStore } from "@/store/useHumidityStore";

const GLASS_RADIUS_INNER = 1.03;

const WaterMistParticles = () => {
  const mistRef = useRef<THREE.Points>(null);
  const dropletRef = useRef<THREE.Points>(null);
  const denseDropletRef = useRef<THREE.Points>(null);
  const { humidity } = useHumidityStore();

  const mistCount = 500;
  const dropletCount = 250;
  const denseDropletCount = 350;

  const [mistPositions, mistSpeeds, mistAngles, mistRadii] = useMemo(() => {
    const pos = new Float32Array(mistCount * 3);
    const spd = new Float32Array(mistCount);
    const ang = new Float32Array(mistCount);
    const rad = new Float32Array(mistCount);

    for (let i = 0; i < mistCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = GLASS_RADIUS_INNER - 0.01 - Math.random() * 0.04;
      ang[i] = angle;
      rad[i] = radius;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = -0.05 + Math.random() * 1.55;
      pos[i * 3 + 2] = Math.sin(angle) * radius;

      spd[i] = 0.06 + Math.random() * 0.15;
    }

    return [pos, spd, ang, rad];
  }, []);

  const [dropletPositions, dropletSpeeds] = useMemo(() => {
    const pos = new Float32Array(dropletCount * 3);
    const spd = new Float32Array(dropletCount);

    for (let i = 0; i < dropletCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = GLASS_RADIUS_INNER - 0.003 - Math.random() * 0.01;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = 0.1 + Math.random() * 1.35;
      pos[i * 3 + 2] = Math.sin(angle) * radius;

      spd[i] = 0.015 + (i % 7) * 0.006;
    }

    return [pos, spd];
  }, []);

  const [denseDropletPositions, denseDropletSpeeds, denseDropletSizes] =
    useMemo(() => {
      const pos = new Float32Array(denseDropletCount * 3);
      const spd = new Float32Array(denseDropletCount);
      const sze = new Float32Array(denseDropletCount);

      for (let i = 0; i < denseDropletCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = GLASS_RADIUS_INNER - 0.001 - Math.random() * 0.006;
        pos[i * 3] = Math.cos(angle) * radius;
        pos[i * 3 + 1] = 0.0 + Math.random() * 1.45;
        pos[i * 3 + 2] = Math.sin(angle) * radius;

        spd[i] = 0.01 + (i % 9) * 0.005;
        sze[i] = 0.035 + Math.random() * 0.05;
      }

      return [pos, spd, sze];
    }, []);

  const isOptimal = humidity >= 60 && humidity <= 85;
  const isWet = humidity > 85;
  const visible = isOptimal || isWet;

  const mistIntensity = isOptimal
    ? 0.45 + Math.min(0.55, (humidity - 60) / 45)
    : isWet
      ? 0.7 + Math.min(0.3, (humidity - 85) / 50)
      : 0;

  const dropletIntensity = isOptimal
    ? Math.min(0.4, (humidity - 60) / 62)
    : isWet
      ? 0.5 + Math.min(0.5, (humidity - 85) / 30)
      : 0;

  const denseDropletIntensity = isWet ? Math.min(1, (humidity - 85) / 15) : 0;

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();

    if (mistRef.current) {
      const posArray = mistRef.current.geometry.attributes.position
        .array as Float32Array;

      for (let i = 0; i < mistCount; i++) {
        posArray[i * 3 + 1] += mistSpeeds[i] * delta;

        if (posArray[i * 3 + 1] > 1.55) {
          posArray[i * 3 + 1] = -0.05;
          mistAngles[i] = Math.random() * Math.PI * 2;
          mistRadii[i] = GLASS_RADIUS_INNER - 0.01 - Math.random() * 0.04;
        }

        const wobble = Math.sin(t * 0.5 + i * 0.6) * 0.006;
        const angle = mistAngles[i] + Math.sin(t * 0.25 + i * 0.5) * 0.012;
        posArray[i * 3] = Math.cos(angle) * (mistRadii[i] + wobble);
        posArray[i * 3 + 2] = Math.sin(angle) * (mistRadii[i] + wobble);
      }

      mistRef.current.geometry.attributes.position.needsUpdate = true;
    }

    if (dropletRef.current) {
      const posArray = dropletRef.current.geometry.attributes.position
        .array as Float32Array;

      for (let i = 0; i < dropletCount; i++) {
        posArray[i * 3 + 1] -= dropletSpeeds[i] * delta;

        if (posArray[i * 3 + 1] < -0.05) {
          posArray[i * 3 + 1] = 1.45;
          const angle = Math.random() * Math.PI * 2;
          const radius = GLASS_RADIUS_INNER - 0.003 - Math.random() * 0.01;
          posArray[i * 3] = Math.cos(angle) * radius;
          posArray[i * 3 + 2] = Math.sin(angle) * radius;
        }
      }

      dropletRef.current.geometry.attributes.position.needsUpdate = true;
    }

    if (denseDropletRef.current) {
      const posArray = denseDropletRef.current.geometry.attributes.position
        .array as Float32Array;

      for (let i = 0; i < denseDropletCount; i++) {
        posArray[i * 3 + 1] -= denseDropletSpeeds[i] * delta;

        if (posArray[i * 3 + 1] < -0.05) {
          posArray[i * 3 + 1] = 1.5;
          const angle = Math.random() * Math.PI * 2;
          const radius = GLASS_RADIUS_INNER - 0.001 - Math.random() * 0.006;
          posArray[i * 3] = Math.cos(angle) * radius;
          posArray[i * 3 + 2] = Math.sin(angle) * radius;
        }
      }

      denseDropletRef.current.geometry.attributes.position.needsUpdate = true;
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
          color="#f0f8ff"
          size={0.035}
          transparent
          opacity={mistIntensity * 0.55}
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
            size={0.04}
            transparent
            opacity={dropletIntensity * 0.7}
            sizeAttenuation
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
      )}

      {denseDropletIntensity > 0 && (
        <points ref={denseDropletRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={denseDropletCount}
              array={denseDropletPositions}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            color="#ffffff"
            size={0.05}
            transparent
            opacity={denseDropletIntensity * 0.9}
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
