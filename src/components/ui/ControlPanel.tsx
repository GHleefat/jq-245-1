import { Droplets, Sun, CloudRain, Leaf, Wind } from "lucide-react";
import { useHumidityStore, HumidityStatus } from "@/store/useHumidityStore";

const statusConfig: Record<
  HumidityStatus,
  { label: string; icon: typeof Droplets; colorClass: string; bgClass: string }
> = {
  dry: {
    label: "偏干",
    icon: Sun,
    colorClass: "text-warn-500",
    bgClass: "bg-warn-500/10",
  },
  normal: {
    label: "正常",
    icon: Wind,
    colorClass: "text-soil-500",
    bgClass: "bg-soil-500/10",
  },
  optimal: {
    label: "适宜",
    icon: Leaf,
    colorClass: "text-forest-500",
    bgClass: "bg-forest-500/10",
  },
  wet: {
    label: "偏湿",
    icon: CloudRain,
    colorClass: "text-glass-400",
    bgClass: "bg-glass-400/10",
  },
};

const ControlPanel = () => {
  const { humidity, status, setHumidity, hidePopup } = useHumidityStore();
  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <div
      className="fixed bottom-6 left-6 z-40 w-80"
      onClick={hidePopup}
    >
      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700 font-serif">
              湿度控制
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              调节湿度观察苔藓变化
            </p>
          </div>
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${config.bgClass}`}
          >
            <StatusIcon size={14} className={config.colorClass} />
            <span className={`text-xs font-medium ${config.colorClass}`}>
              {config.label}
            </span>
          </div>
        </div>

        <div className="mb-3">
          <div className="flex items-baseline justify-between mb-2">
            <div className="flex items-baseline gap-1">
              <Droplets size={18} className={config.colorClass} />
              <span
                className={`text-3xl font-bold font-serif ${config.colorClass}`}
              >
                {humidity}
              </span>
              <span className="text-lg text-gray-400">%</span>
            </div>
          </div>

          <input
            type="range"
            min={0}
            max={100}
            value={humidity}
            onChange={(e) => setHumidity(Number(e.target.value))}
            className="humidity-slider"
          />

          <div className="flex justify-between mt-1.5 text-[10px] text-gray-400">
            <span className="text-warn-500">0%</span>
            <span className="text-warn-500">干燥</span>
            <span className="text-forest-500">适宜</span>
            <span className="text-glass-400">潮湿</span>
            <span className="text-glass-400">100%</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-gray-200/50">
          <button
            onClick={() => setHumidity(25)}
            className="flex flex-col items-center gap-1 py-2 rounded-xl bg-warn-500/10 hover:bg-warn-500/20 transition-colors"
          >
            <Sun size={16} className="text-warn-500" />
            <span className="text-[10px] text-warn-500 font-medium">干燥</span>
          </button>
          <button
            onClick={() => setHumidity(72)}
            className="flex flex-col items-center gap-1 py-2 rounded-xl bg-forest-500/10 hover:bg-forest-500/20 transition-colors"
          >
            <Leaf size={16} className="text-forest-500" />
            <span className="text-[10px] text-forest-500 font-medium">
              适宜
            </span>
          </button>
          <button
            onClick={() => setHumidity(92)}
            className="flex flex-col items-center gap-1 py-2 rounded-xl bg-glass-400/20 hover:bg-glass-400/30 transition-colors"
          >
            <CloudRain size={16} className="text-glass-400" />
            <span className="text-[10px] text-glass-400 font-medium">
              潮湿
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
