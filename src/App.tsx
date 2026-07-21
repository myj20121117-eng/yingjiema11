import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  Award,
  Zap,
  TrendingUp,
  Heart,
  Calendar,
  DollarSign,
  Activity,
  ShieldCheck,
  Stethoscope
} from "lucide-react";

import { Boss, Weapon, Coworker, ClickEffect, ParticleEffect, GameStats, SwellingBump } from "./types";
import { BossCharacter } from "./components/BossCharacter";
import { OfficeBackground } from "./components/OfficeBackground";
import { WeaponSelector } from "./components/WeaponSelector";
import { CoworkerManager } from "./components/CoworkerManager";
import { VentingConsole } from "./components/VentingConsole";
import { BrandBanner } from "./components/BrandBanner";
import {
  playSlap,
  playPunch,
  playCrash,
  playCoin,
  playUpgrade,
  playVictoryFanfare,
  playBossOuch,
  playElectro,
  toggleMute,
  getMuteStatus
} from "./utils/audio";

// Initial Medical-Themed Weapons Configuration
const INITIAL_WEAPONS: Weapon[] = [
  {
    id: "stethoscope",
    name: "高级听诊器狂甩",
    description: "经典3M听诊器！皮实耐用，甩起来宛如飞龙在天，啪啪作响！",
    cost: 0,
    damage: 1,
    unlocked: true,
    icon: "Activity",
    soundType: "slap",
  },
  {
    id: "reflex_hammer",
    name: "膝跳反射小药锤",
    description: "经典医用橡胶小红锤！敲击膝跳反射，今晚就来测测你脑袋的弹性！",
    cost: 160,
    damage: 9,
    unlocked: false,
    icon: "Hammer",
    soundType: "punch",
  },
  {
    id: "medical_records",
    name: "砖头病历夹狂扇",
    description: "厚重如砖的精装病历夹！劈头盖脸的一顿狂扇，释放压抑的洪荒之力！",
    cost: 850,
    damage: 42,
    unlocked: false,
    icon: "FileSpreadsheet",
    soundType: "slap",
  },
  {
    id: "hemostatic_forceps",
    name: "重型止血钳暴击",
    description: "精钢打造的骨科级大号止血钳！冰冷坚硬，一夹定乾坤，痛点直击！",
    cost: 3500,
    damage: 150,
    unlocked: false,
    icon: "Scissors",
    soundType: "punch",
  },
  {
    id: "giant_syringe",
    name: "巨无霸不锈钢针筒",
    description: "兽医级超大号注射器！‘来，屁股撅起来，这一针下去包治百病！’",
    cost: 16000,
    damage: 620,
    unlocked: false,
    icon: "Syringe",
    soundType: "crash",
  },
  {
    id: "defibrillator",
    name: "双击电导电除颤仪",
    description: "‘除颤仪充能完毕，360焦耳准备！闪开！’ 双重高压雷击电疗！",
    cost: 80000,
    damage: 3000,
    unlocked: false,
    icon: "Zap",
    soundType: "electro",
  },
];

// Initial Clinic Allies Configuration (DPS)
const INITIAL_COWORKERS: Coworker[] = [
  {
    id: "trainee",
    name: "写病历规培生",
    description: "‘老师，这个病历我刚写完了，求签收！’ 全自动分担你的打字重担。",
    cost: 60,
    dps: 1,
    count: 0,
    icon: "User",
  },
  {
    id: "nurse",
    name: "金牌带教护士姐姐",
    description: "‘大夫别慌，药开好了，补液也挂上了！’ 自动提供高效的药品输送支援。",
    cost: 400,
    dps: 7,
    count: 0,
    icon: "PlusCircle",
  },
  {
    id: "anesthetist",
    name: "加深麻醉陈老法师",
    description: "‘别挣扎了，全麻已经起效，保证老板一动不动。’ 悄无声息的睡眠气体，输出极大！",
    cost: 1700,
    dps: 30,
    count: 0,
    icon: "Wind",
  },
  {
    id: "security",
    name: "保卫科刘大哥",
    description: "‘谁在急诊闹事？拖出去！’ 壮实可靠，自动物理防御无理取闹并予以威慑反击！",
    cost: 7000,
    dps: 125,
    count: 0,
    icon: "ShieldAlert",
  },
  {
    id: "ambulance",
    name: "120急救拉人车队",
    description: "呜哇呜哇——专业救护车车队24小时高频警报，产生震耳欲聋的高频率自动伤害输出！",
    cost: 30000,
    dps: 580,
    count: 0,
    icon: "Truck",
  },
  {
    id: "ai_copilot",
    name: "医学论文 AI 润色助手",
    description: "终极AI外挂，一秒润色100篇SCI论文，将科研压力瞬间砸给期刊主编！",
    cost: 150000,
    dps: 2400,
    count: 0,
    icon: "Sparkles",
  },
];

