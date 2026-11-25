/**
 * Doodle IO - Main Game Controller & State Machine
 */

// Available avatars for player
const AVATARS = ['🎨', '🐱', '🐶', '🦊', '🐼', '🤖', '🦄', '🚀', '👾', '🍕', '👑', '🧙', '🦁', '🐵', '🐸', '🐙'];

const RANDOM_NICKNAMES = [
  'Picasso Jr.', 'DoodleLord', 'SketchyCat', 'ColorWizard',
  'BrushBoss', 'PixelPal', 'MasterDoodle', 'StarryNight',
  'CrayonKing', 'InkSpiller', 'ArtVandal', 'DaVinci99'
];

const PALETTE_COLORS = [
  '#1e1e2e', '#FFFFFF', '#636e72', '#FF4757',
  '#FF6B6B', '#FFA502', '#FFD12A', '#2ED573',
  '#10AC84', '#70A1FF', '#1E90FF', '#3742FA',
  '#9B59B6', '#FF9FF3', '#833471', '#A0522D'
];

class GameManager {
  constructor() {
    this.currentScreen = 'screen-start';
    this.currentRound = 1;
    this.totalRounds = 5;
    this.matchTopics = [];
    this.currentTopic = null;

    // Player State
    this.player = {
      nickname: 'DoodleMaster',
      avatar: '🎨',
      totalScore: 0,
      roundScores: []
    };

    // Sub-systems
    this.botManager = new window.BotManager();
    this.drawingCanvas = null;

    // Timer state
    this.roundDurationSec = 180; // 3 minutes as requested
    this.timerRemaining = 180;
    this.roundTimerInterval = null;
    this.intermissionTimerInterval = null;

    // Confetti
    this.confettiRunning = false;
    this.confettiParticles = [];

    this.init();
  }

  init() {
    this.setupAvatars();
    this.setupPalette();
    this.bindDOMEvents();
    this.setupConfetti();
  }

  setupAvatars() {
    const grid = document.getElementById('avatar-grid');
    if (!grid) return;
    grid.innerHTML = '';

    AVATARS.forEach((emoji, idx) => {
      const el = document.createElement('div');
      el.className = `avatar-option ${idx === 0 ? 'selected' : ''}`;
      el.textContent = emoji;
      el.addEventListener('click', () => {
        document.querySelectorAll('.avatar-option').forEach(a => a.classList.remove('selected'));
        el.classList.add('selected');
        this.player.avatar = emoji;
        if (window.sound) window.sound.playPop(550);
      });
      grid.appendChild(el);
    });
  }

  setupPalette() {
    const palette = document.getElementById('color-palette');
    if (!palette) return;
    palette.innerHTML = '';

    PALETTE_COLORS.forEach((hex, idx) => {
      const swatch = document.createElement('div');
      swatch.className = `color-swatch ${idx === 0 ? 'active' : ''}`;
      swatch.style.backgroundColor = hex;
      if (hex === '#FFFFFF') {
        swatch.style.border = '2px dashed #b2bec3';
      }
      swatch.addEventListener('click', () => {
        document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');
        if (this.drawingCanvas) {
          this.drawingCanvas.setColor(hex);
        }
      });
      palette.appendChild(swatch);
    });
  }

