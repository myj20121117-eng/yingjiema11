import React from "react";
import { motion } from "motion/react";
import { Boss, SwellingBump, Coworker } from "../types";

const REALISTIC_BOSS_IMAGES = {
  director: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600&h=600",
  compliance: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600&h=600",
  patient: "https://images.unsplash.com/photo-1580281657527-47f249e8f4df?auto=format&fit=crop&q=80&w=600&h=600",
  scheduler: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600&h=600",
  procedural: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600&h=600"
};

const REALISTIC_BOSS_VIDEOS = {
  director: "https://assets.mixkit.co/videos/preview/mixkit-medical-professional-at-work-in-a-hospital-41551-large.mp4",
  compliance: "https://assets.mixkit.co/videos/preview/mixkit-serious-man-in-front-of-a-computer-screen-in-an-office-42316-large.mp4",
  patient: "https://assets.mixkit.co/videos/preview/mixkit-man-having-an-argument-on-a-phone-call-40049-large.mp4",
  scheduler: "https://assets.mixkit.co/videos/preview/mixkit-woman-working-late-at-her-office-desk-42315-large.mp4",
  procedural: "https://assets.mixkit.co/videos/preview/mixkit-doctor-working-on-a-digital-tablet-41549-large.mp4"
};

const REALISTIC_DOCTOR_VIDEOS = {
  white_coat: "https://assets.mixkit.co/videos/preview/mixkit-doctor-with-a-stethoscope-around-his-neck-41544-large.mp4",
  scrub_suit: "https://assets.mixkit.co/videos/preview/mixkit-surgeon-preparing-for-surgery-41545-large.mp4"
};

const REALISTIC_WEAPON_IMAGES = {
  stethoscope: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=400&h=400",
  reflex_hammer: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&q=80&w=400&h=400",
  medical_records: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=400&h=400",
  hemostatic_forceps: "https://images.unsplash.com/photo-1584515981387-39795b265041?auto=format&fit=crop&q=80&w=400&h=400",
  giant_syringe: "https://images.unsplash.com/photo-1579684389782-64d84b5e901d?auto=format&fit=crop&q=80&w=400&h=400",
  defibrillator: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=400&h=400"
};

const REALISTIC_ALLY_IMAGES = {
  trainee: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=200&h=200",
  nurse: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=200&h=200",
  security: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=200&h=200",
  anesthetist: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&q=80&w=200&h=200",
  ambulance: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&q=80&w=200&h=200",
  ai_copilot: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=200&h=200"
};

interface BossCharacterProps {
  boss: Boss;
  isHit: boolean;
  isDefeated: boolean;
  activeWeaponId: string;
  swellingBumps: SwellingBump[];
  attire: "white_coat" | "scrub_suit";
  coworkers?: Coworker[];
  isCinematicMode: boolean;
}

