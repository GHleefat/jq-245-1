import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useHumidityStore } from "@/store/useHumidityStore";

const GLASS_OUTER_RADIUS = 1.13;
const GLASS_INNER_WALL = 1.075;

const WaterMistParticles = () => {
  const mistRef = useRef<THREE.Points>(null);
  const denseDropletRef = useRef<THREE.Points>(null);
  const { humidity } = useHumidityStore();

  const mistCount = 480;
  const denseDropletCount = 400;

  const [mistPositions, mistAngles, mistY, mistPhases] = useMemo(() => {
    const pos = new Float32Array(mistCount * 3);
    const ang = new Float32Array(mistCount);
    const yArr = new Float32Array(mistCount);
    const phase = new Float32Array(mistCount);

    const ringCount = 16;
    const perRing = Math.floor(mistCount / ringCount);

    let idx = 0;
    for (let r = 0; r < ringCount; r++) {
      const baseY = -0.05 + (r / (ringCount - 1)) * 1.55;
      for (let i = 0; i < perRing && idx < mistCount; i++, idx++) {
        const angle =
          (i / perRing) * Math.PI * 2 + (r % 2) * (Math.PI / perRing);
        const radius = GLASS_OUTER_RADIUS + Math.random() * 0.015;
        const yOffset = (Math.random() - 0.5) * 0.06;

        ang[idx] = angle;
        yArr[idx] = baseY + yOffset;
        phase[idx] = Math.random() * Math.PI * 2;
        pos[idx * 3] = Math.cos(angle) * radius;
        pos[idx * 3 + 1] = baseY + yOffset;
        pos[idx * 3 + 2] = Math.sin(angle) * radius;
      }
    }

    return [pos, ang, yArr, phase];
  }, []);

  const [denseDropletPositions, denseDropletSpeeds, denseDropletAngles] =
    useMemo(() => {
      const pos = new Float32Array(denseDropletCount * 3);
      const spd = new Float32Array(denseDropletCount);
      const ang = new Float32Array(denseDropletCount);

      const dropletRings = 12;
      const perDropletRing = Math.floor(denseDropletCount / dropletRings);

      let idx = 0;
      for (let r = 0; r < dropletRings; r++) {
        const baseY = (r / (dropletRings - 1)) * 1.5;
        for (
          let i = 0;
          i < perDropletRing && idx < denseDropletCount;
          i++, idx++
        ) {
          const angle =
            (i / perDropletRing) * Math.PI * 2 +
            (r % 2) * (Math.PI / perDropletRing) +
            Math.random() * 0.3;
          const radius = GLASS_INNER_WALL + 0.002 + Math.random() * 0.006;
          const yOffset = (Math.random() - 0.5) * 0.1;

          ang[idx] = angle;
          pos[idx * 3] = Math.cos(angle) * radius;
          pos[idx * 3 + 1] = baseY + yOffset;
          pos[idx * 3 + 2] = Math.sin(angle) * radius;

          spd[idx] = 0.008 + Math.random() * 0.025;
        }
      }

      return [pos, spd, ang];
    }, []);

  const isOptimal = humidity >= 60 && humidity <= 85;
  const isWet = humidity > 85;
  const visible = isOptimal || isWet;

  const mistIntensity = isOptimal
    ? 0.5 + Math.min(0.5, (humidity - 60) / 50)
    : isWet
      ? 0.75 + Math.min(0.25, (humidity - 85) / 60)
      : 0;

  const denseDropletIntensity = isWet ? Math.min(1, (humidity - 85) / 15) : 0;

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();

    if (mistRef.current) {
      const posArray = mistRef.current.geometry.attributes.position
        .array as Float32Array;

      for (let i = 0; i < mistCount; i++) {
        const wobble = Math.sin(t * 0.35 + mistPhases[i]) * 0.004;
        const angleWobble = Math.sin(t * 0.2 + mistPhases[i] * 1.3) * 0.006;
        const yWobble = Math.sin(t * 0.3 + mistPhases[i] * 0.7) * 0.003;

        const radius = GLASS_OUTER_RADIUS + 0.008 + wobble;
        const angle = mistAngles[i] + angleWobble;
        const y = mistY[i] + yWobble;

        posArray[i * 3] = Math.cos(angle) * radius;
        posArray[i * 3 + 1] = y;
        posArray[i * 3 + 2] = Math.sin(angle) * radius;
      }

      mistRef.current.geometry.attributes.position.needsUpdate = true;
    }

    if (denseDropletRef.current) {
      const posArray = denseDropletRef.current.geometry.attributes.position
        .array as Float32Array;

      for (let i = 0; i < denseDropletCount; i++) {
        posArray[i * 3 + 1] -= denseDropletSpeeds[i] * delta;

        if (posArray[i * 3 + 1] < -0.05) {
          posArray[i * 3 + 1] = 0.8 + Math.random() * 0.75;
          const angle = denseDropletAngles[i] + Math.random() * 0.5;
          const radius = GLASS_INNER_WALL + 0.002 + Math.random() * 0.006;
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
      <points ref={mistRef} renderOrder={-1}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={mistCount}
            array={mistPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#f5faff"
          size={0.04}
          transparent
          opacity={mistIntensity * 0.6}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

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
            size={0.055}
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
