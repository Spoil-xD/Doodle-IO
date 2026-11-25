/**
 * Doodle IO - Responsive Canvas Drawing Engine
 * High-DPI, Pointer Events, pressure sensitivity, Bezier curve smoothing,
 * undo/redo history stack, and artwork coverage analysis.
 */
class DrawingCanvas {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });

    // Drawing state
    this.isDrawing = false;
    this.currentColor = '#1e1e2e'; // default dark outline color
    this.baseBrushSize = 10;
    this.isEraser = false;
    this.pressureEnabled = true;

    // Stroke smoothing points
    this.currentStroke = [];
    this.strokeCount = 0;
    this.colorsUsed = new Set();
    this.drawingStartTime = 0;

    // History for Undo/Redo
    this.undoStack = [];
    this.redoStack = [];
    this.maxHistory = 30;

    // Viewport / Scaling
    this.dpr = window.devicePixelRatio || 1;
    this.setupCanvas();
    this.bindEvents();

    // Resize observer
    this.resizeObserver = new ResizeObserver(() => this.handleResize());
    this.resizeObserver.observe(this.canvas.parentElement);
  }

  setupCanvas() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    const w = Math.max(300, Math.floor(rect.width));
    const h = Math.max(300, Math.floor(rect.height));

    this.dpr = window.devicePixelRatio || 1;
    this.canvas.width = w * this.dpr;
    this.canvas.height = h * this.dpr;
    this.canvas.style.width = `${w}px`;
    this.canvas.style.height = `${h}px`;

    this.ctx.scale(this.dpr, this.dpr);
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';

    // White background
    this.fillBackground();
    this.saveState();
  }

  handleResize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    const w = Math.max(300, Math.floor(rect.width));
    const h = Math.max(300, Math.floor(rect.height));

    if (Math.abs(this.canvas.width - w * this.dpr) < 4 && Math.abs(this.canvas.height - h * this.dpr) < 4) {
      return;
    }

    // Preserve existing content
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = this.canvas.width;
    tempCanvas.height = this.canvas.height;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(this.canvas, 0, 0);

    this.dpr = window.devicePixelRatio || 1;
    this.canvas.width = w * this.dpr;
    this.canvas.height = h * this.dpr;
    this.canvas.style.width = `${w}px`;
    this.canvas.style.height = `${h}px`;

    this.ctx.scale(this.dpr, this.dpr);
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';

    this.fillBackground();
    this.ctx.drawImage(tempCanvas, 0, 0, tempCanvas.width / this.dpr, tempCanvas.height / this.dpr);
  }

  fillBackground() {
    this.ctx.save();
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.fillRect(0, 0, this.canvas.width / this.dpr, this.canvas.height / this.dpr);
    this.ctx.restore();
  }

  getPointerPos(e) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      pressure: (e.pressure !== undefined && e.pressure > 0) ? e.pressure : 0.5
    };
  }

  bindEvents() {
    // Pointer Events for unified Mouse, Touch, Stylus handling
    this.canvas.addEventListener('pointerdown', (e) => this.onPointerDown(e));
    this.canvas.addEventListener('pointermove', (e) => this.onPointerMove(e));
    this.canvas.addEventListener('pointerup', (e) => this.onPointerUp(e));
    this.canvas.addEventListener('pointercancel', (e) => this.onPointerUp(e));
    this.canvas.addEventListener('pointerleave', (e) => {
      if (this.isDrawing) this.onPointerUp(e);
    });

    // Prevent default touch gestures (scrolling/pinch) on canvas
    this.canvas.style.touchAction = 'none';
  }

  onPointerDown(e) {
    if (e.button !== undefined && e.button !== 0) return; // only left click / primary touch
    this.isDrawing = true;
    this.canvas.setPointerCapture(e.pointerId);

    const pos = this.getPointerPos(e);
    this.currentStroke = [pos];

    if (!this.drawingStartTime) {
      this.drawingStartTime = Date.now();
    }
    this.strokeCount++;

    if (!this.isEraser) {
      this.colorsUsed.add(this.currentColor);
    }

    // Draw single dot on click
    this.ctx.save();
    this.ctx.beginPath();
    const effectiveWidth = this.calculateStrokeWidth(pos.pressure);
    this.ctx.fillStyle = this.isEraser ? '#FFFFFF' : this.currentColor;
    this.ctx.arc(pos.x, pos.y, effectiveWidth / 2, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.restore();
  }

  onPointerMove(e) {
    if (!this.isDrawing) return;
    const pos = this.getPointerPos(e);
    this.currentStroke.push(pos);

    // Smooth spline rendering between recent points
    const points = this.currentStroke;
    const len = points.length;

    if (len >= 3) {
      const p0 = points[len - 3];
      const p1 = points[len - 2];
      const p2 = points[len - 1];

      // Midpoints for quadratic bezier smoothing
      const mid1 = { x: (p0.x + p1.x) / 2, y: (p0.y + p1.y) / 2 };
      const mid2 = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
      const avgPressure = (p1.pressure + p2.pressure) / 2;
      const strokeWidth = this.calculateStrokeWidth(avgPressure);

      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.moveTo(mid1.x, mid1.y);
      this.ctx.quadraticCurveTo(p1.x, p1.y, mid2.x, mid2.y);
      this.ctx.strokeStyle = this.isEraser ? '#FFFFFF' : this.currentColor;
      this.ctx.lineWidth = strokeWidth;
      this.ctx.lineCap = 'round';
      this.ctx.lineJoin = 'round';
      this.ctx.stroke();
      this.ctx.restore();
    } else if (len === 2) {
      const p0 = points[0];
      const p1 = points[1];
      const strokeWidth = this.calculateStrokeWidth(p1.pressure);

      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.moveTo(p0.x, p0.y);
      this.ctx.lineTo(p1.x, p1.y);
      this.ctx.strokeStyle = this.isEraser ? '#FFFFFF' : this.currentColor;
      this.ctx.lineWidth = strokeWidth;
      this.ctx.lineCap = 'round';
      this.ctx.lineJoin = 'round';
      this.ctx.stroke();
      this.ctx.restore();
    }
  }

  onPointerUp(e) {
    if (!this.isDrawing) return;
    this.isDrawing = false;
    try {
      this.canvas.releasePointerCapture(e.pointerId);
    } catch (err) {}

    this.currentStroke = [];
    this.saveState();
  }

  calculateStrokeWidth(pressure) {
    if (this.isEraser) {
      return this.baseBrushSize * 2.5;
    }
    if (this.pressureEnabled && pressure !== undefined) {
      // Modulate width by pressure (0.4x to 1.4x)
      return Math.max(2, this.baseBrushSize * (0.4 + pressure * 0.9));
    }
    return this.baseBrushSize;
  }

  setColor(hex) {
    this.currentColor = hex;
    this.isEraser = false;
    if (window.sound) window.sound.playToolSelect(520);
  }

  setBrushSize(size) {
    this.baseBrushSize = size;
    if (window.sound) window.sound.playToolSelect(440);
  }

  toggleEraser(active) {
    this.isEraser = active !== undefined ? active : !this.isEraser;
    if (window.sound) {
      if (this.isEraser) window.sound.playSwoosh();
      else window.sound.playToolSelect(600);
    }
  }

  saveState() {
    try {
      const imgData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
      this.undoStack.push(imgData);
      if (this.undoStack.length > this.maxHistory) {
        this.undoStack.shift();
      }
      this.redoStack = []; // Clear redo on new action
      this.updateUndoRedoButtons();
    } catch (e) {}
  }

  undo() {
    if (this.undoStack.length <= 1) return;
    const currentState = this.undoStack.pop();
    this.redoStack.push(currentState);

    const prevState = this.undoStack[this.undoStack.length - 1];
    this.ctx.putImageData(prevState, 0, 0);

    if (window.sound) window.sound.playPop(380);
    this.updateUndoRedoButtons();
  }

  redo() {
    if (this.redoStack.length === 0) return;
    const nextState = this.redoStack.pop();
    this.undoStack.push(nextState);
    this.ctx.putImageData(nextState, 0, 0);

    if (window.sound) window.sound.playPop(580);
    this.updateUndoRedoButtons();
  }

  clear() {
    this.fillBackground();
    this.saveState();
    if (window.sound) window.sound.playSwoosh();
  }

  updateUndoRedoButtons() {
    const undoBtn = document.getElementById('btn-undo');
    const redoBtn = document.getElementById('btn-redo');
    if (undoBtn) {
      undoBtn.disabled = this.undoStack.length <= 1;
      undoBtn.classList.toggle('disabled', this.undoStack.length <= 1);
    }
    if (redoBtn) {
      redoBtn.disabled = this.redoStack.length === 0;
      redoBtn.classList.toggle('disabled', this.redoStack.length === 0);
    }
  }

  resetRound() {
    this.strokeCount = 0;
    this.colorsUsed.clear();
    this.drawingStartTime = 0;
    this.undoStack = [];
    this.redoStack = [];
    this.handleResize();
    this.fillBackground();
    this.saveState();
  }

  /**
   * Analyzes player drawing effort & stroke coverage for scoring (0 - 1000 points)
   */
  evaluateDrawing() {
    try {
      const imgData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
      const data = imgData.data;
      const totalPixels = this.canvas.width * this.canvas.height;
      let nonWhitePixels = 0;

      // Sample pixels efficiently
      const step = 8; // sample every 8th pixel for speed
      let sampledTotal = 0;

      for (let i = 0; i < data.length; i += 4 * step) {
        sampledTotal++;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        // If not white / near-white
        if (r < 245 || g < 245 || b < 245) {
          nonWhitePixels++;
        }
      }

      const coverageRatio = nonWhitePixels / sampledTotal; // e.g. 0.05 to 0.40

      // 1. Coverage points (up to 450 pts)
      // Good doodles usually occupy 8% to 25% of pixels
      let coverageScore = 0;
      if (coverageRatio > 0.02) {
        coverageScore = Math.min(450, Math.floor(coverageRatio * 1800));
      } else {
        coverageScore = Math.floor(coverageRatio * 2000);
      }

      // 2. Stroke count & effort points (up to 300 pts)
      let effortScore = Math.min(300, this.strokeCount * 18);

      // 3. Color variety points (up to 250 pts)
      const colorCount = Math.max(1, this.colorsUsed.size);
      let colorScore = Math.min(250, colorCount * 65);

      let totalScore = coverageScore + effortScore + colorScore;

      // Ensure a reasonable competitive score if user actively doodled
      if (this.strokeCount >= 3 && coverageRatio > 0.02) {
        totalScore = Math.max(650, Math.min(995, totalScore));
      } else if (this.strokeCount > 0) {
        totalScore = Math.max(250, Math.min(650, totalScore));
      } else {
        totalScore = 50; // practically blank
      }

      // Add a slight fun randomized bonus
      const bonus = Math.floor(Math.random() * 15);
      totalScore = Math.min(1000, totalScore + bonus);

      return {
        totalScore,
        coverageRatio: (coverageRatio * 100).toFixed(1),
        strokes: this.strokeCount,
        colors: colorCount,
        breakdown: {
          coverage: coverageScore,
          effort: effortScore,
          variety: colorScore
        }
      };
    } catch (err) {
      return {
        totalScore: 780,
        coverageRatio: '15.0',
        strokes: Math.max(5, this.strokeCount),
        colors: 2,
        breakdown: { coverage: 350, effort: 250, variety: 180 }
      };
    }
  }

  /**
   * Exports high quality image data URL for round gallery showcase
   */
  toDataURL() {
    return this.canvas.toDataURL('image/png');
  }
}

window.DrawingCanvas = DrawingCanvas;
