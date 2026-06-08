import { Leaf, Info } from "lucide-react";

const Header = () => {
  return (
    <div className="fixed top-6 right-6 z-40">
      <div className="glass-card px-5 py-4 max-w-xs">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-forest-500/10 flex items-center justify-center flex-shrink-0">
            <Leaf size={20} className="text-forest-600" />
          </div>
          <div>
            <h1 className="text-base font-bold text-forest-700 font-serif leading-tight">
              微型苔藓景观
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              养护助手
            </p>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-200/50">
          <div className="flex items-start gap-2">
            <Info size={12} className="text-gray-400 mt-0.5 flex-shrink-0" />
            <p className="text-[11px] text-gray-500 leading-relaxed">
              拖拽旋转视角观察景观
              <br />
              点击土壤查看湿度读数
              <br />
              调节滑块体验湿度变化
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
