import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Flame, MessageSquare, Zap, ShieldAlert, Sparkles } from "lucide-react";
import { playSlap, playUpgrade } from "../utils/audio";

interface VentingConsoleProps {
  onSlamDamage: (damageMultiplier?: number) => void;
  money: number;
  totalDps: number;
  clickDamage: number;
  activeScreamTime: number; // seconds remaining
  activeStormTime: number; // seconds remaining
  triggerScream: () => void;
  triggerStorm: () => void;
  screamCooldown: number; // remaining cooldown in seconds
  stormCooldown: number; // remaining cooldown in seconds
  attire: "white_coat" | "scrub_suit";
}

export const VentingConsole: React.FC<VentingConsoleProps> = ({
  onSlamDamage,
  money,
  totalDps,
  clickDamage,
  activeScreamTime,
  activeStormTime,
  triggerScream,
  triggerStorm,
  screamCooldown,
  stormCooldown,
  attire,
}) => {
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const [recentKeys, setRecentKeys] = useState<{ id: number; char: string }[]>([]);
  const consoleRef = useRef<HTMLDivElement>(null);
  const keyIdCounter = useRef(0);

  // Keyboard Bashing Event Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid triggering when in text inputs
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      e.preventDefault();
      const key = e.key.toUpperCase();
      setPressedKey(key);

      // Inflict smash damage
      onSlamDamage(1);

      // Add to cascading visual keys list (limit to 10 on screen)
      keyIdCounter.current += 1;
      setRecentKeys((prev) => [
        ...prev.slice(-8),
        { id: keyIdCounter.current, char: key.length === 1 ? key : key.slice(0, 3) },
      ]);

      // Synth physical click sound
      playSlap();

      // Clear highlighted key
      setTimeout(() => {
        setPressedKey((curr) => (curr === key ? null : curr));
      }, 100);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onSlamDamage]);

  // Color mapping based on current selected doctor attire
  const accentTextClass = attire === "white_coat" ? "text-sky-400" : "text-teal-400";
  const accentBorderClass = attire === "white_coat" ? "border-sky-800" : "border-teal-800";
  const accentBgClass = attire === "white_coat" ? "bg-sky-500/10" : "bg-teal-500/10";
  const activePulseClass = attire === "white_coat" ? "bg-sky-600 text-white" : "bg-teal-600 text-white";

  return (
    <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col h-full justify-between">
      {/* Title */}
      <div className="mb-4 pb-2 border-b border-slate-800">
        <h2 className="text-md font-bold tracking-tight text-slate-100 flex items-center gap-2">
          ⚡ 医者反抗击打终端 <span className="text-[10px] text-rose-400 font-mono bg-rose-500/10 px-2 py-0.5 rounded-full">键盘敲击全触发</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          点按键盘任意键，或点击下方物理模块，发出积怨已久的全力怒吼！
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch flex-1">
        {/* Left Side: Physical Keyboard Mash Area */}
        <div
          ref={consoleRef}
          tabIndex={0}
          className="relative bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center min-h-[140px] cursor-pointer focus:outline-none focus:ring-1 focus:ring-teal-500/50 group"
        >
          {/* Active status indicator */}
          <div className="absolute top-2.5 left-3 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-[10px] font-mono text-slate-500 group-focus:text-teal-400">
              {pressedKey ? "检测到输入..." : "点击激活：开始疯狂砸键盘解压！"}
            </span>
          </div>

          {/* Floating Medical Particle Cascade */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
            <AnimatePresence>
              {recentKeys.map((k) => (
                <motion.div
                  key={k.id}
                  initial={{
                    opacity: 1,
                    scale: 0.6,
                    x: Math.random() * 160 - 80,
                    y: 40,
                    rotate: Math.random() * 60 - 30,
                  }}
                  animate={{
                    opacity: 0,
                    scale: 1.4,
                    y: -105,
                    x: Math.random() * 240 - 120,
                    rotate: Math.random() * 360 - 180,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.85, ease: "easeOut" }}
                  className="absolute bottom-6 font-mono font-black text-rose-400 bg-rose-500/15 border border-rose-500/30 px-2 py-1 rounded shadow-lg text-xs select-none flex items-center gap-1"
                >
                  <span>{k.char}</span>
                  <span>🩺</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Huge Virtual Key */}
          <motion.div
            animate={pressedKey ? { scale: 0.9, y: 3 } : { scale: 1, y: 0 }}
            className={`w-20 h-20 rounded-2xl flex flex-col items-center justify-center border-b-4 text-center select-none shadow-lg transition-colors ${
              pressedKey
                ? "bg-rose-950 border-rose-800 text-rose-300 border-b-0"
                : attire === "white_coat"
                ? "bg-sky-950/40 border-sky-900 text-sky-400 hover:bg-sky-900/40"
                : "bg-teal-950/40 border-teal-900 text-teal-400 hover:bg-teal-900/40"
            }`}
          >
            <span className="text-2xl font-black font-mono tracking-tight">
              {pressedKey || "打"}
            </span>
            <span className="text-[9px] font-medium opacity-60">
              {pressedKey ? "拒绝！" : "任意键"}
            </span>
          </motion.div>

          <p className="text-[10px] text-slate-500 text-center mt-3 leading-tight">
            尽情猛砸任何按键！伤害等同当前持有的医疗解压武器！
          </p>
        </div>

        {/* Right Side: Doctor Active Skills */}
        <div className="flex flex-col justify-between gap-2.5">
          {/* Skill 1: Vent Scream - 大声拒绝 (医者咆哮) */}
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between gap-2">
            <div className="flex gap-3 items-center min-w-0">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                  activeScreamTime > 0
                    ? "bg-red-600 text-white animate-pulse"
                    : "bg-slate-800 text-slate-400"
                }`}
              >
                <Flame className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-bold text-slate-200">大声拒绝 (医者咆哮)</p>
                  {activeScreamTime > 0 && (
                    <span className="text-[9px] bg-red-600 text-white px-1.5 py-0.2 rounded-full font-bold animate-ping">
                      咆哮中 {activeScreamTime}s
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  12秒内，发出极具压迫感的真理辩护，点击伤害暴涨 <span className="text-red-400 font-bold">200% (x2)</span>！
                </p>
              </div>
            </div>

            <button
              disabled={screamCooldown > 0}
              onClick={triggerScream}
              className={`text-xs px-3 py-2 rounded-lg font-bold shrink-0 transition-all ${
                screamCooldown > 0
                  ? "bg-slate-800 text-slate-500 font-mono"
                  : "bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-600/25 active:scale-95 animate-pulse"
              }`}
            >
              {screamCooldown > 0 ? `${screamCooldown}s` : "大喝一声"}
            </button>
          </div>

          {/* Skill 2: Resignation Hurricane - 拒绝加班风暴 (诊室狂风) */}
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between gap-2">
            <div className="flex gap-3 items-center min-w-0">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                  activeStormTime > 0
                    ? activePulseClass + " animate-spin"
                    : "bg-slate-800 text-slate-400"
                }`}
              >
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-bold text-slate-200">退号停诊 (狂风洗礼)</p>
                  {activeStormTime > 0 && (
                    <span className="text-[9px] bg-teal-500 text-slate-950 px-1.5 py-0.2 rounded-full font-bold">
                      狂风中 {activeStormTime}s
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  10秒内，产生超频无影点击风暴，对目标造成全自动每秒 <span className="text-emerald-400 font-bold">15 次</span>重击！
                </p>
              </div>
            </div>

            <button
              disabled={stormCooldown > 0}
              onClick={triggerStorm}
              className={`text-xs px-3 py-2 rounded-lg font-bold shrink-0 transition-all ${
                stormCooldown > 0
                  ? "bg-slate-800 text-slate-500 font-mono"
                  : attire === "white_coat"
                  ? "bg-sky-600 hover:bg-sky-700 text-white shadow-md active:scale-95"
                  : "bg-teal-600 hover:bg-teal-700 text-white shadow-md active:scale-95"
              }`}
            >
              {stormCooldown > 0 ? `${stormCooldown}s` : "全院停诊"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
