import MossScene from "@/components/scene/MossScene";
import ControlPanel from "@/components/ui/ControlPanel";
import HumidityPopup from "@/components/ui/HumidityPopup";
import Header from "@/components/ui/Header";

export default function Home() {
  return (
    <div className="w-full h-full relative overflow-hidden">
      <div className="absolute inset-0">
        <MossScene />
      </div>

      <Header />
      <ControlPanel />
      <HumidityPopup />
    </div>
  );
}
