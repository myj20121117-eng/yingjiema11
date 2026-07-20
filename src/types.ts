export interface Boss {
  id: string;
  name: string;
  title: string;
  maxHp: number;
  hp: number;
  dialogues: string[]; // Boss's unreasonable orders/complaints
  rejectionPhrases: string[]; // Doctor's loud, courageous counter-yell phrases
  hitDialogues: string[]; // Pleading/求饶 words when getting smacked
  defeatDialogues: string[]; // Deep regret / beg-for-mercy dialogues
  avatarStyle: "director" | "compliance" | "patient" | "scheduler";
  gender: "male" | "female";
}

export interface Weapon {
  id: string;
  name: string;
  description: string;
  cost: number;
  damage: number;
  unlocked: boolean;
  icon: string;
  soundType: "slap" | "punch" | "crash" | "smash" | "electro";
}

export interface Coworker {
  id: string;
  name: string;
  description: string;
  cost: number;
  dps: number;
  count: number;
  icon: string;
}

export interface ClickEffect {
  id: number;
  x: number;
  y: number;
  text: string;
  color: string;
}

export interface ParticleEffect {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  char: string;
  size: number;
  rotation: number;
  opacity: number;
}

export interface SwellingBump {
  id: number;
  x: number; // percentage coordinate on face
  y: number;
  size: number;
  maxSize: number;
  rotation: number;
  pulseTimer: number;
}

export interface GameStats {
  totalClicks: number;
  totalDamage: number;
  bossesDefeated: number; // Number of times boss pleaded for mercy
  totalCompensationEarned: number;
}

