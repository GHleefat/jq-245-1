import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import GlassContainer from "./GlassContainer";
import SoilBase from "./SoilBase";
import Moss from "./Moss";
import Pebbles from "./Pebbles";
import Wood from "./Wood";
import WaterMistParticles from "./WaterMistParticles";
import ClickableGround from "./ClickableGround";

const MossScene = () => {
  return (
    <Canvas
      shadows
      camera={{ position: [2.8, 2, 3], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <color attach="background" args={["#f5f7f6"]} />
      <fog attach="fog" args={["#f5f7f6", 6, 12]} />

      <ambientLight intensity={0.6} />
      <directionalLight
        position={[3, 5, 2]}
        intensity={1.1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-2, 3, -2]} intensity={0.3} />
      <pointLight position={[0, 1.5, 0]} intensity={0.4} color="#fffaf0" />

      <group position={[0, -0.3, 0]}>
        <SoilBase />
        <Moss />
        <Pebbles />
        <Wood />
        <WaterMistParticles />
        <ClickableGround />
        <GlassContainer />
      </group>

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.85, 0]}
        receiveShadow
      >
        <circleGeometry args={[4, 64]} />
        <shadowMaterial transparent opacity={0.12} />
      </mesh>

      <Environment preset="city" />

      <OrbitControls
        enablePan={false}
        minDistance={2.5}
        maxDistance={6}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.1}
        enableDamping
        dampingFactor={0.08}
      />
    </Canvas>
  );
};

export default MossScene;
