import { ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import { useHumidityStore } from "@/store/useHumidityStore";

const ClickableGround = () => {
  const { humidity, showPopup } = useHumidityStore();

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    const point = e.point;

    const noise =
      (Math.sin(point.x * 5 + point.z * 3) +
        Math.cos(point.z * 4 - point.x * 2) +
        Math.sin((point.x + point.z) * 6)) *
      5;

    const localHumidity = Math.max(
      0,
      Math.min(100, humidity + noise)
    );

    const rect = (
      e.nativeEvent.target as HTMLCanvasElement
    )?.getBoundingClientRect();

    if (rect) {
      showPopup(
        e.nativeEvent.clientX - rect.left,
        e.nativeEvent.clientY - rect.top,
        Math.round(localHumidity),
        { x: point.x, y: point.y, z: point.z }
      );
    }
  };

  return (
    <mesh
      position={[0, -0.17, 0]}
      onClick={handleClick}
    >
      <cylinderGeometry args={[1.05, 1.05, 0.02, 64]} />
      <meshBasicMaterial transparent opacity={0} />
    </mesh>
  );
};

export default ClickableGround;
