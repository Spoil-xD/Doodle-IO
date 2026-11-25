/**
 * Doodle IO - Humanized Bot Competitors Engine
 * - 60+ Realistic Online Multiplayer Handles with Country Flags and Playstyles
 * - 4 Distinct Drawing Styles (each bot draws a completely different variant!)
 * - Realistic Human Pacing: Bots draw progressively across the 180s timer
 */

const REALISTIC_NAMES_POOL = [
  'Sarah_Doodles', 'PixelCat99', 'AlexDraws', 'MochiMuncher', 'NeonArtist',
  'SirDoodleLot', 'MayaPaints', 'CrayonKnight', 'CoffeeAndInk', 'Lucas_BR',
  'PastelCloud', 'WobblyLinez', 'TheRealLeo', 'PencilThief', 'SunnyDay_Art',
  'Kev_In_Paris', 'SketchyBoi23', 'LunaArt', 'ZackAttack_', 'MonaLisa2',
  'NekoDrawer', 'ChibiMaster', 'BananaPajamas', 'SpeedyTurtle', 'DoodleDuck',
  'ArtAttack_99', 'CosmicCrayon', 'Toast_Lover', 'PancakePal', 'GhostSketcher',
  'DragonDoodler', 'ZenArtist', 'RetroGamer88', 'BobaAddict', 'StarlightDoodle',
  'MightyPen', 'CaptainPencil', 'DerpyDrawer', 'InkMaster_Sam', 'Chloe_Colors',
  'RainbowSprinkle', 'AstroDoodler', 'SillyGoose42', 'CrayonMuncher', 'StylusKing',
  'Emma_Sketch', 'Oliver_Arts', 'DoodleVibe', 'PaintSplash99', 'FelixTheCat',
  'Bella_Bespoke', 'VibrantVibe', 'PocketArtist', 'ArtisanBro', 'CookieDough'
];

const COUNTRY_TAGS = [
  'USA 🇺🇸 • Level 22',
  'Japan 🇯🇵 • Stylus Pro',
  'UK 🇬🇧 • Casual Doodler',
  'Canada 🇨🇦 • Tablet Player',
  'France 🇫🇷 • Coffee & Ink',
  'Germany 🇩🇪 • Speed Artist',
  'Brazil 🇧🇷 • Mouse Drawer',
  'Australia 🇦🇺 • Fast Sketcher',
  'S. Korea 🇰🇷 • Chibi Fan',
  'Italy 🇮🇹 • Pizza Lover',
  'Spain 🇪🇸 • Colorful Vibes',
  'India 🇮🇳 • Master Doodler',
  'Sweden 🇸🇪 • Clean Lines',
  'Netherlands 🇳🇱 • Digital Brush'
];

const BOT_AVATARS = ['🦊', '🐱', '🐶', '🐼', '🦁', '🐸', '🐙', '🦄', '👾', '🤖', '🚀', '🍕', '🍩', '🍦', '🎸', '👑', '🧙', '🥑', '🍓', '🌻', '🎨', '✏️', '🐻', '🐰'];

class BotManager {
  constructor() {
    this.activeBots = [];
    this.simulationInterval = null;
    this.currentTopic = null;
    this.roundSecondsElapsed = 0;
  }

  /**
   * Generates 4 completely unique online competitors with distinct names,
   * flags, avatars, and drawing archetype indices (0, 1, 2, 3).
   */
  pickMatchBots() {
    // Shuffle name pool and country pool
    const shuffledNames = [...REALISTIC_NAMES_POOL].sort(() => Math.random() - 0.5);
    const shuffledTags = [...COUNTRY_TAGS].sort(() => Math.random() - 0.5);
    const shuffledAvatars = [...BOT_AVATARS].sort(() => Math.random() - 0.5);

    // 4 Distinct personality speeds for 180s timer:
    // Bot 0: Speedy artist (finishes around 120-135s)
    // Bot 1: Balanced artist (finishes around 145-160s)
    // Bot 2: Detailed perfectionist (finishes around 165-175s)
    // Bot 3: Down to the wire (finishes around 172-178s)
    const targetFinishTimes = [
      125 + Math.floor(Math.random() * 15),
      148 + Math.floor(Math.random() * 14),
      166 + Math.floor(Math.random() * 10),
      174 + Math.floor(Math.random() * 5)
    ].sort(() => Math.random() - 0.5);

    this.activeBots = [0, 1, 2, 3].map(index => {
      const name = shuffledNames[index];
      const tag = shuffledTags[index % shuffledTags.length];
      const avatar = shuffledAvatars[index % shuffledAvatars.length];
      const targetFinish = targetFinishTimes[index];

      return {
        id: `bot-${index + 1}`,
        name: name,
        avatar: avatar,
        title: tag,
        variantIndex: index, // Each bot gets variant 0, 1, 2, or 3
        totalScore: 0,
        roundScores: [],
        currentProgress: 0,
        isFinished: false,
        targetFinishTime: targetFinish,
        thinkDelay: 4 + Math.floor(Math.random() * 6), // 4-9s thinking before first stroke
        baseSkill: 0.78 + Math.random() * 0.18,
        statusText: 'Thinking of ideas... 💡'
      };
    });

    return this.activeBots;
  }

