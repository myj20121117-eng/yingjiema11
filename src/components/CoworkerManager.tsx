import React from "react";
import { motion } from "motion/react";
import * as Icons from "lucide-react";
import { Coworker } from "../types";

interface CoworkerManagerProps {
  coworkers: Coworker[];
  money: number;
  onHireCoworker: (coworkerId: string) => void;
  totalDps: number;
}

export const CoworkerManager: React.FC<CoworkerManagerProps> = ({
  coworkers,
  money,
  onHireCoworker,
  totalDps,
}) => {
  // Safe helper to render Lucide icons dynamically
  const renderIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    if (IconComponent) {
      return <IconComponent className="w-5 h-5 text-indigo-400" />;
    }
    return <Icons.User className="w-5 h-5 text-indigo-400" />;
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col h-full">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
        <h2 className="text-md font-bold tracking-tight text-slate-100 flex items-center gap-2">
          👥 招募摸鱼盟友 <span className="text-xs font-normal text-slate-400 font-mono">(全自动解压输出)</span>
        </h2>
        <span className="text-xs bg-rose-500/10 text-rose-400 px-2.5 py-0.5 rounded-full font-mono font-bold animate-pulse">
          当前总 DPS: {totalDps.toLocaleString()} /秒
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 overflow-y-auto max-h-[360px] pr-1 scrollbar-thin">
        {coworkers.map((coworker) => {
          // Dynamic cost based on count (standard clicker exponential cost scale)
          const currentCost = Math.round(coworker.cost * Math.pow(1.15, coworker.count));
          const canAfford = money >= currentCost;

          return (
            <motion.div
              key={coworker.id}
              whileHover={{ scale: 1.01 }}
              className="p-3.5 bg-slate-800/30 border border-slate-800 hover:border-slate-700/80 rounded-xl flex flex-col justify-between transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                {/* Left side details */}
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center shrink-0 border border-slate-800">
                    {renderIcon(coworker.icon)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-100 truncate">{coworker.name}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1 leading-relaxed">
                      {coworker.description}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-indigo-400 font-mono font-semibold">
                        单体 DPS: +{coworker.dps}
                      </span>
                      {coworker.count > 0 && (
                        <span className="text-[10px] text-slate-500 font-mono">
                          总输出: {(coworker.dps * coworker.count).toLocaleString()}/秒
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right side headcount */}
                <div className="flex flex-col items-end">
                  <span className="text-xs bg-slate-950 border border-slate-800 text-slate-300 font-mono font-black px-2 py-0.5 rounded-md">
                    x{coworker.count}
                  </span>
                </div>
              </div>

              {/* Purchase button panel */}
              <div className="mt-3 pt-2.5 border-t border-slate-800/50 flex items-center justify-between gap-2">
                <span className="text-xs font-mono text-emerald-400 font-black">
                  💵 {currentCost.toLocaleString()} 元
                </span>

                <button
                  disabled={!canAfford}
                  onClick={() => onHireCoworker(coworker.id)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 transition-all ${
                    canAfford
                      ? "bg-indigo-500 text-white hover:bg-indigo-600 active:scale-95 shadow-md shadow-indigo-500/20"
                      : "bg-slate-800 text-slate-500 cursor-not-allowed"
                  }`}
                >
                  <Icons.Plus className="w-3.5 h-3.5" /> 雇佣盟友
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
