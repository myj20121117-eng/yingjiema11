// Web Audio API Synthesizer for high-fidelity retro sound effects
let audioCtx: AudioContext | null = null;
let isMuted = false;

function getAudioContext(): AudioContext | null {
  if (isMuted) return null;
  if (!audioCtx) {
    try {
      audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (e) {
      console.warn("Web Audio API not supported in this browser.", e);
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

export const toggleMute = (): boolean => {
  isMuted = !isMuted;
  if (isMuted && audioCtx) {
    audioCtx.close().then(() => {
      audioCtx = null;
    });
  }
  return isMuted;
};

export const getMuteStatus = (): boolean => isMuted;

// Play a physical "Slap / Paper whip" sound
export const playSlap = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "triangle";
  osc.frequency.setValueAtTime(800, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.12);

  gain.gain.setValueAtTime(0.4, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

  // Add noise for the paper-slap/whip effect
  const bufferSize = ctx.sampleRate * 0.1;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const noiseFilter = ctx.createBiquadFilter();
  noiseFilter.type = "bandpass";
  noiseFilter.frequency.setValueAtTime(1000, ctx.currentTime);

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.3, ctx.currentTime);
  noiseGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(ctx.destination);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.15);
  noise.start();
  noise.stop(ctx.currentTime + 0.1);
};

// Play a heavy "Punch / Slam / Desk Smack" sound
export const playPunch = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(150, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.18);

  gain.gain.setValueAtTime(0.6, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.2);
};

// Play a metallic "Stapler / Keyboard Click" sound
export const playStapler = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();

  osc1.type = "triangle";
  osc1.frequency.setValueAtTime(1200, ctx.currentTime);
  osc1.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.05);

  osc2.type = "square";
  osc2.frequency.setValueAtTime(2400, ctx.currentTime);
  osc2.frequency.exponentialRampToValueAtTime(1800, ctx.currentTime + 0.03);

  gain.gain.setValueAtTime(0.2, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.06);

  osc1.connect(gain);
  osc2.connect(gain);
  gain.connect(ctx.destination);

  osc1.start();
  osc1.stop(ctx.currentTime + 0.06);
  osc2.start();
  osc2.stop(ctx.currentTime + 0.04);
};

// Play a glass/ceramic "Coffee Mug break" sound
export const playCrash = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  // Synthesis of ceramic shattering using a combination of high-pitched square waves and white noise
  const bufferSize = ctx.sampleRate * 0.35;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const noiseFilter = ctx.createBiquadFilter();
  noiseFilter.type = "highpass";
  noiseFilter.frequency.setValueAtTime(3000, ctx.currentTime);

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.4, ctx.currentTime);
  noiseGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(ctx.destination);

  // High metal tinkles
  const osc = ctx.createOscillator();
  const oscGain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(4000, ctx.currentTime);
  osc.frequency.setValueAtTime(1200, ctx.currentTime + 0.05);
  osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.2);

  oscGain.gain.setValueAtTime(0.15, ctx.currentTime);
  oscGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

  osc.connect(oscGain);
  oscGain.connect(ctx.destination);

  noise.start();
  noise.stop(ctx.currentTime + 0.35);
  osc.start();
  osc.stop(ctx.currentTime + 0.25);
};

// Play retro "Coin Collect" sound for cash reward
export const playCoin = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
  osc.frequency.setValueAtTime(880, ctx.currentTime + 0.08); // A5

  gain.gain.setValueAtTime(0.25, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.25);
};

// Play rising "Upgrade" sweep
export const playUpgrade = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50]; // C Major scale arpeggio
  const duration = 0.06;

  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * duration);

    gain.gain.setValueAtTime(0.0, ctx.currentTime + idx * duration);
    gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + idx * duration + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * duration + duration + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + idx * duration);
    osc.stop(ctx.currentTime + idx * duration + duration + 0.05);
  });
};

// Play major epic victory fanfare
export const playVictoryFanfare = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  const tempo = 0.12;
  const melody = [
    { freq: 261.63, len: 1 }, // C4
    { freq: 329.63, len: 1 }, // E4
    { freq: 392.00, len: 1 }, // G4
    { freq: 523.25, len: 2 }, // C5
    { freq: 392.00, len: 1 }, // G4
    { freq: 523.25, len: 4 }, // C5
  ];

  let currentStart = ctx.currentTime;

  melody.forEach((note) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "square";
    osc.frequency.setValueAtTime(note.freq, currentStart);

    gain.gain.setValueAtTime(0.0, currentStart);
    gain.gain.linearRampToValueAtTime(0.12, currentStart + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, currentStart + note.len * tempo - 0.02);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(currentStart);
    osc.stop(currentStart + note.len * tempo);

    currentStart += note.len * tempo;
  });
};

// Play funny retro boss grunt/shriek
export const playBossOuch = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  // Draw some modulation frequency curves to make it sound like an angry grunt or "Ouch!"
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(220, ctx.currentTime);
  osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.15);
  osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.25);

  gain.gain.setValueAtTime(0.3, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.28);

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(400, ctx.currentTime);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.3);
};

// Play defibrillator buzz/electroshock sound
export const playElectro = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(80, ctx.currentTime);
  osc.frequency.linearRampToValueAtTime(350, ctx.currentTime + 0.15);
  osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.35);

  gain.gain.setValueAtTime(0.4, ctx.currentTime);
  gain.gain.setValueAtTime(0.3, ctx.currentTime + 0.1);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);

  // Add high frequency ring modulation
  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();
  osc2.type = "sine";
  osc2.frequency.setValueAtTime(800, ctx.currentTime);
  gain2.gain.setValueAtTime(0.1, ctx.currentTime);
  gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);

  osc.connect(gain);
  osc2.connect(gain2);
  gain.connect(ctx.destination);
  gain2.connect(ctx.destination);

  osc.start();
  osc2.start();
  osc.stop(ctx.currentTime + 0.4);
  osc2.stop(ctx.currentTime + 0.25);
};

