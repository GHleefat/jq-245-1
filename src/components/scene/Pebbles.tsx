import { useMemo } from "react";

interface PebbleData {
  position: [number, number, number];
  scale: [number, number, number];
  rotation: [number, number, number];
  color: string;
}

const Pebbles = () => {
  const pebbles: PebbleData[] = useMemo(() => {
    const colors = ["#8a8a8a", "#a0a0a0", "#707070", "#b5b5b5", "#9a9a9a"];
    const data: PebbleData[] = [
      {
        position: [0.6, -0.1, 0.5],
        scale: [0.22, 0.15, 0.2],
        rotation: [0.3, 0.5, 0.2],
        color: colors[0],
      },
      {
        position: [-0.55, -0.12, 0.45],
        scale: [0.28, 0.18, 0.25],
        rotation: [0.2, -0.4, 0.3],
        color: colors[1],
      },
      {
        position: [0.7, -0.11, -0.4],
        scale: [0.18, 0.12, 0.16],
        rotation: [-0.2, 0.8, -0.1],
        color: colors[2],
      },
      {
        position: [-0.65, -0.1, -0.35],
        scale: [0.2, 0.14, 0.22],
        rotation: [0.4, 0.2, 0.5],
        color: colors[3],
      },
      {
        position: [0.25, -0.13, 0.6],
        scale: [0.15, 0.1, 0.14],
        rotation: [0.1, -0.6, 0.15],
        color: colors[4],
      },
      {
        position: [-0.15, -0.12, -0.6],
        scale: [0.2, 0.13, 0.18],
        rotation: [-0.3, 0.3, -0.2],
        color: colors[0],
      },
      {
        position: [0.85, -0.08, 0],
        scale: [0.12, 0.09, 0.11],
        rotation: [0.15, 1.0, 0.1],
        color: colors[2],
      },
      {
        position: [-0.8, -0.09, 0.1],
        scale: [0.14, 0.1, 0.13],
        rotation: [-0.15, 0.5, -0.3],
        color: colors[1],
      },
      {
        position: [0, -0.15, 0.7],
        scale: [0.17, 0.11, 0.16],
        rotation: [0.25, -0.2, 0.35],
        color: colors[3],
      },
    ];
    return data;
  }, []);

  return (
    <group>
      {pebbles.map((pebble, i) => (
        <mesh
          key={i}
          position={pebble.position}
          rotation={pebble.rotation}
          scale={pebble.scale}
          castShadow
          receiveShadow
        >
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={pebble.color}
            roughness={0.85}
            metalness={0.05}
          />
        </mesh>
      ))}
    </group>
  );
};

export default Pebbles;