  bindDOMEvents() {
    // Sound Toggle
    const soundToggle = document.getElementById('btn-sound-toggle');
    const soundIcon = document.getElementById('sound-icon');
    if (soundToggle) {
      soundToggle.addEventListener('click', () => {
        if (window.sound) {
          const muted = window.sound.toggleMute();
          soundIcon.textContent = muted ? '🔇' : '🔊';
        }
      });
    }

    // Randomize Nickname
    const diceBtn = document.getElementById('btn-random-name');
    const nickInput = document.getElementById('player-nickname');
    if (diceBtn && nickInput) {
      diceBtn.addEventListener('click', () => {
        const rand = RANDOM_NICKNAMES[Math.floor(Math.random() * RANDOM_NICKNAMES.length)];
        nickInput.value = rand;
        this.player.nickname = rand;
        if (window.sound) window.sound.playPop(620);
      });
      nickInput.addEventListener('input', (e) => {
        this.player.nickname = e.target.value.trim() || 'Artist';
      });
    }

    // Start Game Button
    const startBtn = document.getElementById('btn-start-game');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        if (nickInput && nickInput.value.trim()) {
          this.player.nickname = nickInput.value.trim();
        }
        if (window.sound) {
          window.sound.ensureContext();
          window.sound.playPop(520);
        }
        this.startMatchmaking();
      });
    }

    // Done Early Button
    const doneEarlyBtn = document.getElementById('btn-done-early');
    if (doneEarlyBtn) {
      doneEarlyBtn.addEventListener('click', () => {
        if (window.sound) window.sound.playPop(750);
        this.finishRoundEarly();
      });
    }

    // Brush Size Buttons
    document.querySelectorAll('.brush-size-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.brush-size-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const size = parseInt(btn.dataset.size, 10) || 10;
        if (this.drawingCanvas) this.drawingCanvas.setBrushSize(size);
      });
    });

    // Eraser Button
    const eraserBtn = document.getElementById('btn-eraser');
    if (eraserBtn) {
      eraserBtn.addEventListener('click', () => {
        const isNowEraser = !eraserBtn.classList.contains('btn-primary');
        eraserBtn.classList.toggle('btn-primary', isNowEraser);
        eraserBtn.classList.toggle('btn-secondary', !isNowEraser);
        if (this.drawingCanvas) this.drawingCanvas.toggleEraser(isNowEraser);
      });
    }

    // Undo / Redo / Clear
    const undoBtn = document.getElementById('btn-undo');
    if (undoBtn) undoBtn.addEventListener('click', () => this.drawingCanvas && this.drawingCanvas.undo());

    const redoBtn = document.getElementById('btn-redo');
    if (redoBtn) redoBtn.addEventListener('click', () => this.drawingCanvas && this.drawingCanvas.redo());

    const clearBtn = document.getElementById('btn-clear');
    if (clearBtn) clearBtn.addEventListener('click', () => this.drawingCanvas && this.drawingCanvas.clear());

    // Next Round Button in Intermission
    const nextRoundBtn = document.getElementById('btn-next-round');
    if (nextRoundBtn) {
      nextRoundBtn.addEventListener('click', () => {
        if (this.intermissionTimerInterval) clearInterval(this.intermissionTimerInterval);
        if (window.sound) window.sound.playPop(500);
        this.advanceToNextRound();
      });
    }

    // Play Again Button
    const playAgainBtn = document.getElementById('btn-play-again');
    if (playAgainBtn) {
      playAgainBtn.addEventListener('click', () => {
        if (window.sound) window.sound.playPop(650);
        this.resetMatchToStart();
      });
    }

    // Keyboard Shortcuts (Ctrl+Z, Ctrl+Y)
    window.addEventListener('keydown', (e) => {
      if (this.currentScreen !== 'screen-arena') return;
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          if (this.drawingCanvas) this.drawingCanvas.redo();
        } else {
          if (this.drawingCanvas) this.drawingCanvas.undo();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        if (this.drawingCanvas) this.drawingCanvas.redo();
      }
    });
  }

  showScreen(screenId) {
    document.querySelectorAll('.game-screen').forEach(scr => scr.classList.remove('active'));
    const target = document.getElementById(screenId);
    if (target) {
      target.classList.add('active');
      this.currentScreen = screenId;
    }
  }

  /**
   * Screen 2: Matchmaking Lobby
   */
  startMatchmaking() {
    this.showScreen('screen-lobby');

    // Pick 4 bots and 5 unique topics
    const bots = this.botManager.pickMatchBots();
    const shuffledTopics = [...window.GAME_TOPICS].sort(() => Math.random() - 0.5);
    this.matchTopics = shuffledTopics.slice(0, this.totalRounds);
    this.currentRound = 1;
    this.player.totalScore = 0;
    this.player.roundScores = [];

    // Render 5 roster slots (User ready + 4 placeholders)
    const rosterEl = document.getElementById('lobby-roster');
    const statusTextEl = document.getElementById('lobby-status-text');
    if (!rosterEl) return;

    rosterEl.innerHTML = `
      <div class="player-slot filled is-you">
        <div class="player-slot-left">
          <div class="slot-avatar">${this.player.avatar}</div>
          <div class="slot-info">
            <div class="slot-name">${this.escapeHTML(this.player.nickname)} (You)</div>
            <div class="slot-tag">Pro Doodler</div>
          </div>
        </div>
        <span class="slot-status-pill pill-ready">Ready! ✓</span>
      </div>
      ${[0, 1, 2, 3].map(i => `
        <div id="lobby-slot-${i}" class="player-slot">
          <div class="player-slot-left">
            <div id="slot-avatar-${i}" class="slot-avatar">⏳</div>
            <div class="slot-info">
              <div id="slot-name-${i}" class="slot-name">Searching artist...</div>
              <div id="slot-tag-${i}" class="slot-tag">Waiting for player</div>
            </div>
          </div>
          <span id="slot-pill-${i}" class="slot-status-pill pill-searching">Connecting...</span>
        </div>
      `).join('')}
    `;

    // Dynamically reveal bots one by one over 3.2 seconds
    bots.forEach((bot, idx) => {
      setTimeout(() => {
        const slotEl = document.getElementById(`lobby-slot-${idx}`);
        const avatarEl = document.getElementById(`slot-avatar-${idx}`);
        const nameEl = document.getElementById(`slot-name-${idx}`);
        const tagEl = document.getElementById(`slot-tag-${idx}`);
        const pillEl = document.getElementById(`slot-pill-${idx}`);

        if (slotEl) {
          slotEl.classList.add('filled');
          avatarEl.textContent = bot.avatar;
          nameEl.textContent = bot.name;
          tagEl.textContent = bot.title;
          pillEl.className = 'slot-status-pill pill-ready';
          pillEl.textContent = 'Ready! ✓';
          if (statusTextEl) statusTextEl.textContent = `Found artist ${idx + 2}/5: ${bot.name}!`;
          if (window.sound) window.sound.playPlayerJoin();
        }
      }, 700 + idx * 750);
    });

    // All players ready, transition to Round 1 Countdown
    setTimeout(() => {
      if (statusTextEl) {
        statusTextEl.textContent = '✨ All 5 Artists Ready! Launching Round 1...';
        statusTextEl.style.color = 'var(--coral-red)';
      }
      setTimeout(() => {
        this.startRoundCountdown();
      }, 900);
    }, 700 + 4 * 750 + 400);
  }

  /**
   * Screen 3: Pre-Round Countdown Overlay
   */
  startRoundCountdown() {
    this.currentTopic = this.matchTopics[this.currentRound - 1];

    // Transition to Arena in background
    this.showScreen('screen-arena');
    this.prepareArena();

    // Show Countdown Overlay
    const overlay = document.getElementById('countdown-overlay');
    const roundBadge = document.getElementById('countdown-round-badge');
    const topicEmoji = document.getElementById('countdown-topic-emoji');
    const topicName = document.getElementById('countdown-topic-name');
    const countNumber = document.getElementById('countdown-number');

    if (roundBadge) roundBadge.textContent = `ROUND ${this.currentRound} OF ${this.totalRounds}`;
    if (topicEmoji) topicEmoji.textContent = this.currentTopic.emoji;
    if (topicName) topicName.textContent = this.currentTopic.name;
    if (overlay) overlay.classList.add('active');

    // Countdown sequence: 3 -> 2 -> 1 -> GO!
    let count = 3;
    if (countNumber) countNumber.textContent = count;
    if (window.sound) window.sound.playCountdownTring(count);

    const countInterval = setInterval(() => {
      count--;
      if (count > 0) {
        if (countNumber) countNumber.textContent = count;
        if (window.sound) window.sound.playCountdownTring(count);
      } else if (count === 0) {
        if (countNumber) {
          countNumber.textContent = 'DRAW!';
          countNumber.style.color = 'var(--mint-green)';
        }
        if (window.sound) window.sound.playGoChime();
      } else {
        clearInterval(countInterval);
        if (overlay) overlay.classList.remove('active');
        if (countNumber) {
          countNumber.style.color = 'var(--yellow)';
        }
        // Start Round Timer & Bot simulation
        this.startArenaDrawing();
      }
    }, 1000);
  }

  /**
   * Screen 4: Drawing Arena Preparation & Execution
   */
  prepareArena() {
    // Round info in header
    const roundInd = document.getElementById('arena-round-indicator');
    const topicEmoji = document.getElementById('arena-topic-emoji');
    const topicName = document.getElementById('arena-topic-name');

    if (roundInd) roundInd.textContent = `Round ${this.currentRound}/${this.totalRounds}`;
    if (topicEmoji) topicEmoji.textContent = this.currentTopic.emoji;
    if (topicName) topicName.textContent = this.currentTopic.name;

    // Initialize Canvas if not already done
    if (!this.drawingCanvas) {
      const canvasEl = document.getElementById('player-canvas');
      this.drawingCanvas = new window.DrawingCanvas(canvasEl);
    } else {
      this.drawingCanvas.resetRound();
    }

    // Reset Eraser state button
    const eraserBtn = document.getElementById('btn-eraser');
    if (eraserBtn) {
      eraserBtn.classList.remove('btn-primary');
      eraserBtn.classList.add('btn-secondary');
    }

    // Render Bot Cards on the sidebar
    const botContainer = document.getElementById('bot-cards-container');
    if (botContainer) {
      botContainer.innerHTML = this.botManager.activeBots.map((bot, idx) => `
        <div class="bot-card">
          <div class="bot-card-top">
            <div class="bot-card-avatar">${bot.avatar}</div>
            <div style="flex: 1; min-width: 0;">
              <div class="bot-card-name">${this.escapeHTML(bot.name)}</div>
              <div style="font-size: 0.72rem; color: #747d8c; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${bot.title}</div>
            </div>
          </div>
          <div class="bot-preview-box">
            <canvas id="bot-canvas-${idx}" class="bot-mini-canvas" width="140" height="120"></canvas>
          </div>
          <div class="bot-status-row">
            <div id="bot-status-${idx}" class="bot-status-text">Thinking... 💡</div>
            <div class="bot-progress-track">
              <div id="bot-meter-${idx}" class="bot-progress-bar"></div>
            </div>
          </div>
        </div>
      `).join('');
    }
  }

  startArenaDrawing() {
    this.timerRemaining = this.roundDurationSec; // 180s
    this.updateTimerUI();

    // Start bot simulation
    this.botManager.startRound(this.currentTopic);

    // Timer Interval
    if (this.roundTimerInterval) clearInterval(this.roundTimerInterval);
    this.roundTimerInterval = setInterval(() => {
      this.timerRemaining--;
      this.updateTimerUI();

      // Sound ticks during final 10 seconds
      if (this.timerRemaining <= 10 && this.timerRemaining > 0) {
        if (window.sound) window.sound.playTick(this.timerRemaining <= 4);
      }

      if (this.timerRemaining <= 0) {
        clearInterval(this.roundTimerInterval);
        this.endRound();
      }
    }, 1000);
  }

  updateTimerUI() {
    const clockEl = document.getElementById('arena-timer-clock');
    const fillEl = document.getElementById('arena-timer-fill');

    const mins = Math.floor(this.timerRemaining / 60);
    const secs = this.timerRemaining % 60;
    const timeStr = `${mins}:${secs < 10 ? '0' : ''}${secs}`;

    if (clockEl) clockEl.textContent = timeStr;

    if (fillEl) {
      const pct = (this.timerRemaining / this.roundDurationSec) * 100;
      fillEl.style.width = `${Math.max(0, pct)}%`;

      if (this.timerRemaining <= 10) {
        fillEl.className = 'timer-fill danger';
      } else if (this.timerRemaining <= 30) {
        fillEl.className = 'timer-fill warning';
      } else {
        fillEl.className = 'timer-fill';
      }
    }
  }

  finishRoundEarly() {
    if (this.roundTimerInterval) clearInterval(this.roundTimerInterval);
    this.botManager.fastForward();

    const doneBtn = document.getElementById('btn-done-early');
    if (doneBtn) {
      doneBtn.disabled = true;
      doneBtn.textContent = 'Submitted! ⏳';
    }

    setTimeout(() => {
      if (doneBtn) {
        doneBtn.disabled = false;
        doneBtn.textContent = '🏁 Done Early';
      }
      this.endRound();
    }, 600);
  }

  endRound() {
    if (this.roundTimerInterval) clearInterval(this.roundTimerInterval);
    this.botManager.stopSimulation();

    // 1. Evaluate player drawing
    const playerEval = this.drawingCanvas.evaluateDrawing();
    this.player.roundScores.push(playerEval.totalScore);
    this.player.totalScore += playerEval.totalScore;

    // 2. Evaluate bot scores
    this.botManager.calculateRoundScores();

    // 3. Show Intermission Screen
    this.showIntermission(playerEval);
  }

  /**
   * Screen 5: Round Scoring Intermission
   */
  showIntermission(playerEval) {
    this.showScreen('screen-intermission');

    const titleEl = document.getElementById('intermission-round-title');
    const subEl = document.getElementById('intermission-topic-prompt');
    if (titleEl) titleEl.textContent = `Round ${this.currentRound} Complete!`;
    if (subEl) subEl.textContent = `Topic: ${this.currentTopic.emoji} ${this.currentTopic.name} Showcase`;

    // Populate Evaluation breakdown
    const covEl = document.getElementById('eval-coverage-pts');
    const colEl = document.getElementById('eval-color-pts');
    const effEl = document.getElementById('eval-effort-pts');
    const totEl = document.getElementById('eval-total-pts');

    if (covEl) covEl.textContent = `+${playerEval.breakdown.coverage} pts`;
    if (colEl) colEl.textContent = `+${playerEval.breakdown.variety} pts`;
    if (effEl) effEl.textContent = `+${playerEval.breakdown.effort} pts`;
    if (totEl) totEl.textContent = `${playerEval.totalScore} pts`;

    // Populate 5-player gallery
    const galleryEl = document.getElementById('intermission-gallery');
    if (galleryEl) {
      const playerArtworkData = this.drawingCanvas.toDataURL();

      // Procedural images for bots
      const botImages = this.botManager.activeBots.map((bot, idx) => {
        const offCanvas = document.createElement('canvas');
        offCanvas.width = 240;
        offCanvas.height = 240;
        const ctx = offCanvas.getContext('2d');
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, 240, 240);
        const vIdx = bot.variantIndex !== undefined ? bot.variantIndex : idx;
        window.drawTopicProcedural(ctx, this.currentTopic, 1.0, vIdx);
        const styleName = (this.currentTopic.variants && this.currentTopic.variants[vIdx % this.currentTopic.variants.length])
          ? this.currentTopic.variants[vIdx % this.currentTopic.variants.length].style
          : bot.title;
        return {
          bot,
          dataUrl: offCanvas.toDataURL('image/png'),
          styleName
        };
      });

      galleryEl.innerHTML = `
        <!-- Player Artwork -->
        <div class="art-card player-card">
          <span class="art-badge-tag">YOUR MASTERPIECE</span>
          <div class="art-frame">
            <img class="art-img" src="${playerArtworkData}" alt="Player Artwork">
          </div>
          <div class="art-author-info">
            <span>${this.player.avatar}</span>
            <span>${this.escapeHTML(this.player.nickname)}</span>
          </div>
          <div class="round-pts-badge">+${playerEval.totalScore} pts</div>
        </div>

        <!-- 4 Bot Artworks -->
        ${botImages.map(item => `
          <div class="art-card">
            <span class="art-badge-tag" style="background: #EBF3FF;">${item.styleName}</span>
            <div class="art-frame">
              <img class="art-img" src="${item.dataUrl}" alt="${item.bot.name} Artwork">
            </div>
            <div class="art-author-info">
              <span>${item.bot.avatar}</span>
              <span>${this.escapeHTML(item.bot.name)}</span>
            </div>
            <div style="font-size: 0.72rem; color: #747d8c; font-weight: 600;">${item.bot.title}</div>
            <div class="round-pts-badge">+${item.bot.currentRoundScore} pts</div>
          </div>
        `).join('')}
      `;
    }

    // Populate Leaderboard
    const lbListEl = document.getElementById('intermission-lb-list');
    if (lbListEl) {
      const allPlayers = [
        { name: this.player.nickname, avatar: this.player.avatar, totalScore: this.player.totalScore, isYou: true },
        ...this.botManager.activeBots.map(b => ({ name: b.name, avatar: b.avatar, totalScore: b.totalScore, isYou: false }))
      ].sort((a, b) => b.totalScore - a.totalScore);

      lbListEl.innerHTML = allPlayers.map((p, rank) => `
        <div class="lb-item ${p.isYou ? 'is-you' : ''}">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span>#${rank + 1}</span>
            <span>${p.avatar}</span>
            <span>${this.escapeHTML(p.name)} ${p.isYou ? '(You)' : ''}</span>
          </div>
          <span>${p.totalScore.toLocaleString()} pts</span>
        </div>
      `).join('');
    }

    // Play score tally sound
    for (let s = 0; s < 6; s++) {
      setTimeout(() => {
        if (window.sound) window.sound.playScoreTally(s);
      }, s * 90);
    }

    // 6-second auto-advance countdown
    let remainingIntermission = 6;
    const badgeEl = document.getElementById('intermission-timer-badge');
    const nextBtn = document.getElementById('btn-next-round');

    if (badgeEl) badgeEl.textContent = remainingIntermission;
    if (nextBtn) {
      if (this.currentRound >= this.totalRounds) {
        nextBtn.innerHTML = `See Final Results 🏆 (<span id="intermission-timer-badge">${remainingIntermission}</span>s)`;
      } else {
        nextBtn.innerHTML = `Next Round ➡️ (<span id="intermission-timer-badge">${remainingIntermission}</span>s)`;
      }
    }

    if (this.intermissionTimerInterval) clearInterval(this.intermissionTimerInterval);
    this.intermissionTimerInterval = setInterval(() => {
      remainingIntermission--;
      const curBadge = document.getElementById('intermission-timer-badge');
      if (curBadge) curBadge.textContent = remainingIntermission;

      if (remainingIntermission <= 0) {
        clearInterval(this.intermissionTimerInterval);
        this.advanceToNextRound();
      }
    }, 1000);
  }

  advanceToNextRound() {
    if (this.intermissionTimerInterval) clearInterval(this.intermissionTimerInterval);

    if (this.currentRound < this.totalRounds) {
      this.currentRound++;
      this.startRoundCountdown();
    } else {
      this.showFinalPodium();
    }
  }

  /**
   * Screen 6: Final Results & Podium
   */
  showFinalPodium() {
    this.showScreen('screen-podium');

    // Aggregate all 5 players
    const allPlayers = [
      { name: this.player.nickname, avatar: this.player.avatar, totalScore: this.player.totalScore, isYou: true },
      ...this.botManager.activeBots.map(b => ({ name: b.name, avatar: b.avatar, totalScore: b.totalScore, isYou: false }))
    ].sort((a, b) => b.totalScore - a.totalScore);

    const first = allPlayers[0];
    const second = allPlayers[1];
    const third = allPlayers[2];
    const fourth = allPlayers[3];
    const fifth = allPlayers[4];

    // Populate Top 3 Podium
    const setPodium = (num, p) => {
      const av = document.getElementById(`podium-avatar-${num}`);
      const nm = document.getElementById(`podium-name-${num}`);
      const sc = document.getElementById(`podium-score-${num}`);
      if (av) av.textContent = p.avatar;
      if (nm) nm.textContent = `${p.name} ${p.isYou ? '(You)' : ''}`;
      if (sc) sc.textContent = `${p.totalScore.toLocaleString()} pts`;
    };

    setPodium(1, first);
    setPodium(2, second);
    setPodium(3, third);

    // Populate 4th & 5th runners-up
    const setRunner = (num, p) => {
      const av = document.getElementById(`runner-avatar-${num}`);
      const nm = document.getElementById(`runner-name-${num}`);
      const sc = document.getElementById(`runner-score-${num}`);
      if (av) av.textContent = p.avatar;
      if (nm) nm.textContent = `${p.name} ${p.isYou ? '(You)' : ''}`;
      if (sc) sc.textContent = `${p.totalScore.toLocaleString()} pts`;
    };

    setRunner(4, fourth);
    setRunner(5, fifth);

    // Outcome subtitle
    const subEl = document.getElementById('final-outcome-subtitle');
    if (subEl) {
      if (first.isYou) {
        subEl.textContent = '🎉 UNBELIEVABLE! You took 1ST PLACE and crowned DOODLE CHAMPION!';
      } else if (second.isYou || third.isYou) {
        subEl.textContent = '🌟 OUTSTANDING PERFORMANCE! You made the Winner Podium!';
      } else {
        subEl.textContent = '🎨 Great games all around! Practice makes perfect in Doodle IO!';
      }
    }

    // Sound fanfare
    if (window.sound) window.sound.playFanfare();

    // Trigger celebration confetti
    this.startConfetti();
  }

  /**
   * Confetti Engine (Lightweight HTML5 Canvas)
   */
  setupConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();
  }

  startConfetti() {
    this.confettiRunning = true;
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const colors = ['#FFD12A', '#FF4757', '#2ED573', '#4D96FF', '#FFA502', '#FF9FF3', '#9B59B6'];
    this.confettiParticles = [];

    for (let i = 0; i < 120; i++) {
      this.confettiParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * -canvas.height * 0.8,
        w: 8 + Math.random() * 8,
        h: 8 + Math.random() * 12,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 4,
        vy: 2 + Math.random() * 5,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.15
      });
    }

    const render = () => {
      if (!this.confettiRunning) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      this.confettiParticles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vRot;

        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        ctx.strokeStyle = '#1e1e2e';
        ctx.lineWidth = 1.5;

        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.strokeRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });

      requestAnimationFrame(render);
    };

    requestAnimationFrame(render);

    // Stop after 8 seconds
    setTimeout(() => {
      this.confettiRunning = false;
    }, 8500);
  }

  resetMatchToStart() {
    this.confettiRunning = false;
    if (this.roundTimerInterval) clearInterval(this.roundTimerInterval);
    if (this.intermissionTimerInterval) clearInterval(this.intermissionTimerInterval);
    this.botManager.stopSimulation();

    this.currentRound = 1;
    this.player.totalScore = 0;
    this.player.roundScores = [];

    this.showScreen('screen-start');
  }

  escapeHTML(str) {
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }
}

// Instantiate on DOM load
window.addEventListener('DOMContentLoaded', () => {
  window.game = new GameManager();
});