// Physician Target Templates
const BOSS_ROSTER: Omit<Boss, "hp">[] = [
  {
    id: "boss_1",
    name: "孙主任",
    title: "画饼查房大魔王",
    maxHp: 150,
    dialogues: [
      "这个月科室的手术量怎么下来了？明天多排十台！",
      "病历怎么还没写完？写不完今晚不许签退！",
      "科研论文进度怎么样了？下周一发核心期刊！",
      "年轻人要多讲奉献，不要老盯着那点夜班费！"
    ],
    rejectionPhrases: [
      "天天画饼，我的胃已经撑爆了！",
      "病历明天再说，我的命也是命！",
      "论文你行你上，我只想睡个饱觉！",
      "拒绝对话！拒绝对我进行道德绑架！"
    ],
    hitDialogues: [
      "哎哟！谁在用听诊器狂甩我的头？！",
      "反了反了！我要扣除你本月全部奖金！",
      "别、别砸病历了！以后查房你说了算！",
      "住手！下周班表给你少排两个夜班！"
    ],
    defeatDialogues: [
      "医生我错了！这个月病历免予考核，特许带薪放假三天！",
      "别打了！查房我再也不瞎指挥了，保证以后天天白班！"
    ],
    avatarStyle: "director",
    gender: "male"
  },
  {
    id: "boss_2",
    name: "赵处长",
    title: "医务处考核大师",
    maxHp: 1200,
    dialogues: [
      "患者投诉你态度生硬，扣除本月绩效 500 元！",
      "病历格式不对，扣款！用药指标超标，双倍罚款！",
      "医患沟通不规范，先写 3000 字深刻检查！",
      "根据最新指标核算，你这个月的诊疗时长超期了！"
    ],
    rejectionPhrases: [
      "天天罚款，我自己掏钱给你上班吗？！",
      "写检查？我这就写辞职信，你爱找谁找谁！",
      "患者无理取闹，你也跟着瞎起哄？！",
      "老子不伺候了！滚出我的诊室！"
    ],
    hitDialogues: [
      "疼！我的纯金眼镜被打飞了！",
      "这不符合管理规范流程，快停下！",
      "有话好说，罚单我收回，全额撤销！",
      "哎呀！大号止血钳太疼了，别戳了！"
    ],
    defeatDialogues: [
      "对不起！所有投诉撤销！退回全部罚款，再加一千全勤奖！",
      "别打了！您是全院敬业楷模，我马上去写表彰公文！"
    ],
    avatarStyle: "compliance",
    gender: "male"
  },
  {
    id: "boss_3",
    name: "百度患者家属",
    title: "无理取闹百度神医",
    maxHp: 8000,
    dialogues: [
      "我就感冒，必须立刻输液打抗生素！不给开我就去告你！",
      "我在百度上查了，你开的药根本就不对，想害我是吧！",
      "排队挂号凭什么要两个小时？我来了你就得马上给我看！",
      "信不信我去卫健委联名写信举报，砸了你这医生的饭碗！"
    ],
    rejectionPhrases: [
      "百度能包治百病，你找百度看去啊！别占用急诊资源！",
      "抗生素不是果汁！排队按流程走！",
      "不满意就退号！别在这里大吵大闹！",
      "这里是治病救人的医院，不是让你撒野的菜市场！"
    ],
    hitDialogues: [
      "哎呦！别用巨无霸针筒扎我！我最怕打针！",
      "救命啊！医生的硬核科普太物理了！",
      "别拿除颤仪电我！我再也不信百度了！",
      "别打了大夫，我排队，我乖乖按规矩排队！"
    ],
    defeatDialogues: [
      "大夫您真是神医啊！我一定遵医嘱，再也不信百度小偏方了！",
      "对不起医生，是我态度不好，我这就去写一百封感谢信！"
    ],
    avatarStyle: "patient",
    gender: "male"
  },
  {
    id: "boss_4",
    name: "深夜加班排班员",
    title: "魔鬼三十六连班永动机",
    maxHp: 45000,
    dialogues: [
      "小李啊，小张请假了，今晚你帮他顶个深夜急诊夜班吧。",
      "周末全院大查房，所有人取消休假，八点大厅准时集合！",
      "由于科室近期人手紧张，你的年休假一律推迟到明年。",
      "连续上三十六小时夜班是外科的基本功，咬咬牙就挺过去了！"
    ],
    rejectionPhrases: [
      "三十六小时？我是医生，不是金刚石！",
      "谁请假谁自己顶，老子今晚要回家搂床睡觉！",
      "年假推迟？我直接推迟我的在职寿命！",
      "滚蛋！老子的腰椎间盘早已严重突出了！"
    ],
    hitDialogues: [
      "别用病历本狂扇我了！排班表都糊我脸上了！",
      "啊！不要用手电筒晃我的眼睛，我排，我改班表！",
      "疼疼疼！下周特许你调休三天！绝对轮空！",
      "别把我的名字继续写进加班表了，我错了！"
    ],
    defeatDialogues: [
      "大哥别电了！休假！特许你带薪休假半个月，以后排班你说了算！",
      "我错了，我替你去值夜班！你以后天天都是阳光普照的白班！"
    ],
    avatarStyle: "scheduler",
    gender: "female"
  },
];

