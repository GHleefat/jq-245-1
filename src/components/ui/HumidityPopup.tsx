import { useEffect } from "react";
import { Droplets, X } from "lucide-react";
import { useHumidityStore } from "@/store/useHumidityStore";

const HumidityPopup = () => {
  const { popup, hidePopup } = useHumidityStore();

  useEffect(() => {
    if (!popup.visible) return;

    const timer = setTimeout(() => {
      hidePopup();
    }, 4000);

    return () => clearTimeout(timer);
  }, [popup.visible, popup.humidity, hidePopup]);

  if (!popup.visible) return null;

  const getColorClass = (value: number) => {
    if (value < 40) return "text-warn-500";
    if (value < 60) return "text-soil-500";
    if (value <= 85) return "text-forest-500";
    return "text-glass-400";
  };

  const getStatusText = (value: number) => {
    if (value < 40) return "偏干";
    if (value < 60) return "正常";
    if (value <= 85) return "适宜";
    return "偏湿";
  };

  return (
    <div
      key={`${popup.x}-${popup.y}-${popup.humidity}`}
      className="popup-enter fixed pointer-events-auto z-50"
      style={{
        left: popup.x,
        top: popup.y,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="glass-card px-4 py-3 min-w-[160px] relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            hidePopup();
          }}
          className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X size={12} />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <Droplets size={16} className={getColorClass(popup.humidity)} />
          <span className="text-xs text-gray-500">土壤湿度</span>
        </div>

        <div className="flex items-baseline gap-1">
          <span
            className={`text-3xl font-bold font-serif ${getColorClass(
              popup.humidity
            )}`}
          >
            {popup.humidity}
          </span>
          <span className="text-lg text-gray-500">%</span>
        </div>

        <div
          className={`text-xs font-medium mt-1 ${getColorClass(
            popup.humidity
          )}`}
        >
          {getStatusText(popup.humidity)}
        </div>

        <div className="mt-2 pt-2 border-t border-gray-200/50 text-[10px] text-gray-400">
          位置: ({popup.worldPosition.x.toFixed(2)},{" "}
          {popup.worldPosition.z.toFixed(2)})
        </div>
      </div>
    </div>
  );
};

export default HumidityPopup;