  /**
   * Resets bots for a new round
   */
  startRound(topic) {
    this.currentTopic = topic;
    this.roundSecondsElapsed = 0;

    this.activeBots.forEach((bot, index) => {
      bot.currentProgress = 0;
      bot.isFinished = false;
      bot.statusText = 'Thinking of ideas... 💡';
      bot.currentRoundScore = 0;

      // Reset mini canvas
      const canvas = document.getElementById(`bot-canvas-${index}`);
      if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    });

    this.startSimulation();
  }

  /**
   * Runs the human-paced simulation loop
   */
  startSimulation() {
    if (this.simulationInterval) clearInterval(this.simulationInterval);

    // Tick every 500ms
    this.simulationInterval = setInterval(() => {
      this.roundSecondsElapsed += 0.5;
      let allFinished = true;

      this.activeBots.forEach((bot, index) => {
        if (!bot.isFinished) {
          // If still in thinking phase
          if (this.roundSecondsElapsed < bot.thinkDelay) {
            bot.statusText = 'Thinking of ideas... 💡';
            bot.currentProgress = 0;
          } else {
            // Drawing phase: progress proportional to elapsed time relative to their target finish time
            const drawingTime = this.roundSecondsElapsed - bot.thinkDelay;
            const totalDrawTime = bot.targetFinishTime - bot.thinkDelay;
            let progress = drawingTime / totalDrawTime;

            // Add subtle human hesitation (pauses between strokes)
            const hesitation = Math.sin(this.roundSecondsElapsed * 1.5 + index) * 0.03;
            progress = Math.max(0, Math.min(1.0, progress + hesitation));

            if (this.roundSecondsElapsed >= bot.targetFinishTime || progress >= 1.0) {
              bot.currentProgress = 1.0;
              bot.isFinished = true;
              bot.statusText = 'Finished! 🏁';
            } else {
              bot.currentProgress = progress;

              // Human-like progressive status updates
              if (progress < 0.25) {
                bot.statusText = 'Sketching outline... ✏️';
              } else if (progress < 0.50) {
                bot.statusText = 'Choosing colors... 🎨';
              } else if (progress < 0.75) {
                bot.statusText = 'Painting base colors... 🖌️';
              } else if (progress < 0.92) {
                bot.statusText = 'Adding details & shading... ✨';
              } else {
                bot.statusText = 'Almost done! ⏳';
              }
            }

            // Render live mini-canvas
            this.renderBotCanvas(index, bot.currentProgress, bot.variantIndex);
          }
        }

        if (!bot.isFinished) allFinished = false;

        // Update card UI
        const statusEl = document.getElementById(`bot-status-${index}`);
        if (statusEl) statusEl.textContent = bot.statusText;

        const meterEl = document.getElementById(`bot-meter-${index}`);
        if (meterEl) {
          meterEl.style.width = `${Math.min(100, Math.round(bot.currentProgress * 100))}%`;
        }
      });

      if (allFinished) {
        clearInterval(this.simulationInterval);
      }
    }, 500);
  }

  /**
   * Renders the bot's current drawing state on its mini canvas
   */
  renderBotCanvas(index, progress, variantIndex) {
    const canvas = document.getElementById(`bot-canvas-${index}`);
    if (!canvas || !this.currentTopic) return;

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (window.drawTopicProcedural) {
      window.drawTopicProcedural(ctx, this.currentTopic, progress, variantIndex);
    }
  }

  /**
   * Fast forward all bots immediately when the user clicks "Done Early"
   */
  fastForward() {
    this.activeBots.forEach((bot, index) => {
      bot.currentProgress = 1.0;
      bot.isFinished = true;
      bot.statusText = 'Finished! 🏁';
      this.renderBotCanvas(index, 1.0, bot.variantIndex);

      const statusEl = document.getElementById(`bot-status-${index}`);
      if (statusEl) statusEl.textContent = 'Finished! 🏁';

      const meterEl = document.getElementById(`bot-meter-${index}`);
      if (meterEl) meterEl.style.width = '100%';
    });

    if (this.simulationInterval) {
      clearInterval(this.simulationInterval);
    }
  }

  stopSimulation() {
    if (this.simulationInterval) {
      clearInterval(this.simulationInterval);
    }
  }

  /**
   * Calculates realistic round scores for bots (650 - 980 pts)
   */
  calculateRoundScores() {
    this.activeBots.forEach(bot => {
      const variance = (Math.random() * 140) - 70;
      const roundScore = Math.round(800 * bot.baseSkill + variance);
      const clampedScore = Math.max(640, Math.min(985, roundScore));

      bot.currentRoundScore = clampedScore;
      bot.totalScore += clampedScore;
      bot.roundScores.push(clampedScore);
    });
  }
}

window.BotManager = BotManager;