export default function App() {
  // Game state
  const [money, setMoney] = useState<number>(0);
  const [day, setDay] = useState<number>(1);
  const [boss, setBoss] = useState<Boss>({
    ...BOSS_ROSTER[0],
    hp: BOSS_ROSTER[0].maxHp,
  });

  const [weapons, setWeapons] = useState<Weapon[]>(INITIAL_WEAPONS);
  const [selectedWeaponId, setSelectedWeaponId] = useState<string>("stethoscope");
  const [coworkers, setCoworkers] = useState<Coworker[]>(INITIAL_COWORKERS);

  // Active Skills state
  const [activeScreamTime, setActiveScreamTime] = useState<number>(0);
  const [activeStormTime, setActiveStormTime] = useState<number>(0);
  const [screamCooldown, setScreamCooldown] = useState<number>(0);
  const [stormCooldown, setStormCooldown] = useState<number>(0);

  // Doctor Attire switching: "white_coat" (medical blue) or "scrub_suit" (surgical teal)
  const [attire, setAttire] = useState<"white_coat" | "scrub_suit">("white_coat");

  // Cinematic Real-life Mode state
  const [isCinematicMode, setIsCinematicMode] = useState<boolean>(true);

  // Localized swelling bumps on target's face
  const [swellingBumps, setSwellingBumps] = useState<SwellingBump[]>([]);

  // Floating doctor yelling comic bubble state
  const [doctorYell, setDoctorYell] = useState<string | null>(null);

  // Visual state
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isHit, setIsHit] = useState<boolean>(false);
  const [isDefeated, setIsDefeated] = useState<boolean>(false);
  const [clickEffects, setClickEffects] = useState<ClickEffect[]>([]);
  const [particles, setParticles] = useState<ParticleEffect[]>([]);
  const [stats, setStats] = useState<GameStats>({
    totalClicks: 0,
    totalDamage: 0,
    bossesDefeated: 0,
    totalCompensationEarned: 0,
  });

  const [activeTab, setActiveTab] = useState<"weapons" | "coworkers" | "stats">("weapons");

  // Refs for tracking animation loops
  const clickIdCounter = useRef<number>(0);
  const particleIdCounter = useRef<number>(0);
  const animationFrameId = useRef<number | null>(null);
  const lastTickTime = useRef<number>(Date.now());
  const bossCharacterRef = useRef<HTMLDivElement>(null);
  const doctorYellTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load game from LocalStorage on Mount
  useEffect(() => {
    setIsMuted(getMuteStatus());
    const savedData = localStorage.getItem("doctor_catharsis_save_v1");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.money !== undefined) setMoney(parsed.money);
        if (parsed.day !== undefined) setDay(parsed.day);
        if (parsed.attire !== undefined) setAttire(parsed.attire);
        if (parsed.isCinematicMode !== undefined) setIsCinematicMode(parsed.isCinematicMode);
        
        // Restore boss
        if (parsed.boss !== undefined) {
          setBoss(parsed.boss);
        } else {
          const idx = Math.min((parsed.day || 1) - 1, BOSS_ROSTER.length - 1);
          setBoss({
            ...BOSS_ROSTER[idx],
            hp: BOSS_ROSTER[idx].maxHp,
          });
        }

        // Restore weapons
        if (parsed.weapons !== undefined) {
          setWeapons(parsed.weapons);
        }
        if (parsed.selectedWeaponId !== undefined) {
          setSelectedWeaponId(parsed.selectedWeaponId);
        }

        // Restore coworkers
        if (parsed.coworkers !== undefined) {
          setCoworkers(parsed.coworkers);
        }

        // Restore stats
        if (parsed.stats !== undefined) {
          setStats(parsed.stats);
        }
      } catch (e) {
        console.error("Failed to parse saved game state:", e);
      }
    }
  }, []);

  // Save game to LocalStorage on updates
  useEffect(() => {
    const gameState = {
      money,
      day,
      attire,
      boss,
      weapons,
      selectedWeaponId,
      coworkers,
      stats,
      isCinematicMode,
    };
    localStorage.setItem("doctor_catharsis_save_v1", JSON.stringify(gameState));
  }, [money, day, attire, boss, weapons, selectedWeaponId, coworkers, stats, isCinematicMode]);

  // Audio mute sync
  const handleToggleMute = () => {
    const status = toggleMute();
    setIsMuted(status);
  };

  // Get active weapon
  const activeWeapon = weapons.find((w) => w.id === selectedWeaponId) || weapons[0];

  // Calculate DPS (Hospital allies output)
  const totalDps = coworkers.reduce((acc, c) => acc + c.dps * c.count, 0);

  // Click Damage multiplier (Active skills double click output)
  const clickDamage = activeWeapon.damage * (activeScreamTime > 0 ? 2 : 1);

  // Generate procedurally harder medical boss models for endless levels
  const generateProceduralBoss = (level: number): Boss => {
    const titles = ["卫健委恶意投诉员", "急诊室无赖戏霸", "唯利是图私立医院代理", "无良医保钻空子贩子"];
    const names = ["甄无赖", "梅良心", "史欺骗", "赖大夫家属"];
    const quotes = [
      "患者只是感冒，你怎么不全套免费筛查？是不是想贪污！",
      "为什么病床没有高级皮沙发？我要去市长热线投诉！",
      "赶紧给我们先办出院再办住院，我们要刷爆医保额度！",
      "信不信我赖在这不走，让你们整栋楼的大夫都上不了班！"
    ],
    hitQuotes = [
      "哎呀！别拿骨科为止血钳夹我了！",
      "救命啊！这医生的物理诊断太强硬了！",
      "我撤诉，我这去把投诉记录全部注销！",
      "保卫科！警察叔叔！医生科普太硬了！"
    ],
    defeatQuotes = [
      "大夫饶命！我把讹的钱全部退还，并向科室登报道歉！",
      "我再也不无理缠闹了，向最美逆行者致敬，对不起！"
    ];

    const randomTitle = titles[(level - 1) % titles.length];
    const randomName = names[(level - 1) % names.length];
    const baseHp = 45000;
    const scaledHp = Math.round(baseHp * Math.pow(1.8, level - 4));

    return {
      id: `procedural_${level}`,
      name: `${randomName} (${level}阶高级麻烦)`,
      title: randomTitle,
      maxHp: scaledHp,
      hp: scaledHp,
      dialogues: quotes,
      rejectionPhrases: [
        "拒绝道德绑架！法律不是你敲诈的工具！",
        "按规排队！别占有限的急诊绿色生命通道！",
        "不退号就按规定走！概不接待无赖！",
        "去卫健委告啊！我们按合法程序执行，问心无愧！"
      ],
      hitDialogues: hitQuotes,
      defeatDialogues: defeatQuotes,
      avatarStyle: "patient",
      gender: "male"
    };
  };

  // Switch to next boss
  const handleNextBoss = (currentDay: number) => {
    const nextDay = currentDay + 1;
    setDay(nextDay);
    setIsDefeated(false);
    setSwellingBumps([]); // Clear facial scars for new target

    let nextBossData: Boss;
    if (nextDay <= BOSS_ROSTER.length) {
      const bTemplate = BOSS_ROSTER[nextDay - 1];
      nextBossData = {
        ...bTemplate,
        hp: bTemplate.maxHp,
      };
    } else {
      nextBossData = generateProceduralBoss(nextDay);
    }

    setBoss(nextBossData);
    setStats((prev) => ({
      ...prev,
      bossesDefeated: prev.bossesDefeated + 1,
    }));
  };

  // Damage application logic
  const applyDamage = (amount: number, isManualClick = false, eventX?: number, eventY?: number) => {
    if (isDefeated || boss.hp <= 0) return;

    // Trigger visual hit face state
    if (isManualClick) {
      setIsHit(true);
      setTimeout(() => setIsHit(false), 120);

      // Play matching high-fidelity weapon synthesizer sound
      switch (activeWeapon.soundType) {
        case "slap":
          playSlap();
          break;
        case "punch":
          playPunch();
          break;
        case "crash":
          playCrash();
          break;
        case "electro":
          playElectro();
          break;
        default:
          playSlap();
      }

      // Small chance to play target grunt scream
      if (Math.random() > 0.72) {
        playBossOuch();
      }

      // 50% chance on click to trigger a loud, courageous doctor rejection phrase!
      if (Math.random() > 0.52 && boss.rejectionPhrases && boss.rejectionPhrases.length > 0) {
        const randPhrase = boss.rejectionPhrases[Math.floor(Math.random() * boss.rejectionPhrases.length)];
        setDoctorYell(randPhrase);
        if (doctorYellTimeoutRef.current) clearTimeout(doctorYellTimeoutRef.current);
        doctorYellTimeoutRef.current = setTimeout(() => {
          setDoctorYell(null);
        }, 1400);
      }
    }

    // Spawn floating hit details and relative swelling bumps
    if (isManualClick && eventX !== undefined && eventY !== undefined && bossCharacterRef.current) {
      const rect = bossCharacterRef.current.getBoundingClientRect();
      const relativeX = eventX - rect.left;
      const relativeY = eventY - rect.top;

      // Doctor's custom float text
      const floatTexts = [
        `行医尊严 +${amount} 🩺`,
        `拒绝道德绑架 -${amount}!`,
        `休假申诉! 🏖️`,
        `按规流程! 📑`,
        `退号！退号！ 🚫`,
        `夜班休止! 💤`,
      ];
      const randomText = floatTexts[Math.floor(Math.random() * floatTexts.length)];

      clickIdCounter.current += 1;
      setClickEffects((prev) => [
        ...prev,
        {
          id: clickIdCounter.current,
          x: relativeX,
          y: relativeY,
          text: randomText,
          color: activeScreamTime > 0 ? "#f43f5e" : attire === "white_coat" ? "#38bdf8" : "#34d399",
        },
      ]);

      // Spawn falling physical medical supplies debris particles
      const debrisOptions = ["🩺", "💊", "🥼", "🌡️", "💉", "🩹", "💢", "🏥", "❌"];
      const newParticles: ParticleEffect[] = [];
      const particleCount = 4 + Math.floor(Math.random() * 3);

      for (let i = 0; i < particleCount; i++) {
        particleIdCounter.current += 1;
        const speed = 4.5 + Math.random() * 5.5;
        const angle = Math.random() * Math.PI * 1.2 - Math.PI * 1.1; // upward spread

        newParticles.push({
          id: particleIdCounter.current,
          x: relativeX,
          y: relativeY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 2.5, // upward boost
          char: debrisOptions[Math.floor(Math.random() * debrisOptions.length)],
          size: 15 + Math.random() * 11,
          rotation: Math.random() * 360,
          opacity: 1,
        });
      }
      setParticles((prev) => [...prev, ...newParticles]);

      // Add a swelling bump (局部肿包) in SVG coordinates space (centered at 150, 130)
      const px = relativeX / rect.width;
      const py = relativeY / rect.height;
      const svgX = px * 300;
      const svgY = py * 300;
      const dx = svgX - 150;
      const dy = svgY - 130;
      
      // Ellipse formula check (did we hit near the face ellipse bounds?)
      const distOnFace = (dx * dx) / (74 * 74) + (dy * dy) / (62 * 62);
      if (distOnFace <= 1.25) {
        const bumpId = Date.now() + Math.random();
        const newBump: SwellingBump = {
          id: bumpId,
          x: dx / 74, // normalized face width factor
          y: dy / 62, // normalized face height factor
          size: 8 + Math.random() * 5,
          maxSize: 18 + Math.random() * 7,
          rotation: Math.random() * 360,
          pulseTimer: 0,
        };
        setSwellingBumps((prev) => {
          // Limit to maximum 12 concurrent face swellings to ensure smooth performance
          return [...prev.slice(-11), newBump];
        });
      }
    }

    // Health reduction and Beg-For-Mercy state transition
    setBoss((prev) => {
      const nextHp = Math.max(0, prev.hp - amount);
      if (nextHp <= 0 && !isDefeated) {
        setIsDefeated(true);
        // Play epic medical victory and award compensation
        playVictoryFanfare();
        playCoin();

        const dismissalReward = Math.round(prev.maxHp * 0.45);
        setMoney((m) => m + dismissalReward);
        setStats((s) => ({
          ...s,
          totalCompensationEarned: s.totalCompensationEarned + dismissalReward,
        }));

        // Transition to next target after 2.2 seconds of crying pleading animation
        setTimeout(() => {
          handleNextBoss(day);
        }, 2200);
      }
      return { ...prev, hp: nextHp };
    });

    // Award direct game cash proportional to click impact
    setMoney((prev) => prev + amount);

    // Update global career statistics
    setStats((prev) => ({
      ...prev,
      totalClicks: isManualClick ? prev.totalClicks + 1 : prev.totalClicks,
      totalDamage: prev.totalDamage + amount,
      totalCompensationEarned: prev.totalCompensationEarned + amount,
    }));
  };

  // Bashing physical keyboard keys trigger
  const handleSlamDamage = () => {
    // Pick random coordinate spots on target's face
    const rx = 110 + Math.random() * 80;
    const ry = 90 + Math.random() * 80;
    if (bossCharacterRef.current) {
      const rect = bossCharacterRef.current.getBoundingClientRect();
      applyDamage(clickDamage, true, rect.left + rx, rect.top + ry);
    } else {
      applyDamage(clickDamage, true);
    }
  };

  // Direct Click on target face
  const handleBossClick = (e: React.MouseEvent<HTMLDivElement>) => {
    applyDamage(clickDamage, true, e.clientX, e.clientY);
  };

  // Skill active timers count-down ticking
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveScreamTime((prev) => Math.max(0, prev - 1));
      setScreamCooldown((prev) => Math.max(0, prev - 1));
      setActiveStormTime((prev) => Math.max(0, prev - 1));
      setStormCooldown((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Skill Activator 1: "大声拒绝 (医者咆哮)"
  const triggerScream = () => {
    if (screamCooldown > 0) return;
    playUpgrade();
    setActiveScreamTime(12);
    setScreamCooldown(30);

    // Trigger high intensity comic scream shout!
    setDoctorYell("拒绝画饼！我的命也是命！老子不值夜班了！！！");
    if (doctorYellTimeoutRef.current) clearTimeout(doctorYellTimeoutRef.current);
    doctorYellTimeoutRef.current = setTimeout(() => {
      setDoctorYell(null);
    }, 2800);
  };

  // Skill Activator 2: "退号停诊 (狂风洗礼)"
  const triggerStorm = () => {
    if (stormCooldown > 0) return;
    playUpgrade();
    setActiveStormTime(10);
    setStormCooldown(55);

    setDoctorYell("全面退号停诊！去你的三十六小时连轴加班！！！");
    if (doctorYellTimeoutRef.current) clearTimeout(doctorYellTimeoutRef.current);
    doctorYellTimeoutRef.current = setTimeout(() => {
      setDoctorYell(null);
    }, 2800);
  };

  // Active loop for coworker auto DPS and automated click storm
  useEffect(() => {
    const loopInterval = setInterval(() => {
      if (isDefeated) return;

      let dpsTick = totalDps;

      // Automatic click storm damage
      if (activeStormTime > 0) {
        dpsTick += clickDamage * 15;

        // Spawn rapid cosmetic hit sparks on face
        if (bossCharacterRef.current && Math.random() > 0.4) {
          const rect = bossCharacterRef.current.getBoundingClientRect();
          const randX = rect.left + 60 + Math.random() * 180;
          const randY = rect.top + 70 + Math.random() * 140;
          applyDamage(clickDamage, false, randX, randY);
        }
      }

      if (dpsTick > 0) {
        applyDamage(dpsTick);
      }
    }, 1000);

    return () => clearInterval(loopInterval);
  }, [totalDps, activeStormTime, clickDamage, isDefeated]);

  // Cleanup click floating effect cues
  useEffect(() => {
    if (clickEffects.length === 0) return;
    const cleanup = setTimeout(() => {
      setClickEffects((prev) => prev.slice(1));
    }, 1200);
    return () => clearTimeout(cleanup);
  }, [clickEffects]);

  // Physics animation frames loop for falling particle debris
  useEffect(() => {
    let lastTime = Date.now();

    const updatePhysics = () => {
      const now = Date.now();
      const dt = (now - lastTime) / 16;
      lastTime = now;

      setParticles((prev) => {
        if (prev.length === 0) return prev;
        return prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx * dt,
            y: p.y + p.vy * dt,
            vy: p.vy + 0.36 * dt, // gravity
            rotation: p.rotation + p.vx * 1.5 * dt,
            opacity: Math.max(0, p.opacity - 0.02 * dt),
          }))
          .filter((p) => p.opacity > 0 && p.y < 500);
      });

      animationFrameId.current = requestAnimationFrame(updatePhysics);
    };

    animationFrameId.current = requestAnimationFrame(updatePhysics);
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  // Purchase new hospital weapons
  const handleBuyWeapon = (weaponId: string) => {
    const w = weapons.find((item) => item.id === weaponId);
    if (!w || w.unlocked || money < w.cost) return;

    playUpgrade();
    setMoney((prev) => prev - w.cost);
    setWeapons((prev) =>
      prev.map((item) => (item.id === weaponId ? { ...item, unlocked: true } : item))
    );
    setSelectedWeaponId(weaponId); // auto equip
  };

  // Equip unlocked weapons
  const handleSelectWeapon = (weaponId: string) => {
    const w = weapons.find((item) => item.id === weaponId);
    if (w && w.unlocked) {
      setSelectedWeaponId(weaponId);
      playUpgrade();
    }
  };

  // Recount team/recruited coworkers
  const handleHireCoworker = (coworkerId: string) => {
    const c = coworkers.find((item) => item.id === coworkerId);
    if (!c) return;

    const currentCost = Math.round(c.cost * Math.pow(1.15, c.count));
    if (money < currentCost) return;

    playUpgrade();
    setMoney((prev) => prev - currentCost);
    setCoworkers((prev) =>
      prev.map((item) => (item.id === coworkerId ? { ...item, count: item.count + 1 } : item))
    );
  };

  // Reset progress data
  const handleResetGame = () => {
    if (window.confirm("确定要提交辞职申请，清空行医积分并重新从规培医生入职第一天开始吗？")) {
      localStorage.removeItem("doctor_catharsis_save_v1");
      setMoney(0);
      setDay(1);
      setAttire("white_coat");
      setSwellingBumps([]);
      setBoss({
        ...BOSS_ROSTER[0],
        hp: BOSS_ROSTER[0].maxHp,
      });
      setWeapons(INITIAL_WEAPONS);
      setSelectedWeaponId("stethoscope");
      setCoworkers(INITIAL_COWORKERS);
      setStats({
        totalClicks: 0,
        totalDamage: 0,
        bossesDefeated: 0,
        totalCompensationEarned: 0,
      });
      setActiveScreamTime(0);
      setActiveStormTime(0);
      setScreamCooldown(0);
      setStormCooldown(0);
      playVictoryFanfare();
    }
  };

  // Career Mental Health index rating calculator
  const getHappinessRating = () => {
    const ratio = totalDps * 5.2 + stats.bossesDefeated * 22 + (stats.totalClicks > 0 ? 8 : 0);
    return Math.min(100, Math.max(15, ratio));
  };

  // Theme color maps based on clinical toggles
  const textThemeClass = attire === "white_coat" ? "text-sky-400" : "text-teal-400";
  const borderThemeClass = attire === "white_coat" ? "border-sky-900" : "border-teal-900";
  const activeAttireTabClass = attire === "white_coat" ? "bg-sky-600 text-white" : "bg-teal-600 text-white";

  return (
    <div className="relative min-h-screen text-slate-100 flex flex-col font-sans select-none overflow-x-hidden pb-12">
      {/* Clinically stylized hospital background */}
      <OfficeBackground />

      {/* Header bar */}
      <header className="w-full bg-slate-950/85 backdrop-blur-md border-b border-slate-900 px-6 py-4 flex flex-col xl:flex-row items-center justify-between gap-4 z-20 shadow-lg">
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto">
          {/* Brand Logo Banner */}
          <BrandBanner />

          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shrink-0 ${
              attire === "white_coat" ? "bg-sky-500 text-white" : "bg-teal-500 text-slate-950"
            }`}>
              <Stethoscope className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-black tracking-tight bg-gradient-to-r from-slate-100 via-sky-200 to-teal-200 bg-clip-text text-transparent">
                医生专属解压神器
              </h1>
              <p className="text-[10px] text-slate-400 font-mono">
                Doctor-Exclusive Stress Relief • 医路坎坷，用行动击退道德绑架！
              </p>
            </div>
          </div>
        </div>

        {/* Dress toggler: 白大褂 vs 手术衣 */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1 rounded-xl">
            <span className="text-[10px] font-bold text-slate-500 pl-2 font-mono">🩺 执勤着装:</span>
            <button
              onClick={() => setAttire("white_coat")}
              className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-all ${
                attire === "white_coat"
                  ? "bg-sky-600 text-white shadow-md shadow-sky-600/20"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              🥼 白大褂
            </button>
            <button
              onClick={() => setAttire("scrub_suit")}
              className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-all ${
                attire === "scrub_suit"
                  ? "bg-teal-600 text-slate-950 shadow-md shadow-teal-600/20"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              👕 手术衣
            </button>
          </div>

          {/* Cinematic Toggler: 极简 3D 矢量 vs 电影级真人 */}
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1 rounded-xl shadow-inner">
            <span className="text-[10px] font-bold text-slate-500 pl-2 font-mono flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${isCinematicMode ? "bg-rose-500 animate-pulse" : "bg-slate-600"}`} />
              🎬 画面引擎:
            </span>
            <button
              onClick={() => {
                setIsCinematicMode(false);
                playUpgrade();
              }}
              className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-all ${
                !isCinematicMode
                  ? "bg-gradient-to-r from-slate-800 to-slate-700 text-slate-100 shadow-md border border-slate-600/30"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              📐 3D 矢量版
            </button>
            <button
              onClick={() => {
                setIsCinematicMode(true);
                playUpgrade();
              }}
              className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-all flex items-center gap-1 ${
                isCinematicMode
                  ? "bg-gradient-to-r from-amber-600 to-rose-600 text-white shadow-lg shadow-rose-600/25 border border-rose-400/30"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              🎥 电影真人
            </button>
          </div>
        </div>

        {/* Total stats and money achievements */}
        <div className="flex items-center gap-6">
          <div className="text-right">
            <span className="text-[10px] text-slate-500 font-mono block uppercase tracking-wider">
              当前累计行医积分
            </span>
            <span className={`text-lg md:text-xl font-mono font-black flex items-center justify-end gap-1 ${textThemeClass}`}>
              💵 {Math.round(money).toLocaleString()} 元
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleMute}
              className={`p-2.5 rounded-xl border transition-all hover:bg-slate-900 ${
                isMuted
                  ? "border-rose-500/30 text-rose-400 bg-rose-500/5"
                  : "border-slate-800 text-slate-400 hover:text-slate-200"
              }`}
              title={isMuted ? "开启声音" : "静音"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            
            <button
              onClick={handleResetGame}
              className="p-2.5 rounded-xl border border-slate-800 text-slate-500 hover:text-rose-400 hover:border-rose-900/40 transition-all hover:bg-rose-950/20"
              title="提交辞职报告 (清空进度)"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Game Arena layout */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative z-10">
        
        {/* Left column: Target Smacking Stage (5 columns) */}
        <div className="lg:col-span-5 xl:col-span-6 flex flex-col justify-between bg-slate-950/50 border border-slate-900/80 rounded-3xl p-6 backdrop-blur-xs relative overflow-hidden shadow-2xl">
          
          <div className="flex items-center justify-between border-b border-slate-900 pb-4 mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-widest text-rose-400 uppercase">
                深夜急诊值班第 {day} 天
              </span>
            </div>

            <div className={`flex items-center gap-1.5 bg-slate-900/95 border ${borderThemeClass} rounded-lg px-2.5 py-1 text-[11px] font-mono ${textThemeClass}`}>
              <Calendar className="w-3.5 h-3.5" />
              <span>终极诉求: 拒绝道德绑架</span>
            </div>
          </div>

          <div className="text-center py-1 opacity-85">
            <p className="text-xs text-slate-400 italic">
              "现实中无法说出的拒绝，在这里痛快大声呐喊！"
            </p>
          </div>

          {/* Target click board with coordinates */}
          <div
            ref={bossCharacterRef}
            onClick={handleBossClick}
            className="flex-1 relative flex items-center justify-center py-6 focus:outline-none"
          >
            {/* Click float coordinates indicators */}
            <div className="absolute inset-0 pointer-events-none z-30">
              <AnimatePresence>
                {clickEffects.map((eff) => (
                  <motion.div
                    key={eff.id}
                    initial={{ opacity: 1, scale: 0.85, y: eff.y - 12 }}
                    animate={{ opacity: 0, scale: 1.35, y: eff.y - 95 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.15, ease: "easeOut" }}
                    className="absolute font-mono font-black select-none pointer-events-none drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] filter text-sm whitespace-nowrap"
                    style={{ left: eff.x, top: eff.y, color: eff.color }}
                  >
                    {eff.text}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Falling physical debries particles */}
            <div className="absolute inset-0 pointer-events-none z-20">
              {particles.map((p) => (
                <div
                  key={p.id}
                  className="absolute pointer-events-none font-mono select-none"
                  style={{
                    left: p.x,
                    top: p.y,
                    fontSize: p.size,
                    transform: `rotate(${p.rotation}deg)`,
                    opacity: p.opacity,
                  }}
                >
                  {p.char}
                </div>
              ))}
            </div>

            {/* Render customizable animated SVG boss portrait with swelling scars */}
            <BossCharacter
              boss={boss}
              isHit={isHit}
              isDefeated={isDefeated}
              activeWeaponId={activeWeapon.id}
              swellingBumps={swellingBumps}
              attire={attire}
              coworkers={coworkers}
              isCinematicMode={isCinematicMode}
            />

            {/* Rotating shield warning indicators */}
            {activeStormTime > 0 && (
              <div className="absolute inset-0 border-2 border-dashed border-teal-500/10 rounded-3xl animate-[spin_45s_linear_infinite] pointer-events-none" />
            )}

            {/* Giant Doctor Yelling Comic Bubble Overlay */}
            <AnimatePresence>
              {doctorYell && (
                <motion.div
                  initial={{ scale: 0.3, opacity: 0, rotate: -20 }}
                  animate={{ scale: [1.2, 1], opacity: 1, rotate: [-15, -6] }}
                  exit={{ scale: 0.8, opacity: 0, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 350, damping: 15 }}
                  className="absolute bottom-16 left-6 right-6 md:left-12 md:right-12 z-40 pointer-events-none"
                >
                  <div className="bg-gradient-to-r from-red-600 via-rose-600 to-rose-700 border-4 border-yellow-400 px-5 py-3 rounded-2xl shadow-[0_15px_35px_rgba(239,68,68,0.6)] transform text-white relative">
                    {/* Jagged border speech bubble pointer */}
                    <div className="absolute left-1/2 bottom-[-16px] -translate-x-1/2 w-0 h-0 border-t-[16px] border-t-red-600 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent transform -skew-x-12" />
                    <div className="text-[10px] font-black uppercase font-mono tracking-widest text-yellow-300 drop-shadow-sm">
                      🩺 医者坚决反抗宣言：
                    </div>
                    <div className="text-xs md:text-sm font-black tracking-tight mt-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] font-sans select-none leading-relaxed">
                      「{doctorYell}」
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Pleading/妥协 HP status board */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-md z-10 mt-4">
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <span className="text-slate-300 font-bold flex items-center gap-1.5">
                👹 {boss.name} <span className="text-slate-500 font-medium">({boss.title})</span>
              </span>
              <span className={`${textThemeClass} font-bold`}>
                妥协抗性: {Math.max(0, Math.round(boss.hp)).toLocaleString()} / {boss.maxHp.toLocaleString()} (
                {Math.round((boss.hp / boss.maxHp) * 100)}%)
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-3.5 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: `${(boss.hp / boss.maxHp) * 100}%` }}
                transition={{ duration: 0.15 }}
                className={`h-full rounded-full ${
                  boss.hp / boss.maxHp < 0.25
                    ? "bg-gradient-to-r from-red-600 to-rose-500 shadow-[0_0_10px_rgba(239,68,68,0.6)]"
                    : boss.hp / boss.maxHp < 0.5
                    ? "bg-gradient-to-r from-amber-500 to-orange-400"
                    : attire === "white_coat"
                    ? "bg-gradient-to-r from-sky-500 to-blue-600"
                    : "bg-gradient-to-r from-teal-500 to-emerald-600"
                }`}
              />
            </div>

            <div className="flex justify-between items-center mt-2.5 text-[10px] font-mono text-slate-500 leading-normal">
              <span>妥协抗性归零时，无理方将被大打服输并退回你的行医津贴奖励！</span>
              {isDefeated && (
                <span className="text-emerald-400 font-bold animate-pulse">
                  🎉 打求饶！正在发放补偿奖励...
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right column: Weapons, Allies and Active controls (7 columns) */}
        <div className="lg:col-span-7 xl:col-span-6 flex flex-col gap-6">
          
          {/* Tab Selector */}
          <div className="bg-slate-950/80 p-1.5 border border-slate-900 rounded-2xl flex items-center justify-between shadow-inner">
            <div className="flex gap-1.5 flex-1">
              <button
                onClick={() => setActiveTab("weapons")}
                className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === "weapons"
                    ? activeAttireTabClass + " shadow"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
                }`}
              >
                🛠️ 解压武器 ({weapons.filter(w => w.unlocked).length})
              </button>
              
              <button
                onClick={() => setActiveTab("coworkers")}
                className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === "coworkers"
                    ? activeAttireTabClass + " shadow"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
                }`}
              >
                👥 门诊盟友 ({coworkers.reduce((acc, c) => acc + c.count, 0)})
              </button>

              <button
                onClick={() => setActiveTab("stats")}
                className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === "stats"
                    ? activeAttireTabClass + " shadow"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
                }`}
              >
                📊 成就看板
              </button>
            </div>
          </div>

          {/* Dynamic tabs render panel */}
          <div className="flex-1 min-h-[340px]">
            {activeTab === "weapons" && (
              <WeaponSelector
                weapons={weapons}
                selectedWeaponId={selectedWeaponId}
                money={money}
                onBuyWeapon={handleBuyWeapon}
                onSelectWeapon={handleSelectWeapon}
              />
            )}

            {activeTab === "coworkers" && (
              <CoworkerManager
                coworkers={coworkers}
                money={money}
                onHireCoworker={handleHireCoworker}
                totalDps={totalDps}
              />
            )}

            {activeTab === "stats" && (
              <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col h-full justify-between">
                <div className="pb-2 border-b border-slate-800 mb-4">
                  <h2 className="text-md font-bold text-slate-100 flex items-center gap-2">
                    📊 医护人员职业生涯舒缓记录仪
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    监控你在下班或夜班空暇期间，在此神器中取得的惊人反击成果：
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 flex-1">
                  {/* Stat 1 */}
                  <div className="bg-slate-950 border border-slate-900 p-4 rounded-xl flex flex-col justify-center">
                    <span className="text-xs text-slate-500 font-medium block">
                      宣泄反击总次数
                    </span>
                    <span className="text-xl font-mono font-black text-rose-400 mt-1.5 flex items-center gap-1">
                      🔨 {stats.totalClicks.toLocaleString()} 次
                    </span>
                  </div>

                  {/* Stat 2 */}
                  <div className="bg-slate-950 border border-slate-900 p-4 rounded-xl flex flex-col justify-center">
                    <span className="text-xs text-slate-500 font-medium block">
                      大打服输对手
                    </span>
                    <span className="text-xl font-mono font-black text-amber-400 mt-1.5 flex items-center gap-1">
                      🏆 {stats.bossesDefeated.toLocaleString()} 人
                    </span>
                  </div>

                  {/* Stat 3 */}
                  <div className="bg-slate-950 border border-slate-900 p-4 rounded-xl flex flex-col justify-center">
                    <span className="text-xs text-slate-500 font-medium block">
                      累积夺回医疗津贴
                    </span>
                    <span className="text-xl font-mono font-black text-emerald-400 mt-1.5 flex items-center gap-1">
                      💵 {Math.round(stats.totalCompensationEarned).toLocaleString()} 元
                    </span>
                  </div>

                  {/* Stat 4: Medical happiness */}
                  <div className="bg-slate-950 border border-slate-900 p-4 rounded-xl flex flex-col justify-center">
                    <span className="text-xs text-slate-500 font-medium block">
                      医护心理疏导指数
                    </span>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-xl font-mono font-black text-pink-400">
                        ❤️ {getHappinessRating()}%
                      </span>
                      <span className="text-[9px] bg-pink-500/10 text-pink-400 px-1.5 py-0.5 rounded font-bold">
                        {getHappinessRating() > 75 ? "带薪休长假" : getHappinessRating() > 40 ? "科室带头人" : "连轴急诊中"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 text-center font-medium">
                  <p className="text-[10px] text-slate-500 leading-normal">
                    数据已开启云端本地缓存保护，关闭浏览器不会丢失进度。
                    <br />
                    点击右上角逆向指针可提交“辞职报告”清除所有反抗进度。
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Physical key terminal and Skills active console */}
          <div className="h-[210px]">
            <VentingConsole
              onSlamDamage={handleSlamDamage}
              money={money}
              totalDps={totalDps}
              clickDamage={clickDamage}
              activeScreamTime={activeScreamTime}
              activeStormTime={activeStormTime}
              triggerScream={triggerScream}
              triggerStorm={triggerStorm}
              screamCooldown={screamCooldown}
              stormCooldown={stormCooldown}
              attire={attire}
            />
          </div>

        </div>
      </main>

      {/* Footer disclaimer */}
      <footer className="w-full text-center mt-8 pb-8 px-6 text-slate-500 text-[11px] font-mono">
        <div className="max-w-2xl mx-auto leading-relaxed">
          <div>本游戏纯属虚构与急诊科医生幽默解压之作，不代表任何真实医疗指引与纠纷解决建议。向所有守护健康的医务工作者致敬！</div>
          <div className="mt-1">© 2026 医患和谐与心理疏导解压委员会. All Rights Reserved.</div>
        </div>
      </footer>
    </div>
  );
}
