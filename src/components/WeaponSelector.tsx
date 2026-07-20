import React from "react";
import { motion } from "motion/react";
import * as Icons from "lucide-react";
import { Weapon } from "../types";

interface WeaponSelectorProps {
  weapons: Weapon[];
  selectedWeaponId: string;
  money: number;
  onBuyWeapon: (weaponId: string) => void;
  onSelectWeapon: (weaponId: string) => void;
}

export const WeaponSelector: React.FC<WeaponSelectorProps> = ({
  weapons,
  selectedWeaponId,
  money,
  onBuyWeapon,
  onSelectWeapon,
}) => {
  // Safe helper to render Lucide icons dynamically
  const renderIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    if (IconComponent) {
      return <IconComponent className="w-5 h-5" />;
    }
    return <Icons.HelpCircle className="w-5 h-5" />;
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col h-full">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
        <h2 className="text-md font-bold tracking-tight text-slate-100 flex items-center gap-2">
          🛠️ 解压武器库 <span className="text-xs font-normal text-slate-400 font-mono">(鼠标左键点击使用)</span>
        </h2>
        <span className="text-xs bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded-full font-mono font-medium">
          {weapons.filter(w => w.unlocked).length} / {weapons.length} 已解锁
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 overflow-y-auto max-h-[360px] pr-1 scrollbar-thin">
        {weapons.map((weapon) => {
          const isSelected = selectedWeaponId === weapon.id;
          const canAfford = money >= weapon.cost;
          const isUnlocked = weapon.unlocked;

          return (
            <motion.div
              key={weapon.id}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`p-3.5 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
                isSelected
                  ? "bg-indigo-950/40 border-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.25)]"
                  : isUnlocked
                  ? "bg-slate-800/40 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60"
                  : "bg-slate-950/40 border-slate-950/80 opacity-75"
              }`}
              onClick={() => {
                if (isUnlocked) {
                  onSelectWeapon(weapon.id);
                }
              }}
            >
              <div className="flex items-start gap-3">
                {/* Icon Circle */}
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    isSelected
                      ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/20"
                      : isUnlocked
                      ? "bg-slate-800 text-slate-300"
                      : "bg-slate-950 text-slate-600"
                  }`}
                >
                  {renderIcon(weapon.icon)}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-bold text-slate-100 truncate">{weapon.name}</p>
                    {isSelected && (
                      <span className="text-[10px] bg-indigo-500 text-white px-1.5 py-0.2 rounded-full font-semibold shrink-0">
                        装备中
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5 line-clamp-1 leading-relaxed">
                    {weapon.description}
                  </p>
                  <p className="text-xs text-rose-400 font-mono font-medium mt-1">
                    点击伤害: +{weapon.damage}
                  </p>
                </div>
              </div>

              {/* Unlock / Buy Panel */}
              <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between">
                {!isUnlocked ? (
                  <>
                    <span className="text-xs font-mono text-emerald-400 font-bold">
                      💵 {weapon.cost.toLocaleString()} 元
                    </span>
                    <button
                      disabled={!canAfford}
                      onClick={(e) => {
                        e.stopPropagation(); // prevent select trigger
                        onBuyWeapon(weapon.id);
                      }}
                      className={`text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 transition-all ${
                        canAfford
                          ? "bg-emerald-500 text-white hover:bg-emerald-600 active:scale-95 shadow-md shadow-emerald-500/20"
                          : "bg-slate-800 text-slate-500 cursor-not-allowed"
                      }`}
                    >
                      <Icons.Unlock className="w-3 h-3" /> 购买
                    </button>
                  </>
                ) : (
                  <div className="text-[10px] text-slate-500 font-medium">
                    已解锁 • 点击上方卡片装备
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
