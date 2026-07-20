import React, { useEffect, useState } from "react";
import { Clock, Heart, Activity } from "lucide-react";

export const OfficeBackground: React.FC = () => {
  const [ecgPath, setEcgPath] = useState<string>("M 0 30 L 40 30 L 50 10 L 60 50 L 70 20 L 80 30 L 150 30");

  // Dynamically animate the ECG monitor's pulsing waveform
  useEffect(() => {
    const ecgSegments = [
      "M 0 30 L 40 30 L 50 10 L 60 50 L 70 20 L 80 30 L 150 30",
      "M 0 30 L 45 30 L 52 15 L 60 45 L 68 25 L 75 30 L 150 30",
      "M 0 30 L 35 30 L 45 5 L 55 55 L 65 15 L 75 30 L 150 30",
      "M 0 30 L 40 30 L 48 20 L 58 40 L 66 22 L 72 30 L 150 30",
    ];

    let count = 0;
    const interval = setInterval(() => {
      count = (count + 1) % ecgSegments.length;
      setEcgPath(ecgSegments[count]);
    }, 450);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-slate-950 pointer-events-none">
      {/* Clinical ambient glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-teal-600/10 blur-[130px]" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-sky-500/10 blur-[130px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-cyan-500/5 blur-[160px]" />

      {/* Sterile Linoleum Floor layout indicator */}
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-slate-900 to-transparent opacity-90 border-t border-teal-950/40" />

      {/* Main Clinic Window frame */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[92%] max-w-5xl h-[28rem] rounded-3xl border border-slate-900 bg-slate-950/60 backdrop-blur-sm overflow-hidden shadow-2xl flex flex-col justify-between">
        
        {/* Sky gradient background behind clinic glass */}
        <div className="absolute inset-0 -z-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex justify-between px-12 pt-6">
          {/* Dim stars in the sky */}
          <div className="flex gap-4 items-start opacity-30">
            <div className="flex flex-col gap-2 pt-4">
              <div className="w-1 h-1 rounded-full bg-teal-300 animate-ping" />
              <div className="w-1.5 h-1.5 rounded-full bg-sky-300 opacity-80" />
            </div>
          </div>

          {/* City Hospital Red Cross Tower silhouette in the distance */}
          <div className="absolute bottom-0 right-16 h-36 w-32 bg-slate-950 rounded-t-lg opacity-25 flex flex-col items-center justify-start pt-3">
            {/* Glowing red cross indicator on tower */}
            <div className="w-6 h-6 flex items-center justify-center bg-red-600 rounded shadow animate-pulse">
              <span className="text-white text-xs font-bold leading-none">+</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 p-2 mt-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-sm bg-amber-500 opacity-40" />
              ))}
            </div>
          </div>
        </div>

        {/* Window pane lines */}
        <div className="absolute inset-y-0 left-1/3 w-[1px] bg-slate-900/30" />
        <div className="absolute inset-y-0 right-1/3 w-[1px] bg-slate-900/30" />
        <div className="absolute top-1/2 inset-x-0 h-[1px] bg-slate-900/30" />

        {/* Late-Night Urgent Care Sign on the background */}
        <div className="absolute top-6 right-8 flex items-center gap-2 bg-slate-950/90 border border-teal-900 rounded-full px-3.5 py-1.5 text-slate-400 shadow-md">
          <Clock className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span className="text-xs font-mono tracking-wider font-bold text-emerald-400">🏥 急诊科 - 深夜值班中</span>
        </div>

        {/* Left hanging IV Drip Bag (输液架) */}
        <div className="absolute top-4 left-10 flex flex-col items-center opacity-65 z-10">
          {/* IV Stand Pole */}
          <div className="w-1.5 h-48 bg-slate-700 rounded-t" />
          {/* Double hanger hooks */}
          <svg viewBox="-15 -10 30 15" className="w-8 h-4 transform -translate-y-48">
            <path d="M -10 0 Q 0 -5 10 0" stroke="#4b5563" strokeWidth="2" fill="none" />
          </svg>
          {/* Dripping solution bag */}
          <div className="absolute top-10 -left-3 w-7 h-14 bg-sky-200/25 border border-sky-400/50 rounded-b-xl rounded-t flex flex-col items-center justify-between p-1 shadow">
            <div className="w-full h-1 bg-sky-400/60 rounded" />
            <div className="text-[6px] font-sans text-sky-400 font-bold scale-90">0.9% NaCl</div>
            {/* Pulsing droplet */}
            <div className="w-1 h-1.5 bg-sky-400 rounded-full animate-bounce mt-1" />
          </div>
        </div>

        {/* Right side: ECG Vital Signs Monitor Screen (心电监护仪) */}
        <div className="absolute bottom-6 right-10 w-44 h-28 bg-slate-950/95 border-2 border-slate-800 rounded-xl p-2 shadow-2xl flex flex-col justify-between opacity-80 z-10">
          <div className="flex items-center justify-between border-b border-slate-900 pb-1">
            <span className="text-[8px] font-bold text-slate-500 tracking-wider flex items-center gap-1">
              <Heart className="w-2.5 h-2.5 text-red-500 animate-pulse" /> ECG MONITOR
            </span>
            <span className="text-[9px] font-mono font-bold text-emerald-400 animate-pulse">78 BPM</span>
          </div>

          {/* Animated green vector pulse */}
          <svg className="w-full h-12 stroke-emerald-500 fill-none" viewBox="0 0 150 60">
            <path d={ecgPath} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          {/* SpO2 and Temp metrics */}
          <div className="flex justify-between text-[8px] font-mono text-slate-400 pt-1 border-t border-slate-900">
            <div>
              SpO2: <span className="text-sky-400 font-bold">99%</span>
            </div>
            <div>
              TEMP: <span className="text-amber-400 font-bold">36.5°C</span>
            </div>
          </div>
        </div>

        {/* Medical reminders and Duty rules pinned on the clinic window */}
        <div className="absolute bottom-6 left-8 flex flex-col gap-2.5 opacity-75">
          <div className="bg-sky-500/10 border border-sky-500/30 text-[10px] text-sky-300 px-3 py-1.5 rounded-lg shadow-lg transform -rotate-2 max-w-[150px] font-semibold flex flex-col gap-0.5">
            <span className="text-red-400 font-bold">📌 查房核心提醒：</span>
            <span>- 12床下午做CT检查</span>
            <span>- 重症病历今天必须归档</span>
          </div>
          <div className="bg-teal-500/10 border border-teal-500/30 text-[10px] text-teal-300 px-3 py-1.5 rounded-lg shadow-lg transform rotate-2 max-w-[150px] font-semibold flex flex-col gap-0.5">
            <span className="text-yellow-400 font-bold">⚠️ 科室值班精神：</span>
            <span>沉默不是软弱，</span>
            <span className="text-red-400 font-bold font-mono">拒绝道德绑架！</span>
          </div>
        </div>

      </div>

      {/* Floating green cross sparkles representing medical power */}
      <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-teal-500/20 rounded-full animate-ping" />
      <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-sky-500/15 rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-emerald-400/20 rounded-full" />
    </div>
  );
};
