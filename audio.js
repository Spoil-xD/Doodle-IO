/**
 * Doodle IO - Synthesized Web Audio API Engine
 * Completely self-contained, no external audio files required.
 */
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.initialized = false;
  }

  init() {
    if (this.initialized && this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        if (this.ctx.state === 'suspended') {
          const resume = () => {
            if (this.ctx && this.ctx.state === 'suspended') {
              this.ctx.resume();
            }
            window.removeEventListener('click', resume);
            window.removeEventListener('keydown', resume);
            window.removeEventListener('touchstart', resume);
          };
          window.addEventListener('click', resume);
          window.addEventListener('keydown', resume);
          window.addEventListener('touchstart', resume);
        }
        this.initialized = true;
      }
    } catch (e) {
      console.warn('Web Audio not supported or blocked:', e);
    }
  }

  ensureContext() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (!this.isMuted) {
      this.playPop(800);
    }
    return this.isMuted;
  }

  /**
   * Bouncy pop sound for button clicks & UI interactions
   */
  playPop(freq = 520) {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.08);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch (err) {}
  }

  /**
   * Snappy color/tool select sound
   */
  playToolSelect(pitch = 600) {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(pitch, now);
      osc.frequency.exponentialRampToValueAtTime(pitch * 1.5, now + 0.06);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch (err) {}
  }

  /**
   * Crisp bell/triangle "tring!" sound for countdown numbers 3, 2, 1
   */
  playCountdownTring(number) {
    if (this.isMuted) return;
    this.ensureContext();

    // Optionally speak using Web Speech API for cartoon voice effect
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(String(number));
        utter.rate = 1.35;
        utter.pitch = 1.6; // playful higher pitch
        utter.volume = 0.8;
        window.speechSynthesis.speak(utter);
      } catch (e) {}
    }

    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const baseFreq = number === 1 ? 1760 : (number === 2 ? 1567 : 1396); // A6, G6, F6

      // Metallic triangle bell with dual harmonic oscillators
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(baseFreq, now);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(baseFreq * 2.756, now); // inharmonic bell overtone

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.55);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.55);
      osc2.stop(now + 0.55);
    } catch (err) {}
  }

  /**
   * Bright, triumphant "GO!" / "DRAW!" chime
   */
  playGoChime() {
    if (this.isMuted) return;
    this.ensureContext();

    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance('Draw!');
        utter.rate = 1.4;
        utter.pitch = 1.8;
        utter.volume = 0.9;
        window.speechSynthesis.speak(utter);
      } catch (e) {}
    }

    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5]; // C5, E5, G5, C6, E6
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = now + (i * 0.05);

        osc.type = i === notes.length - 1 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.25, startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.7);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.7);
      });
    } catch (err) {}
  }

  /**
   * Woodblock / mechanical clock tick during final 10 seconds of round
   */
  playTick(isUrgent = false) {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      const freq = isUrgent ? 950 : 700;
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.035);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.035);
    } catch (err) {}
  }

  /**
   * Rapid ascending coin / score tallying sound
   */
  playScoreTally(step = 0) {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      const freq = 450 + (step % 12) * 55;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch (err) {}
  }

  /**
   * Cartoon brassy celebration fanfare for podium screen
   */
  playFanfare() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // Vibrant celebratory melody: C4, E4, G4, C5, G4, C5 (held)
      const melody = [
        { f: 523.25, t: 0.00, d: 0.14 },
        { f: 659.25, t: 0.14, d: 0.14 },
        { f: 783.99, t: 0.28, d: 0.14 },
        { f: 1046.50, t: 0.42, d: 0.35 },
        { f: 880.00, t: 0.80, d: 0.18 },
        { f: 1046.50, t: 1.00, d: 0.85 }
      ];

      melody.forEach(note => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const start = now + note.t;

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(note.f, start);

        // Lowpass filter to give brassy cartoon warmth
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2200, start);

        gain.gain.setValueAtTime(0.001, start);
        gain.gain.linearRampToValueAtTime(0.2, start + 0.03);
        gain.gain.setValueAtTime(0.2, start + note.d * 0.7);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + note.d);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(start);
        osc.stop(start + note.d);
      });
    } catch (err) {}
  }

  /**
   * Sound when a bot joins matchmaking
   */
  playPlayerJoin() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(640, now + 0.12);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.12);
    } catch (err) {}
  }

  /**
   * Eraser / Swoosh sound
   */
  playSwoosh() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.1);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch (err) {}
  }
}

// Global audio singleton
window.sound = new SoundEngine();