export const BossCharacter: React.FC<BossCharacterProps> = ({
  boss,
  isHit,
  isDefeated,
  activeWeaponId,
  swellingBumps,
  attire,
  coworkers = [],
  isCinematicMode,
}) => {
  // Find which coworkers (allies) have been recruited
  const traineeCount = coworkers.find((c) => c.id === "trainee")?.count || 0;
  const nurseCount = coworkers.find((c) => c.id === "nurse")?.count || 0;
  const anesthetistCount = coworkers.find((c) => c.id === "anesthetist")?.count || 0;
  const securityCount = coworkers.find((c) => c.id === "security")?.count || 0;
  const ambulanceCount = coworkers.find((c) => c.id === "ambulance")?.count || 0;
  const aiCopilotCount = coworkers.find((c) => c.id === "ai_copilot")?.count || 0;

  // Get colors and styling for the SVG based on the Boss style
  const getAvatarConfig = () => {
    switch (boss.avatarStyle) {
      case "director":
        return {
          skinGradient: "url(#director-skin-3d)",
          suitGradient: "url(#director-suit-3d)",
          hairGradient: "url(#hair-director-3d)",
          expressionColor: "#991b1b",
          glassesColor: "#d97706", // Gold luxury rims
          badgeText: "主任医师",
        };
      case "compliance":
        return {
          skinGradient: "url(#compliance-skin-3d)",
          suitGradient: "url(#compliance-suit-3d)",
          hairGradient: "url(#hair-compliance-3d)",
          expressionColor: "#881337",
          glassesColor: "#64748b", // Cold gray glasses
          badgeText: "行政处长",
        };
      case "patient":
        return {
          skinGradient: "url(#patient-skin-3d)",
          suitGradient: "url(#patient-sweater-3d)",
          hairGradient: "url(#hair-patient-3d)",
          expressionColor: "#7f1d1d",
          glassesColor: null,
          badgeText: "无赖家属",
        };
      case "scheduler":
        return {
          skinGradient: "url(#scheduler-skin-3d)",
          suitGradient: "url(#scheduler-uniform-3d)",
          hairGradient: "url(#hair-compliance-3d)",
          expressionColor: "#1e1b4b",
          glassesColor: null,
          badgeText: "排班组长",
        };
      default:
        return {
          skinGradient: "url(#doctor-skin-3d)",
          suitGradient: "url(#white-coat-3d)",
          hairGradient: "url(#hair-compliance-3d)",
          expressionColor: "#991b1b",
          glassesColor: null,
          badgeText: "对立面",
        };
    }
  };

  const config = getAvatarConfig();

  // Face Expression Rendering for Opponent with rich 3D shading
  const renderFaceDetails = () => {
    if (isDefeated) {
      // Swirly eyes, crying streams, band-aid, submissive sweat drops
      return (
        <g id="defeated-face">
          {/* Crying 3D reflections */}
          <path d="M 280 125 Q 275 160 268 175" stroke="#38bdf8" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M 340 125 Q 345 160 352 175" stroke="#38bdf8" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M 284 130 Q 280 152 274 165" stroke="#0ea5e9" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M 336 130 Q 340 152 346 165" stroke="#0ea5e9" strokeWidth="3" fill="none" strokeLinecap="round" />
          
          {/* Dizzy 3D swirly eyes */}
          <g stroke="#374151" strokeWidth="4" fill="none" strokeLinecap="round">
            <path d="M 270 120 A 10 10 0 1 0 290 120 A 8 8 0 1 0 274 120" />
            <path d="M 330 120 A 10 10 0 1 0 350 120 A 8 8 0 1 0 334 120" />
          </g>

          {/* Dazed spiral red blushes on cheek */}
          <path d="M 250 142 Q 243 149 250 156 T 257 149" stroke="#f43f5e" strokeWidth="3" fill="none" />
          <path d="M 370 142 Q 377 149 370 156 T 363 149" stroke="#f43f5e" strokeWidth="3" fill="none" />

          {/* Cross band-aid on cheek */}
          <g transform="rotate(-15, 255, 145)">
            <rect x="240" y="140" width="32" height="12" rx="4" fill="url(#bandaid-gradient)" stroke="#b45309" strokeWidth="1.5" />
            <rect x="250" y="130" width="12" height="32" rx="4" fill="url(#bandaid-gradient)" stroke="#b45309" strokeWidth="1.5" />
          </g>

          {/* Sad wobbly mouth */}
          <path d="M 290 172 Q 310 155 330 172" stroke="#1e293b" strokeWidth="5.5" fill="none" strokeLinecap="round" />
        </g>
      );
    }

    if (isHit) {
      // Screaming squinting face: eyes closed in absolute pain
      return (
        <g id="hit-face">
          {/* Squint / Pain eyes */}
          <g stroke="#111827" strokeWidth="5.5" strokeLinecap="round" fill="none">
            <path d="M 268 114 L 286 122 L 268 130" />
            <path d="M 352 114 L 334 122 L 352 130" />
          </g>

          {/* Large purple 3D bruise patch on forehead */}
          <ellipse cx="300" cy="85" rx="20" ry="12" fill="url(#bruise-gradient)" />
          <path d="M 288 80 L 312 90 M 312 80 L 288 90" stroke="#4a044e" strokeWidth="2.5" strokeLinecap="round" />

          {/* Exploding anger veins popping */}
          <path d="M 370 80 Q 382 74 382 62 M 374 68 Q 386 68 392 74" stroke="#dc2626" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M 245 80 Q 233 74 233 62 M 241 68 Q 229 68 223 74" stroke="#dc2626" strokeWidth="3.5" fill="none" strokeLinecap="round" />

          {/* Flying sweat droplets */}
          <path d="M 226 108 Q 212 116 226 124 C 230 118 230 112 226 108" fill="#38bdf8" />
          <path d="M 394 108 Q 408 116 394 124 C 390 118 390 112 394 108" fill="#38bdf8" />

          {/* Screaming open mouth */}
          <ellipse cx="310" cy="168" rx="24" ry="18" fill={config.expressionColor} stroke="#111827" strokeWidth="4" />
          {/* Teeth shaking in fear */}
          <path d="M 292 161 Q 310 170 328 161" fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
          {/* Swollen cheek outlines */}
          <path d="M 230 155 Q 216 172 230 189" fill="none" stroke="#f43f5e" strokeWidth="2.5" />
        </g>
      );
    }

    // Normal Smug / Tyrannical expression
    return (
      <g id="normal-face">
        {/* Arrogant condescending eyebrows */}
        <path d="M 258 100 Q 280 86 296 102" stroke="#111827" strokeWidth="5.5" fill="none" strokeLinecap="round" />
        <path d="M 362 100 Q 340 86 324 102" stroke="#111827" strokeWidth="5.5" fill="none" strokeLinecap="round" />

        {/* Smug, heavy-lidded eyes with real glassy depth */}
        <g fill="#111827">
          <ellipse cx="278" cy="116" rx="9.5" ry="7" />
          <ellipse cx="342" cy="116" rx="9.5" ry="7" />
          {/* Highlight shine */}
          <circle cx="280.5" cy="113.5" r="3.2" fill="#ffffff" />
          <circle cx="344.5" cy="113.5" r="3.2" fill="#ffffff" />
        </g>

        {/* Luxury glasses with 3D gold/chrome look */}
        {config.glassesColor && (
          <g>
            {/* Glossy glasses rim */}
            <rect x="256" y="100" width="44" height="30" rx="7" stroke={config.glassesColor} strokeWidth="4.5" fill="none" filter="url(#shadow-3d)" />
            <rect x="320" y="100" width="44" height="30" rx="7" stroke={config.glassesColor} strokeWidth="4.5" fill="none" filter="url(#shadow-3d)" />
            {/* Bridge */}
            <line x1="300" y1="114" x2="320" y2="114" stroke={config.glassesColor} strokeWidth="4.5" />
            {/* Temple pieces */}
            <line x1="256" y1="114" x2="242" y2="114" stroke={config.glassesColor} strokeWidth="3" />
            <line x1="364" y1="114" x2="378" y2="114" stroke={config.glassesColor} strokeWidth="3" />
            {/* Glass reflection shines */}
            <path d="M 262 124 L 280 104" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.7" />
            <path d="M 326 124 L 344 104" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.7" />
          </g>
        )}

        {/* Arrogant mouth */}
        {boss.avatarStyle === "patient" ? (
          <path d="M 288 165 Q 310 148 332 165" stroke="#111827" strokeWidth="5.5" fill="none" strokeLinecap="round" />
        ) : boss.avatarStyle === "scheduler" ? (
          <line x1="290" y1="160" x2="330" y2="160" stroke="#111827" strokeWidth="5.5" strokeLinecap="round" />
        ) : (
          <path d="M 288 156 Q 315 174 334 150" stroke="#111827" strokeWidth="6" fill="none" strokeLinecap="round" />
        )}

        {/* Popping anger veins */}
        <path d="M 248 83 Q 239 83 242 75" stroke="#dc2626" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
    );
  };

  // Render 3D Opponent Structures
  const renderOpponentStructure = () => {
    switch (boss.avatarStyle) {
      case "director":
        return (
          <>
            {/* Suit shoulders */}
            <path d="M 210 280 C 210 215 250 205 310 205 C 370 205 410 215 410 280 Z" fill={config.suitGradient} stroke="#111827" strokeWidth="4.5" />
            {/* Red necktie */}
            <polygon points="304,225 316,225 323,280 310,295 297,280" fill="url(#tie-gradient)" stroke="#111827" strokeWidth="2.5" />
            {/* Lab coat lapels */}
            <path d="M 242 210 L 278 245 L 268 280" fill="none" stroke="#111827" strokeWidth="4" />
            <path d="M 378 210 L 342 245 L 352 280" fill="none" stroke="#111827" strokeWidth="4" />
            {/* Director's gold badge */}
            <rect x="245" y="225" width="24" height="16" rx="3" fill="url(#gold-gradient)" stroke="#d97706" strokeWidth="1.5" />
            <line x1="249" y1="231" x2="265" y2="231" stroke="#111827" strokeWidth="2" />
            
            {/* Head Ears with 3D shading */}
            <circle cx="234" cy="135" r="16" fill={config.skinGradient} stroke="#111827" strokeWidth="4" />
            <circle cx="386" cy="135" r="16" fill={config.skinGradient} stroke="#111827" strokeWidth="4" />
            
            {/* Main Head */}
            <ellipse cx="310" cy="130" rx="74" ry="62" fill={config.skinGradient} stroke="#111827" strokeWidth="4.5" />

            {/* Combover hair */}
            <g fill={config.hairGradient} stroke="#111827" strokeWidth="3.5">
              <path d="M 230 100 C 226 62 265 42 295 45 C 278 49 238 72 230 100 Z" />
              <path d="M 390 100 C 394 62 355 42 325 45 C 342 49 382 72 390 100 Z" />
              <path d="M 242 68 Q 310 52 378 68" fill="none" stroke={config.hairGradient} strokeWidth="4" strokeLinecap="round" />
              <path d="M 248 76 Q 310 60 372 76" fill="none" stroke={config.hairGradient} strokeWidth="3.5" strokeLinecap="round" />
            </g>
          </>
        );
      case "compliance":
        return (
          <>
            {/* Administrative dark jacket */}
            <path d="M 210 280 C 210 210 250 195 310 195 C 370 195 410 210 410 280 Z" fill={config.suitGradient} stroke="#111827" strokeWidth="4.5" />
            <polygon points="272,195 348,195 310,232" fill="#f8fafc" stroke="#111827" strokeWidth="2" />
            {/* Strict striped blue tie */}
            <polygon points="305,215 315,215 321,280 310,295 299,280" fill="url(#tie-blue-gradient)" stroke="#111827" strokeWidth="2.5" />
            
            {/* Head ears */}
            <circle cx="234" cy="135" r="15" fill={config.skinGradient} stroke="#111827" strokeWidth="4" />
            <circle cx="386" cy="135" r="15" fill={config.skinGradient} stroke="#111827" strokeWidth="4" />
            
            {/* Head */}
            <ellipse cx="310" cy="130" rx="74" ry="62" fill={config.skinGradient} stroke="#111827" strokeWidth="4.5" />

            {/* Slick black hair with reflection */}
            <g fill={config.hairGradient} stroke="#111827" strokeWidth="3.5">
              <path d="M 230 95 C 223 36 280 24 310 28 C 340 24 397 36 390 95 C 377 62 350 38 310 41 C 270 38 243 62 230 95 Z" />
            </g>
          </>
        );
      case "patient":
        return (
          <>
            {/* Angered casual red sweater shoulders */}
            <path d="M 215 280 C 215 210 255 200 310 200 C 365 200 405 210 405 280 Z" fill={config.suitGradient} stroke="#111827" strokeWidth="4.5" />
            {/* Large gold pendant / complaint certificate */}
            <circle cx="310" cy="248" r="16" fill="url(#gold-gradient)" stroke="#111827" strokeWidth="2.5" />
            <text x="310" y="253" fontSize="13" fontWeight="black" textAnchor="middle" fill="#78350f">诉</text>
            
            {/* Ears */}
            <circle cx="232" cy="135" r="17" fill={config.skinGradient} stroke="#111827" strokeWidth="4" />
            <circle cx="388" cy="135" r="17" fill={config.skinGradient} stroke="#111827" strokeWidth="4" />
            
            {/* Head */}
            <ellipse cx="310" cy="130" rx="76" ry="65" fill={config.skinGradient} stroke="#111827" strokeWidth="4.5" />

            {/* Messy, exploding hair */}
            <g fill={config.hairGradient} stroke="#111827" strokeWidth="3.5">
              <path d="M 230 90 Q 206 48 248 48 Q 268 16 310 36 Q 352 16 372 48 Q 414 48 390 90 C 402 68 372 58 350 68 C 310 46 270 62 230 90 Z" />
            </g>
          </>
        );
      case "scheduler":
        return (
          <>
            {/* Exhausted office uniform */}
            <path d="M 210 280 C 210 215 250 205 310 205 C 370 205 410 215 410 280 Z" fill={config.suitGradient} stroke="#111827" strokeWidth="4.5" />
            <path d="M 276 205 L 310 238 L 344 205" fill="none" stroke="#334155" strokeWidth="3.5" />
            
            {/* Ears */}
            <circle cx="234" cy="135" r="15" fill={config.skinGradient} stroke="#111827" strokeWidth="4" />
            <circle cx="386" cy="135" r="15" fill={config.skinGradient} stroke="#111827" strokeWidth="4" />
            
            {/* Long droopy head shape */}
            <path d="M 236 130 C 236 78 270 68 310 68 C 350 68 384 78 384 130 C 384 192 355 202 310 202 C 265 202 236 192 236 130 Z" fill={config.skinGradient} stroke="#111827" strokeWidth="4.5" />

            {/* Messy chaotic hair */}
            <g fill={config.hairGradient} stroke="#111827" strokeWidth="3.5">
              <path d="M 230 105 Q 216 78 238 72 Q 226 46 258 62 Q 310 52 330 62 Q 382 46 382 78 Q 397 92 390 112 C 372 82 342 78 310 80 C 270 78 243 88 230 105 Z" />
            </g>

            {/* Purple dark circles under eyes */}
            <ellipse cx="278" cy="122" rx="18" ry="11" fill="#818cf8" fillOpacity="0.38" />
            <ellipse cx="342" cy="122" rx="18" ry="11" fill="#818cf8" fillOpacity="0.38" />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center select-none cursor-pointer p-4 h-[28rem] w-full max-w-2xl mx-auto rounded-2xl bg-gradient-to-b from-slate-950/80 to-slate-900/60 border border-slate-800/40 shadow-inner">
      {/* 3D Glass Header Badges to classify WHO IS WHO */}
      <div className="absolute top-3 inset-x-4 flex justify-between gap-4 pointer-events-none z-30 font-sans">
        {/* Left Badge: DOCTOR CORPS */}
        <div className="bg-gradient-to-r from-sky-600/90 to-teal-600/90 backdrop-blur-md border border-sky-400/30 rounded-xl px-3 py-1.5 shadow-[0_4px_12px_rgba(14,165,233,0.3)] text-left flex flex-col">
          <span className="text-[10px] font-bold text-sky-100 uppercase tracking-widest leading-none">我方主力阵营</span>
          <span className="text-xs font-black text-white mt-1 flex items-center gap-1">
            🏥 坚守正义的医疗军团 <span className="text-[9px] bg-sky-400/30 px-1 py-0.5 rounded">MD</span>
          </span>
        </div>

        {/* Right Badge: TARGET OPPONENT */}
        <div className={`bg-gradient-to-r from-rose-950/90 to-red-900/90 backdrop-blur-md border rounded-xl px-3 py-1.5 shadow-lg text-right flex flex-col transition-all duration-300 ${isHit ? "border-red-500 scale-105" : "border-rose-500/30"}`}>
          <span className="text-[10px] font-bold text-rose-300 uppercase tracking-widest leading-none">被打目标 (对立面)</span>
          <span className="text-xs font-black text-white mt-1 flex items-center justify-end gap-1">
            😈 {boss.title} <span className="text-[9px] bg-rose-500/30 px-1 py-0.5 rounded text-rose-200 font-normal">{config.badgeText}</span>
          </span>
        </div>
      </div>

      {/* Target status indicators */}
      <div className="absolute top-16 left-4 bg-slate-900/95 border border-slate-800/80 rounded-lg px-2 py-1 text-[10px] font-mono text-slate-400 shadow-sm flex items-center gap-1 z-20">
        👥 盟友数: <span className="font-bold text-teal-400">{traineeCount + nurseCount + anesthetistCount + securityCount + ambulanceCount + aiCopilotCount} 位</span>
      </div>

      <div className="absolute top-16 right-4 bg-slate-900/95 border border-slate-800/80 rounded-lg px-3 py-1 text-xs font-mono text-slate-300 shadow-sm z-20">
        💪 妥协抗性: <span className="font-black text-rose-400 text-sm animate-pulse">{Math.max(0, Math.round(boss.hp))}</span> <span className="text-[10px] text-slate-500">/ {boss.maxHp}</span>
      </div>

      {/* Main Dual Character SVG / Cinematic Photo Canvas */}
      <div className="relative w-full h-[21rem] flex items-center justify-center filter drop-shadow-[0_25px_25px_rgba(0,0,0,0.7)]">
        {isCinematicMode ? (
          // ==================== CINEMATIC REAL-LIFE MODE ====================
          <div className="relative w-full h-full flex items-center justify-between gap-6 px-2">
            {/* Ambient surveillance lens effects */}
            <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden rounded-2xl border border-slate-800/80">
              {/* Scanlines layer */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0)_95%,rgba(0,0,0,0.35)_95%)] bg-[size:100%_4px] opacity-25" />
              {/* Vignette */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(2,6,23,0.65)_100%)]" />
              {/* CRT corner flash highlight */}
              <div className="absolute top-2 left-2 text-[8px] font-mono font-bold text-rose-500/80 tracking-widest flex items-center gap-1.5 uppercase">
                <span className="w-1.5 h-1.5 bg-rose-600 rounded-full animate-ping" />
                CAM-01 LIVE DIRECT
              </div>
              <div className="absolute top-2 right-2 text-[8px] font-mono font-bold text-slate-400/80 tracking-widest uppercase">
                1080P ISO-800
              </div>
            </div>

            {/* HEART MONITOR / ECG NEON PULSE LINE OVERLAY */}
            <div className="absolute inset-x-0 bottom-1 h-8 pointer-events-none z-20 overflow-hidden opacity-60">
              <svg viewBox="0 0 400 50" preserveAspectRatio="none" className="w-full h-full">
                <motion.path
                  d="M 0 25 L 120 25 L 130 10 L 140 40 L 150 20 L 160 25 L 260 25 L 270 5 L 280 45 L 290 15 L 300 25 L 400 25"
                  fill="none"
                  stroke={isHit ? "#f43f5e" : "#06b6d4"}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  animate={{
                    x: [-400, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: isHit ? 1.5 : 3,
                    ease: "linear",
                  }}
                />
              </svg>
            </div>

            {/* HEROIC CLINICAL DOCTOR (LEFT HAND CARD) */}
            <motion.div
              className="relative w-[46%] h-[19.5rem] rounded-2xl overflow-hidden border-2 border-sky-500/40 bg-slate-950 shadow-[0_0_30px_rgba(14,165,233,0.25)] flex flex-col justify-between p-3.5 z-20"
              animate={
                isHit
                  ? {
                      scale: [1, 1.05, 1],
                      rotate: [0, -3, 2, 0],
                    }
                  : {
                      y: [0, -2, 0],
                    }
              }
              transition={{ duration: 0.35 }}
            >
              <video
                src={attire === "white_coat" ? REALISTIC_DOCTOR_VIDEOS.white_coat : REALISTIC_DOCTOR_VIDEOS.scrub_suit}
                autoPlay
                loop
                muted
                playsInline
                poster={attire === "white_coat"
                  ? "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600&h=600"
                  : "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600&h=600"}
                className="absolute inset-0 w-full h-full object-cover opacity-80 grayscale-[10%] transition-all duration-300 hover:scale-105"
              />
              {/* Corner targeting indicators (HUD overlays) */}
              <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-sky-400" />
              <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-sky-400" />
              <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-sky-400" />
              <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-sky-400" />

              {/* Character Details glass label */}
              <div className="mt-auto bg-slate-950/80 backdrop-blur-md border border-sky-500/30 rounded-xl p-2 z-10 font-sans shadow-lg">
                <div className="text-[10px] font-black text-sky-400 font-mono tracking-widest uppercase">我方主治医师</div>
                <div className="text-xs font-black text-white mt-0.5 flex items-center justify-between">
                  <span>🏥 医疗军团主攻</span>
                  <span className="text-[9px] bg-sky-500/20 text-sky-300 px-1.5 py-0.5 rounded border border-sky-500/30 font-mono">LEVEL 1</span>
                </div>
              </div>
            </motion.div>

            {/* ACTIVE RECRUITED ALLIES OVERLAY */}
            <div className="absolute left-3 top-4 flex flex-col gap-2 z-30 pointer-events-none">
              {coworkers.filter(c => c.count > 0).map((ally) => (
                <motion.div
                  key={ally.id}
                  initial={{ scale: 0, x: -20 }}
                  animate={{ scale: 1, x: 0 }}
                  className="relative w-9 h-9 rounded-full border border-teal-500/60 overflow-hidden shadow-lg bg-slate-950 flex items-center justify-center pointer-events-auto"
                  title={`${ally.name} x${ally.count}`}
                >
                  <img
                    src={REALISTIC_ALLY_IMAGES[ally.id as keyof typeof REALISTIC_ALLY_IMAGES]}
                    alt={ally.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-teal-900/10" />
                  <span className="absolute -bottom-1 -right-1 bg-teal-500 text-slate-950 font-black text-[9px] px-1 rounded-tl-md border-t border-l border-slate-950 scale-90">
                    x{ally.count}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* TARGET COMPROMISE BOSS (RIGHT HAND CARD) */}
            <motion.div
              className={`relative w-[46%] h-[19.5rem] rounded-2xl overflow-hidden border-2 bg-slate-950 flex flex-col justify-between p-3.5 z-20 transition-all ${
                isHit
                  ? "border-red-500 shadow-[0_0_35px_rgba(239,68,68,0.5)] scale-95"
                  : "border-rose-500/40 shadow-[0_0_25px_rgba(244,63,94,0.2)]"
              }`}
              animate={
                isDefeated
                  ? {
                      y: [0, 20, 150],
                      rotate: [0, 8, 45],
                      opacity: [1, 0.8, 0],
                      scale: [1, 0.9, 0.4],
                      transition: { duration: 1.2, ease: "easeIn" },
                    }
                  : isHit
                  ? {
                      x: [0, -18, 14, -8, 6, 0],
                      y: [0, 8, -6, 4, 0],
                    }
                  : {
                      y: [0, 2, 0],
                    }
              }
              transition={{ duration: 0.38 }}
            >
              <video
                src={REALISTIC_BOSS_VIDEOS[boss.avatarStyle as keyof typeof REALISTIC_BOSS_VIDEOS] || REALISTIC_BOSS_VIDEOS.procedural}
                autoPlay
                loop
                muted
                playsInline
                poster={REALISTIC_BOSS_IMAGES[boss.avatarStyle as keyof typeof REALISTIC_BOSS_IMAGES] || REALISTIC_BOSS_IMAGES.procedural}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-200 ${
                  isHit ? "brightness-125 contrast-125 scale-105 sepia-[20%] hue-rotate-15" : "brightness-90 contrast-100"
                }`}
              />
              {/* Red camera targeting bracket overlays */}
              <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-red-500" />
              <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-red-500" />
              <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-red-500" />
              <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-red-500" />

              {/* Targeted Lock Symbol indicator */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-45">
                <div className="w-16 h-16 rounded-full border border-dashed border-red-500 animate-[spin_10s_linear_infinite]" />
                <div className="w-12 h-12 rounded-full border border-red-600 absolute top-2 left-2 animate-pulse" />
              </div>

              {/* RENDER DYNAMIC SWELLING TARGET BUMPS OVER PHOTO FACE */}
              {swellingBumps.map((bump) => {
                const pctX = 50 + bump.x * 24;
                const pctY = 40 + bump.y * 18;
                return (
                  <motion.div
                    key={bump.id}
                    className="absolute z-30 pointer-events-none -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                    style={{ left: `${pctX}%`, top: `${pctY}%` }}
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 1.2, 1] }}
                  >
                    <div className="w-6 h-6 rounded-full border border-red-500 animate-ping absolute opacity-60" />
                    <div className="w-5 h-5 rounded-full border border-yellow-400 bg-red-600/60 flex items-center justify-center font-bold text-[9px] text-white shadow-md">
                      🩹
                    </div>
                    <span className="text-[13px] leading-none mt-0.5 animate-bounce drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.9)]">💢</span>
                  </motion.div>
                );
              })}

              {/* Opponent Details glass label */}
              <div className="mt-auto bg-slate-950/80 backdrop-blur-md border border-rose-500/30 rounded-xl p-2 z-10 font-sans shadow-lg">
                <div className="text-[10px] font-black text-rose-400 font-mono tracking-widest uppercase">击打打击目标</div>
                <div className="text-xs font-black text-white mt-0.5 flex items-center justify-between">
                  <span className="truncate">😈 {boss.name}</span>
                  <span className="text-[9px] bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded border border-rose-500/30 font-mono shrink-0">{config.badgeText}</span>
                </div>
              </div>
            </motion.div>

            {/* DYNAMIC COMBAT INVENTORY EQUIPMENT OVERLAY (VS SLOT CENTERED) */}
            <div className="absolute inset-x-0 bottom-16 h-14 flex items-center justify-center z-30 pointer-events-none">
              <div className="bg-slate-950/95 border border-cyan-500/30 rounded-xl px-4 py-1.5 shadow-[0_0_20px_rgba(34,211,238,0.25)] flex items-center gap-3 backdrop-blur-md pointer-events-auto">
                <span className="text-[9px] font-mono font-bold text-cyan-400 uppercase tracking-widest">配备武器:</span>
                <img
                  src={REALISTIC_WEAPON_IMAGES[activeWeaponId as keyof typeof REALISTIC_WEAPON_IMAGES]}
                  alt="Weapon Icon"
                  className="w-8 h-8 rounded-lg border border-cyan-500/40 object-cover shadow-md pointer-events-auto hover:scale-110 transition-transform"
                  referrerPolicy="no-referrer"
                />
                <div className="text-left font-sans">
                  <div className="text-xs font-black text-white leading-none">
                    {activeWeaponId === "stethoscope" && "🩺 高级听诊器"}
                    {activeWeaponId === "reflex_hammer" && "🔨 膝跳反射巨锤"}
                    {activeWeaponId === "medical_records" && "📁 砖头病历夹"}
                    {activeWeaponId === "hemostatic_forceps" && "✂️ 重型止血钳"}
                    {activeWeaponId === "giant_syringe" && "💉 巨无霸针筒"}
                    {activeWeaponId === "defibrillator" && "⚡ 除颤电击仪"}
                  </div>
                  <div className="text-[9px] text-cyan-400 font-mono mt-1">
                    {activeWeaponId === "stethoscope" && "诊断打击 • 瞬时振幅: 240Hz"}
                    {activeWeaponId === "reflex_hammer" && "膝跳反震 • 物理敲击力: 350N"}
                    {activeWeaponId === "medical_records" && "文书砸击 • 密度: 1.8g/cm³"}
                    {activeWeaponId === "hemostatic_forceps" && "强力钳夹 • 压力极限: 450kPa"}
                    {activeWeaponId === "giant_syringe" && "血清透注 • 注射流速: 50ml/s"}
                    {activeWeaponId === "defibrillator" && "高压除颤 • 释放能量: 360J"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // ==================== STANDARD 3D VECTOR GRAPHICS ====================
          <svg
            viewBox="0 0 420 300"
            width="100%"
            height="100%"
            className="w-full h-full"
          >
          {/* DEFINITIONS FOR 3D GRADIENTS & EFFECTS */}
          <defs>
            {/* Shading/3D spherical skin gradients */}
            <radialGradient id="doctor-skin-3d" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#ffedd5" />
              <stop offset="60%" stopColor="#ffd1a9" />
              <stop offset="100%" stopColor="#e29562" />
            </radialGradient>
            
            <radialGradient id="director-skin-3d" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#fff0e0" />
              <stop offset="60%" stopColor="#ffd1a9" />
              <stop offset="100%" stopColor="#cca283" />
            </radialGradient>

            <radialGradient id="compliance-skin-3d" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#ffeedd" />
              <stop offset="60%" stopColor="#fed7aa" />
              <stop offset="100%" stopColor="#e0a66d" />
            </radialGradient>

            <radialGradient id="patient-skin-3d" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#ffe4e6" />
              <stop offset="60%" stopColor="#fda4af" />
              <stop offset="100%" stopColor="#e11d48" />
            </radialGradient>

            <radialGradient id="scheduler-skin-3d" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#fff7ed" />
              <stop offset="60%" stopColor="#ffedd5" />
              <stop offset="100%" stopColor="#e2b48d" />
            </radialGradient>

            <radialGradient id="ally-skin-3d" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#fff3e0" />
              <stop offset="70%" stopColor="#fed7aa" />
              <stop offset="100%" stopColor="#cd8d55" />
            </radialGradient>

            {/* 3D Clothing/Attire Gradients */}
            <linearGradient id="white-coat-3d" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="75%" stopColor="#f1f5f9" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>

            <linearGradient id="scrub-suit-3d" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#14b8a6" />
              <stop offset="70%" stopColor="#0d9488" />
              <stop offset="100%" stopColor="#115e59" />
            </linearGradient>

            <linearGradient id="director-suit-3d" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="80%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>

            <linearGradient id="compliance-suit-3d" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>

            <linearGradient id="patient-sweater-3d" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f87171" />
              <stop offset="100%" stopColor="#b91c1c" />
            </linearGradient>

            <linearGradient id="scheduler-uniform-3d" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>

            {/* Ambient Lights / Backglow */}
            <radialGradient id="doctor-backglow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="opponent-backglow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
            </radialGradient>

            {/* Shiny metallic weapon gradient */}
            <linearGradient id="chrome-3d" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="20%" stopColor="#e2e8f0" />
              <stop offset="50%" stopColor="#94a3b8" />
              <stop offset="80%" stopColor="#475569" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>

            {/* Radial hair gradients */}
            <radialGradient id="hair-director-3d" cx="50%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="80%" stopColor="#475569" />
              <stop offset="100%" stopColor="#334155" />
            </radialGradient>

            <radialGradient id="hair-compliance-3d" cx="50%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="80%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </radialGradient>

            <radialGradient id="hair-patient-3d" cx="50%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#b45309" />
              <stop offset="80%" stopColor="#78350f" />
              <stop offset="100%" stopColor="#451a03" />
            </radialGradient>

            <radialGradient id="hair-doctor-3d" cx="50%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="85%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </radialGradient>

            {/* Auxiliary Gradients */}
            <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>

            <linearGradient id="tie-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fca5a5" />
              <stop offset="50%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#991b1b" />
            </linearGradient>

            <linearGradient id="tie-blue-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#93c5fd" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>

            <linearGradient id="bandaid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fed7aa" />
              <stop offset="100%" stopColor="#fdba74" />
            </linearGradient>

            <radialGradient id="bruise-gradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#a21caf" />
              <stop offset="65%" stopColor="#c084fc" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#c084fc" stopOpacity="0" />
            </radialGradient>

            {/* Drop shadow filter */}
            <filter id="shadow-3d" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="7" stdDeviation="5" floodColor="#000000" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* ==================== BACKGROUND LIGHTING AND BASES ==================== */}
          {/* Left blue-teal backglow behind our righteous medical team */}
          <circle cx="110" cy="180" r="140" fill="url(#doctor-backglow)" />
          
          {/* Right warning red backglow behind the opponent, pulses when hit */}
          <motion.circle
            cx="310"
            cy="180"
            r="140"
            fill="url(#opponent-backglow)"
            animate={isHit ? { r: [140, 165, 140], opacity: [0.6, 1, 0.6] } : {}}
            transition={{ duration: 0.35 }}
          />

          {/* Ground shadows with 3D depth */}
          <ellipse cx="110" cy="285" rx="85" ry="14" fill="#000000" fillOpacity="0.5" />
          <ellipse cx="310" cy="285" rx="80" ry="14" fill="#000000" fillOpacity="0.5" />

          {/* Targeted lock rings underneath the opponent's feet to clarify they are the target */}
          <g transform="translate(310, 285)">
            <ellipse cx="0" cy="0" rx="68" ry="11" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="6,4" className="animate-[spin_20s_linear_infinite]" />
            <ellipse cx="0" cy="0" rx="60" ry="8" fill="none" stroke="#f43f5e" strokeWidth="1" strokeOpacity="0.6" />
            {/* Target arrows */}
            <polygon points="-58,-2 -66,0 -58,2" fill="#ef4444" />
            <polygon points="58,-2 66,0 58,2" fill="#ef4444" />
          </g>

          {/* ==================== 0. RECRUITED ALLIES / COWORKERS (TEAM PLAYERS) ==================== */}
          {/* Render them layered behind the main doctor at the left-side back */}
          <g id="righteous-allies">
            {/* Ally 1: trainee (写病历规培生) at position X=35, Y=190 */}
            {traineeCount > 0 ? (
              <g id="ally-trainee" filter="url(#shadow-3d)">
                {/* 3D Body */}
                <path d="M 15 250 C 15 210, 35 200, 55 200 C 75 200, 95 210, 95 250 Z" fill="url(#scrub-suit-3d)" stroke="#111827" strokeWidth="2.5" />
                {/* Skin Neck */}
                <rect x="47" y="176" width="16" height="12" fill="url(#ally-skin-3d)" stroke="#111827" strokeWidth="2.5" />
                {/* 3D Head */}
                <circle cx="55" cy="168" r="23" fill="url(#ally-skin-3d)" stroke="#111827" strokeWidth="2.5" />
                {/* Cute green cap */}
                <path d="M 32 160 C 32 140, 78 140, 78 160 Z" fill="#0f766e" stroke="#111827" strokeWidth="2.5" />
                {/* Nerd thick glasses */}
                <rect x="39" y="158" width="12" height="10" rx="2" stroke="#111827" strokeWidth="2" fill="none" />
                <rect x="59" y="158" width="12" height="10" rx="2" stroke="#111827" strokeWidth="2" fill="none" />
                <line x1="51" y1="163" x2="59" y2="163" stroke="#111827" strokeWidth="2" />
                {/* Happy smiling eyes */}
                <path d="M 42 165 Q 45 162 48 165" fill="none" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
                <path d="M 62 165 Q 65 162 68 165" fill="none" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
                {/* Happy open mouth */}
                <path d="M 50 176 Q 55 183 60 176" fill="none" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" />
                {/* Label badge above */}
                <rect x="35" y="128" width="40" height="13" rx="3" fill="#111827" fillOpacity="0.8" />
                <text x="55" y="138" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#2dd4bf">规培 x{traineeCount}</text>
              </g>
            ) : (
              // Silhouette Placeholder
              <g opacity="0.18">
                <circle cx="55" cy="168" r="23" fill="none" stroke="#ffffff" strokeWidth="2" strokeDasharray="4,4" />
                <path d="M 15 250 C 15 210, 95 210, 95 250 Z" fill="none" stroke="#ffffff" strokeWidth="2" strokeDasharray="4,4" />
                <text x="55" y="172" fontSize="8" textAnchor="middle" fill="#ffffff" fontWeight="bold">待招募</text>
              </g>
            )}

            {/* Ally 2: nurse (金牌带教护士姐姐) at position X=70, Y=175 */}
            {nurseCount > 0 ? (
              <g id="ally-nurse" filter="url(#shadow-3d)">
                {/* 3D Body */}
                <path d="M 50 250 C 50 212, 70 202, 90 202 C 110 202, 130 212, 130 250 Z" fill="url(#white-coat-3d)" stroke="#111827" strokeWidth="2.5" />
                <path d="M 80 202 L 90 218 L 100 202" fill="none" stroke="#ec4899" strokeWidth="2" />
                {/* Neck */}
                <rect x="82" y="176" width="16" height="12" fill="url(#ally-skin-3d)" stroke="#111827" strokeWidth="2.5" />
                {/* 3D Head */}
                <circle cx="90" cy="168" r="23" fill="url(#ally-skin-3d)" stroke="#111827" strokeWidth="2.5" />
                {/* Sparkly eyes */}
                <circle cx="81" cy="165" r="3.2" fill="#111827" />
                <circle cx="99" cy="165" r="3.2" fill="#111827" />
                <circle cx="82.5" cy="163.5" r="1.1" fill="#ffffff" />
                <circle cx="100.5" cy="163.5" r="1.1" fill="#ffffff" />
                {/* Blushing cheeks */}
                <ellipse cx="76" cy="171" rx="3.5" ry="2" fill="#f43f5e" fillOpacity="0.6" />
                <ellipse cx="104" cy="171" rx="3.5" ry="2" fill="#f43f5e" fillOpacity="0.6" />
                {/* Happy smile */}
                <path d="M 85 174 Q 90 180 95 174" fill="none" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
                {/* Classic pink/white nurse hat with red cross */}
                <path d="M 72 153 C 72 143, 108 143, 108 153 Z" fill="#ffffff" stroke="#111827" strokeWidth="2.5" />
                <path d="M 84 148 L 96 148 M 90 142 L 90 154" stroke="#dc2626" strokeWidth="2.5" />
                {/* Label badge above */}
                <rect x="70" y="120" width="40" height="13" rx="3" fill="#111827" fillOpacity="0.8" />
                <text x="90" y="130" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#f472b6">护士 x{nurseCount}</text>
              </g>
            ) : (
              // Silhouette Placeholder
              <g opacity="0.18">
                <circle cx="90" cy="168" r="23" fill="none" stroke="#ffffff" strokeWidth="2" strokeDasharray="4,4" />
                <path d="M 50 250 C 50 212, 130 212, 130 250 Z" fill="none" stroke="#ffffff" strokeWidth="2" strokeDasharray="4,4" />
              </g>
            )}

            {/* Ally 3: security (保卫科刘大哥) at position X=165, Y=240 */}
            {securityCount > 0 ? (
              <g id="ally-security" filter="url(#shadow-3d)">
                {/* Strong shoulders */}
                <path d="M 135 285 C 135 242, 155 232, 175 232 C 195 232, 215 242, 215 285 Z" fill="#1e293b" stroke="#111827" strokeWidth="3" />
                {/* Body Vest */}
                <path d="M 148 245 L 160 285 M 202 245 L 190 285" stroke="#0f172a" strokeWidth="4.5" />
                <rect x="163" y="246" width="24" height="24" rx="2" fill="#334155" stroke="#111827" strokeWidth="1.5" />
                <text x="175" y="260" fontSize="8" fontWeight="black" textAnchor="middle" fill="#cbd5e1" fontFamily="sans-serif">POLICE</text>
                {/* Neck */}
                <rect x="166" y="208" width="18" height="12" fill="url(#ally-skin-3d)" stroke="#111827" strokeWidth="3" />
                {/* Rugged head */}
                <ellipse cx="175" cy="198" r="22" fill="url(#ally-skin-3d)" stroke="#111827" strokeWidth="3" />
                {/* Security uniform blue cap */}
                <path d="M 151 184 C 151 168, 199 168, 199 184 Z" fill="#0f172a" stroke="#111827" strokeWidth="3" />
                <ellipse cx="175" cy="172" rx="14" ry="4" fill="#1e293b" stroke="#111827" strokeWidth="2" />
                {/* Tiny security badge */}
                <polygon points="175,172 179,178 175,182 171,178" fill="url(#gold-gradient)" />
                {/* Determined angry eyes */}
                <path d="M 161 192 L 171 195" stroke="#111827" strokeWidth="3" strokeLinecap="round" />
                <path d="M 189 192 L 179 195" stroke="#111827" strokeWidth="3" strokeLinecap="round" />
                <ellipse cx="166" cy="198" rx="2.5" ry="3.5" fill="#111827" />
                <ellipse cx="184" cy="198" rx="2.5" ry="3.5" fill="#111827" />
                {/* Determined tough mouth */}
                <line x1="168" y1="210" x2="182" y2="210" stroke="#111827" strokeWidth="3.5" strokeLinecap="round" />
                {/* Label badge above */}
                <rect x="155" y="142" width="40" height="13" rx="3" fill="#111827" fillOpacity="0.8" />
                <text x="175" y="152" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#60a5fa">保卫 x{securityCount}</text>
              </g>
            ) : (
              // Silhouette Placeholder
              <g opacity="0.18">
                <ellipse cx="175" cy="198" rx="22" ry="22" fill="none" stroke="#ffffff" strokeWidth="2" strokeDasharray="4,4" />
                <path d="M 135 285 C 135 242, 215 242, 215 285 Z" fill="none" stroke="#ffffff" strokeWidth="2" strokeDasharray="4,4" />
              </g>
            )}

            {/* Ally 4: anesthetist (加深麻醉陈老法师) at position X=45, Y=235 */}
            {anesthetistCount > 0 ? (
              <g id="ally-anesthetist" filter="url(#shadow-3d)">
                {/* Body */}
                <path d="M 20 280 C 20 240, 40 230, 60 230 C 80 230, 100 240, 100 280 Z" fill="#1e3a8a" stroke="#111827" strokeWidth="2.5" />
                {/* Neck */}
                <rect x="52" y="206" width="16" height="12" fill="url(#ally-skin-3d)" stroke="#111827" strokeWidth="2.5" />
                {/* 3D Head */}
                <circle cx="60" cy="198" r="21" fill="url(#ally-skin-3d)" stroke="#111827" strokeWidth="2.5" />
                {/* Sleep mask */}
                <rect x="42" y="190" width="36" height="10" rx="4" fill="#3b82f6" stroke="#111827" strokeWidth="2" />
                <circle cx="51" cy="195" r="2.5" fill="#ffffff" />
                <circle cx="69" cy="195" r="2.5" fill="#ffffff" />
                <path d="M 45 195 L 35 195 M 77 195 L 85 195" stroke="#111827" strokeWidth="1.5" />
                {/* Sleepy zzz floating */}
                <text x="80" y="180" fontSize="10" fontWeight="bold" fill="#3b82f6" className="animate-bounce">Zzz</text>
                {/* Label badge above */}
                <rect x="40" y="152" width="40" height="13" rx="3" fill="#111827" fillOpacity="0.8" />
                <text x="60" y="162" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#6366f1">麻醉 x{anesthetistCount}</text>
              </g>
            ) : null}

            {/* Ally 5: ambulance (120急救拉人车队) at position X=195, Y=190 */}
            {ambulanceCount > 0 ? (
              <g id="ally-ambulance" filter="url(#shadow-3d)">
                {/* Draw a super cute 3D cartoon ambulance cab backing up */}
                <rect x="180" y="195" width="34" height="26" rx="6" fill="#ffffff" stroke="#111827" strokeWidth="2.5" />
                {/* Blue windshield */}
                <rect x="184" y="200" width="15" height="10" rx="2" fill="#38bdf8" stroke="#111827" strokeWidth="1.5" />
                {/* Red cross emblem */}
                <path d="M 205 204 L 211 204 M 208 201 L 208 207" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" />
                {/* Flashing red beacon light */}
                <circle cx="197" cy="192" r="4.5" fill="#ef4444" stroke="#111827" strokeWidth="1.5" />
                <path d="M 197 186 L 197 190 M 192 192 L 195 192" stroke="#ef4444" strokeWidth="1" />
                {/* Wheels */}
                <circle cx="188" cy="221" r="5" fill="#1e293b" stroke="#111827" strokeWidth="2" />
                <circle cx="206" cy="221" r="5" fill="#1e293b" stroke="#111827" strokeWidth="2" />
                {/* Label badge above */}
                <rect x="177" y="172" width="40" height="13" rx="3" fill="#111827" fillOpacity="0.8" />
                <text x="197" y="182" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#f87171">120车 x{ambulanceCount}</text>
              </g>
            ) : null}

            {/* Ally 6: ai_copilot (医学论文 AI 润色助手) - floats in the upper left background sky */}
            {aiCopilotCount > 0 && (
              <g id="ally-ai-copilot">
                <motion.g
                  animate={{
                    y: [0, -8, 0],
                    rotate: [0, 8, -8, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut",
                  }}
                  transform="translate(110, 60)"
                >
                  {/* Glowing core orbital rings */}
                  <ellipse cx="0" cy="0" rx="32" ry="10" fill="none" stroke="#22d3ee" strokeWidth="1.8" strokeDasharray="5,3" className="animate-[spin_6s_linear_infinite]" />
                  {/* Floating AI metallic sphere */}
                  <circle cx="0" cy="0" r="15" fill="url(#chrome-3d)" stroke="#0891b2" strokeWidth="2.5" filter="url(#shadow-3d)" />
                  {/* Glowing single cyan holographic eye */}
                  <circle cx="0" cy="-2" r="5" fill="#22d3ee" className="animate-pulse" />
                  <circle cx="0" cy="-2" r="1.5" fill="#ffffff" />
                  {/* Floating magic sparkles */}
                  <path d="M -16 -16 L -12 -16 M -14 -18 L -14 -14" stroke="#22d3ee" strokeWidth="1.5" />
                  <path d="M 16 -12 L 20 -12 M 18 -14 L 18 -10" stroke="#f43f5e" strokeWidth="1.5" />
                  {/* Label tag */}
                  <rect x="-24" y="16" width="48" height="12" rx="3" fill="#0f172a" fillOpacity="0.85" stroke="#0891b2" strokeWidth="1" />
                  <text x="0" y="25" fontSize="7" fontWeight="bold" textAnchor="middle" fill="#22d3ee">AI 润色 x{aiCopilotCount}</text>
                </motion.g>
              </g>
            )}
          </g>

          {/* ==================== 1. HEROIC DOCTOR (LEFT SIDE FOREGROUND) ==================== */}
          <g id="heroic-doctor" filter="url(#shadow-3d)">
            {/* Doctor's 3D body / outfit */}
            <path
              d="M 40 280 C 40 215 70 205 110 205 C 150 205 180 215 180 280 Z"
              fill={attire === "white_coat" ? "url(#white-coat-3d)" : "url(#scrub-suit-3d)"}
              stroke="#111827"
              strokeWidth="4.5"
            />
            {/* Blue scrubs shirt underneath white coat */}
            {attire === "white_coat" && (
              <>
                <polygon points="90,205 130,205 110,230" fill="url(#scrub-suit-3d)" stroke="#111827" strokeWidth="2.5" />
                {/* Lab coat lapels */}
                <path d="M 72 210 L 98 244 L 90 280" fill="none" stroke="#111827" strokeWidth="4" />
                <path d="M 148 210 L 122 244 L 130 280" fill="none" stroke="#111827" strokeWidth="4" />
                {/* Metallic pen in pocket */}
                <rect x="64" y="226" width="5" height="15" rx="1.5" fill="url(#chrome-3d)" stroke="#111827" strokeWidth="1" />
                <rect x="60" y="232" width="13" height="2" fill="#94a3b8" />
              </>
            )}

            {/* Doctor badge (MD) with glossy gold trim */}
            <rect x="142" y="222" width="24" height="16" rx="3" fill="url(#gold-gradient)" stroke="#b45309" strokeWidth="1" />
            <text x="154" y="233" fontSize="9" fontWeight="black" textAnchor="middle" fill="#78350f" fontFamily="monospace">MD</text>

            {/* Doctor's neck */}
            <rect x="96" y="170" width="28" height="24" fill="url(#doctor-skin-3d)" stroke="#111827" strokeWidth="4" />
            <path d="M 96 182 Q 110 190 124 182" fill="none" stroke="#d97706" strokeWidth="2.5" />

            {/* Stethoscope around neck */}
            <path d="M 82 190 Q 110 216 138 190" fill="none" stroke="#475569" strokeWidth="4.5" strokeLinecap="round" />

            {/* Doctor's head ears */}
            <circle cx="56" cy="135" r="12" fill="url(#doctor-skin-3d)" stroke="#111827" strokeWidth="4" />
            <circle cx="164" cy="135" r="12" fill="url(#doctor-skin-3d)" stroke="#111827" strokeWidth="4" />

            {/* Doctor's head with 3D gradient */}
            <ellipse cx="110" cy="130" rx="54" ry="48" fill="url(#doctor-skin-3d)" stroke="#111827" strokeWidth="4.5" />

            {/* Resolute, focused anime eyes */}
            <g fill="#111827">
              <path d="M 78 114 Q 92 102 100 112" stroke="#111827" strokeWidth="4.5" fill="none" strokeLinecap="round" />
              <path d="M 142 114 Q 128 102 120 112" stroke="#111827" strokeWidth="4.5" fill="none" strokeLinecap="round" />
              <ellipse cx="88" cy="120" rx="5.5" ry="6.5" />
              <ellipse cx="132" cy="120" rx="5.5" ry="6.5" />
              {/* Determined glint */}
              <circle cx="89.5" cy="118.5" r="2.2" fill="#ffffff" />
              <circle cx="133.5" cy="118.5" r="2.2" fill="#ffffff" />
            </g>

            {/* Surgical mask */}
            <path d="M 70 126 C 70 154, 150 154, 150 126 Z" fill="url(#white-coat-3d)" stroke="#111827" strokeWidth="4" />
            <path d="M 70 135 L 150 135" stroke="#38bdf8" strokeWidth="2.5" />
            {/* Mask ear loops */}
            <path d="M 70 130 C 60 130, 56 135, 56 135" fill="none" stroke="#111827" strokeWidth="2" />
            <path d="M 150 130 C 160 130, 164 135, 164 135" fill="none" stroke="#111827" strokeWidth="2" />

            {/* Hair / Headwear */}
            {attire === "white_coat" ? (
              <>
                {/* Swept black hair with 3D gradient */}
                <path d="M 56 114 C 50 68, 110 48, 110 48 C 110 48, 170 68, 164 114 C 150 90, 125 76, 110 80 C 95 76, 70 90, 56 114 Z" fill="url(#hair-doctor-3d)" stroke="#111827" strokeWidth="4" />
                {/* Doctor's Forehead Reflector Mirror */}
                <path d="M 82 90 Q 110 82 138 90" fill="none" stroke="#475569" strokeWidth="3.5" />
                <circle cx="110" cy="90" r="12" fill="url(#chrome-3d)" stroke="#334155" strokeWidth="2.5" />
                <circle cx="110" cy="90" r="5" fill="#ffffff" />
              </>
            ) : (
              <>
                {/* Teal surgical cap covering hair */}
                <path d="M 56 115 C 46 74, 80 58, 110 58 C 140 58, 174 74, 164 115 Z" fill="url(#scrub-suit-3d)" stroke="#111827" strokeWidth="4" />
                <rect x="94" y="54" width="32" height="6" rx="2.5" fill="#0f766e" />
              </>
            )}

            {/* Left Arm resting confidently on hip */}
            <path d="M 42 225 Q 16 245, 28 266" fill="none" stroke={attire === "white_coat" ? "url(#white-coat-3d)" : "url(#scrub-suit-3d)"} strokeWidth="15" strokeLinecap="round" />
            <path d="M 42 225 Q 16 245, 28 266" fill="none" stroke="#111827" strokeWidth="19" strokeLinecap="round" style={{ zIndex: -1 }} />
            <circle cx="28" cy="266" r="8.5" fill="url(#doctor-skin-3d)" stroke="#111827" strokeWidth="3" />

            {/* ==================== SWINGING RIGHT ARM & ACTIVE WEAPON ==================== */}
            <motion.g
              animate={
                isHit
                  ? {
                      // High-impact power slash swing
                      rotate: [0, -42, 32, 0],
                      x: [0, -15, 38, 0],
                      y: [0, -10, -14, 0],
                    }
                  : {
                      y: [0, -3, 0],
                      transition: { repeat: Infinity, duration: 2, ease: "easeInOut" },
                    }
              }
              style={{ transformOrigin: "140px 210px" }}
              className="z-40"
            >
              {/* Arm sleeve reaching out */}
              <path
                d="M 135 205 L 182 185 L 192 205 L 145 225 Z"
                fill={attire === "white_coat" ? "url(#white-coat-3d)" : "url(#scrub-suit-3d)"}
                stroke="#111827"
                strokeWidth="4"
              />
              {/* Clenched fist with 3D shadow */}
              <circle cx="188" cy="195" r="10" fill="url(#doctor-skin-3d)" stroke="#111827" strokeWidth="3" />

              {/* STETHOSCOPE WEAPON (高级听诊器) */}
              {activeWeaponId === "stethoscope" && (
                <g>
                  {/* Dangling flexible tube */}
                  <path
                    d="M 188 195 C 205 210, 218 240, 245 195"
                    fill="none"
                    stroke="#334155"
                    strokeWidth="5.5"
                    strokeLinecap="round"
                  />
                  {/* Heavy metallic chestpiece */}
                  <circle cx="245" cy="195" r="13" fill="url(#chrome-3d)" stroke="#111827" strokeWidth="3" />
                  <circle cx="245" cy="195" r="7" fill="#ffffff" />
                </g>
              )}

              {/* KNEE REFLEX HAMMER (膝跳反射巨型打狗锤) */}
              {activeWeaponId === "reflex_hammer" && (
                <g>
                  {/* Long chrome handle */}
                  <line x1="188" y1="195" x2="242" y2="152" stroke="url(#chrome-3d)" strokeWidth="6.5" strokeLinecap="round" />
                  {/* Giant 3D red rubber hammer head */}
                  <polygon
                    points="230,136 260,130, 248,166"
                    fill="url(#tie-gradient)"
                    stroke="#111827"
                    strokeWidth="3.5"
                  />
                  {/* Highlight shine */}
                  <line x1="238" y1="142" x2="248" y2="140" stroke="#fca5a5" strokeWidth="2.5" />
                </g>
              )}

              {/* MEDICAL RECORDS CLIPBOARD (砖头病历夹) */}
              {activeWeaponId === "medical_records" && (
                <g transform="rotate(-15, 188, 195)">
                  {/* Heavy blue backboard */}
                  <rect x="188" y="160" width="40" height="54" rx="4" fill="url(#tie-blue-gradient)" stroke="#111827" strokeWidth="3.5" />
                  {/* Papers */}
                  <rect x="193" y="166" width="31" height="43" fill="#ffffff" stroke="#111827" strokeWidth="1.8" />
                  <line x1="198" y1="176" x2="214" y2="176" stroke="#94a3b8" strokeWidth="2" />
                  <line x1="198" y1="184" x2="218" y2="184" stroke="#94a3b8" strokeWidth="2" />
                  {/* Metal clamp */}
                  <rect x="199" y="154" width="18" height="9" fill="url(#chrome-3d)" stroke="#111827" strokeWidth="2.5" />
                </g>
              )}

              {/* HEMOSTATIC FORCEPS (重型止血钳) */}
              {activeWeaponId === "hemostatic_forceps" && (
                <g>
                  {/* Ring handles */}
                  <circle cx="180" cy="198" r="7" fill="none" stroke="url(#chrome-3d)" strokeWidth="3.5" />
                  <circle cx="184" cy="204" r="7" fill="none" stroke="url(#chrome-3d)" strokeWidth="3.5" />
                  {/* Forceps shafts */}
                  <line x1="188" y1="195" x2="248" y2="165" stroke="url(#chrome-3d)" strokeWidth="5.5" />
                  {/* Double lock teeth */}
                  <path d="M 248 165 C 258 159, 270 162, 274 160 M 248 165 C 258 171, 270 168, 274 170" fill="none" stroke="url(#chrome-3d)" strokeWidth="3.5" />
                </g>
              )}

              {/* GIANT SYRINGE (巨无霸不锈钢针筒) */}
              {activeWeaponId === "giant_syringe" && (
                <g transform="rotate(-15, 188, 195)">
                  {/* Cylinder barrel */}
                  <rect x="185" y="184" width="60" height="24" rx="3" fill="#e2e8f0" stroke="#111827" strokeWidth="3.5" fillOpacity="0.85" />
                  {/* Fluorescent medical pink potion */}
                  <rect x="191" y="188" width="41" height="17" fill="#f43f5e" />
                  <line x1="200" y1="188" x2="200" y2="205" stroke="#fbcfe8" strokeWidth="2" />
                  <line x1="215" y1="188" x2="215" y2="205" stroke="#fbcfe8" strokeWidth="2" />
                  {/* Plunger handle */}
                  <line x1="185" y1="196" x2="163" y2="196" stroke="#475569" strokeWidth="4.5" />
                  <circle cx="163" cy="196" r="8" fill="none" stroke="url(#chrome-3d)" strokeWidth="3" />
                  {/* Long steel needle tip */}
                  <line x1="245" y1="196" x2="278" y2="196" stroke="url(#chrome-3d)" strokeWidth="4" />
                </g>
              )}

              {/* DEFIBRILLATOR PADDLES (雷电导电除颤仪) */}
              {activeWeaponId === "defibrillator" && (
                <g>
                  {/* Yellow charge paddle block */}
                  <rect x="185" y="172" width="46" height="36" rx="5" fill="url(#gold-gradient)" stroke="#111827" strokeWidth="3.5" />
                  {/* Contact metal plates */}
                  <rect x="231" y="177" width="9" height="26" fill="url(#chrome-3d)" stroke="#111827" strokeWidth="2.5" />
                  {/* Paddle handle bar */}
                  <path d="M 194 172 Q 207 154, 220 172" fill="none" stroke="#111827" strokeWidth="5" />
                  <text x="208" y="194" fontSize="9" fontWeight="black" fill="#ffffff" textAnchor="middle" fontFamily="sans-serif">360J</text>
                  {/* High tension electrical cables */}
                  <path d="M 185 189 Q 165 198 145 225" fill="none" stroke="#dc2626" strokeWidth="4" strokeDasharray="3,3" />
                  {/* Electric sparks */}
                  {isHit && (
                    <path d="M 235 170 L 255 174 L 242 188 L 260 192 L 244 204 L 254 212" fill="none" stroke="#22d3ee" strokeWidth="3.5" strokeLinecap="round" />
                  )}
                </g>
              )}
            </motion.g>
          </g>

          {/* ==================== 2. THE OPPRESSOR / OPPONENT (RIGHT SIDE FOREGROUND) ==================== */}
          <g id="oppressive-opponent">
            <motion.g
              animate={
                isDefeated
                  ? {
                      // Dizzy tumbling and falling down
                      y: [0, 6, -3, 10, 110],
                      rotate: [0, 5, -5, 8, 90],
                      scale: [1, 1, 0.95, 0.9, 0.5],
                      opacity: [1, 1, 1, 0.8, 0],
                      transition: { duration: 1.5, ease: "easeIn" },
                    }
                  : isHit
                  ? {
                      // Elastic 3D comic deforming on impact
                      scaleX: [1, 1.48, 0.62, 1.28, 0.82, 1.1, 1.0],
                      scaleY: [1, 0.58, 1.42, 0.78, 1.18, 0.9, 1.0],
                      skewX: [0, 20, -16, 10, -5, 2, 0],
                      skewY: [0, -11, 13, -7, 3, -1, 0],
                      transition: { duration: 0.45, ease: "easeInOut" },
                    }
                  : {
                      y: [0, -5, 0],
                      scaleY: [1, 1.018, 1],
                      transition: { repeat: Infinity, duration: 4.2, ease: "easeInOut" },
                    }
              }
              style={{ transformOrigin: "310px 240px" }}
              filter="url(#shadow-3d)"
            >
              {/* Chosen boss 3D structure */}
              {renderOpponentStructure()}

              {/* Neck */}
              <rect x="294" y="170" width="32" height="30" fill={config.skinGradient} stroke="#111827" strokeWidth="4.5" />
              <path d="M 294 188 Q 310 198 326 188" fill="none" stroke="#d97706" strokeWidth="3" />

              {/* Stern Cartoon Nose with highlights */}
              <path d="M 310 124 Q 299 144 310 144 Q 315 144 312 136" fill="none" stroke="#111827" strokeWidth="5" strokeLinecap="round" />

              {/* Face details (normal, hit, defeated) */}
              {renderFaceDetails()}

              {/* Render Swelling Bumps (局部肿包) in glorious 3D */}
              {swellingBumps.map((bump) => {
                const bx = 310 + bump.x * 52;
                const by = 130 + bump.y * 42;
                
                return (
                  <g key={bump.id} className="pointer-events-none">
                    {/* Swelling 3D dome */}
                    <ellipse
                      cx={bx}
                      cy={by}
                      rx={bump.size}
                      ry={bump.size * 0.78}
                      fill="url(#tie-gradient)" // Deep shiny red gradient
                      stroke="#9f1239"
                      strokeWidth="3"
                    />
                    
                    {/* Bruise shadow center */}
                    <ellipse
                      cx={bx - 1.5}
                      cy={by + 2}
                      rx={bump.size * 0.65}
                      ry={bump.size * 0.45}
                      fill="#4c0519"
                      fillOpacity="0.4"
                    />

                    {/* White highlight gloss spot on swell */}
                    <circle
                      cx={bx - bump.size * 0.3}
                      cy={by - bump.size * 0.25}
                      r={bump.size * 0.2}
                      fill="#ffffff"
                      fillOpacity="0.8"
                    />

                    {/* Medical white adhesive plaster */}
                    <path
                      d={`M ${bx - bump.size * 0.5} ${by} L ${bx + bump.size * 0.5} ${by} M ${bx} ${by - bump.size * 0.5} L ${bx} ${by + bump.size * 0.5}`}
                      stroke="#ffedd5"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />

                    {/* Rotating anger symbol spark */}
                    <motion.text
                      x={bx + bump.size * 0.8}
                      y={by - bump.size * 0.8}
                      fontSize="16"
                      className="font-bold select-none"
                      animate={{
                        scale: [1, 1.4, 1],
                        rotate: [0, 45, -45, 0],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.2,
                      }}
                    >
                      💢
                    </motion.text>
                  </g>
                );
              })}
            </motion.g>
          </g>

          {/* ==================== COLLISION IMPACT STARBURSTS ==================== */}
          {isHit && !isDefeated && (
            <motion.g
              initial={{ scale: 0.2, opacity: 1 }}
              animate={{ scale: [1, 1.6, 0], opacity: [1, 1, 0] }}
              transition={{ duration: 0.35 }}
              transform="translate(230, 160)"
            >
              {/* Heavy gold slashing lines */}
              <path d="M -60 -60 L 60 60" stroke="url(#gold-gradient)" strokeWidth="10" strokeLinecap="round" />
              <path d="M -60 -60 L 60 60" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
              <path d="M 60 -60 L -60 60" stroke="url(#gold-gradient)" strokeWidth="7" strokeLinecap="round" />
              {/* Electric blue impact rings */}
              <circle cx="0" cy="0" r="30" fill="none" stroke="#22d3ee" strokeWidth="4" />
              {/* Crimson impact sparks */}
              <path d="M -35 25 L -15 5 L -50 -15" fill="none" stroke="#f43f5e" strokeWidth="4" strokeLinecap="round" />
              <path d="M 15 -30 L 35 5 L 10 35" fill="none" stroke="#f43f5e" strokeWidth="4" strokeLinecap="round" />
            </motion.g>
          )}
        </svg>
        )}

        {/* Floating cartoon blast label on Hit */}
        {isHit && !isDefeated && (
          <div className="absolute top-1/3 left-1/2 -translate-x-12 -translate-y-12 pointer-events-none z-50">
            <motion.div
              initial={{ scale: 0.3, rotate: -20 }}
              animate={{ scale: [1.3, 1.6, 0], rotate: [-15, 20, 40] }}
              transition={{ duration: 0.38 }}
              className="text-amber-400 text-7xl drop-shadow-[0_0_25px_rgba(245,158,11,1)] font-black italic select-none flex flex-col items-center"
            >
              💥
              <span className="text-xs bg-red-600 border border-yellow-400 text-yellow-300 px-2 py-0.5 rounded font-black tracking-widest mt-1 uppercase scale-90 shadow-lg">CRITICAL IMPACT</span>
            </motion.div>
          </div>
        )}
      </div>

      {/* Interactive Dialogue Bubbles */}
      <div className="mt-3 min-h-[4.5rem] flex items-center justify-center text-center w-full px-4 z-10">
        {!isDefeated && (
          <motion.div
            key={isHit ? "hit" : "normal"}
            initial={{ opacity: 0, scale: 0.9, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className={`px-4 py-2.5 rounded-2xl shadow-xl border relative max-w-xs font-semibold text-sm transition-colors ${
              isHit
                ? "bg-rose-950 text-rose-100 border-rose-800 shadow-rose-900/20"
                : attire === "white_coat"
                ? "bg-slate-900/95 text-slate-100 border-sky-900/80 shadow-sky-950/20"
                : "bg-slate-900/95 text-slate-100 border-teal-900/80 shadow-teal-950/20"
            }`}
          >
            {isHit
              ? boss.hitDialogues[Math.floor(Math.random() * boss.hitDialogues.length)]
              : boss.dialogues[Math.floor(Math.random() * boss.dialogues.length)]}
            {/* Speech bubble arrow pointer */}
            <div
              className={`absolute top-[-8px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 ${
                isHit
                  ? "border-b-rose-950"
                  : "border-b-slate-900"
              }`}
            />
          </motion.div>
        )}
        {isDefeated && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-5 py-3 bg-emerald-950 text-emerald-100 border border-emerald-800 rounded-2xl shadow-xl relative max-w-xs font-bold text-sm shadow-emerald-950/20"
          >
            😭 {boss.defeatDialogues[Math.floor(Math.random() * boss.defeatDialogues.length)]}
            <div className="absolute top-[-8px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-emerald-950" />
          </motion.div>
        )}
      </div>
    </div>
  );
};
