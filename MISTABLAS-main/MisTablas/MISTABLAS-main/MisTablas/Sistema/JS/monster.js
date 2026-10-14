/**
 * PLATAFORMA EDUCATIVA "MUNDO MULTIPLICA"
 * Módulo Creativo: "Crea tu Monstruo Multiplicador"
 * Actividad relajante, artística y no evaluativa post-SIMCE (4° Básico)
 */

const MONSTER_PACKS = {
  default: {
    name: "Pack Clásico Relajante",
    icon: "👾",
    consignas: [
      {
        id: "eyes",
        calc: "2 × 3 = 6",
        icon: "👀",
        title: "6 Ojos",
        instruction: "Dibuja 6 ojos en su cara o cuerpo (¡grandes, chiquitos o saltones!).",
        color: "#4f46e5",
        bg: "#eef2ff"
      },
      {
        id: "spots",
        calc: "3 × 4 = 12",
        icon: "🟣",
        title: "12 Manchas",
        instruction: "Dibuja 12 manchas de colores en su piel, lomo o alas.",
        color: "#9333ea",
        bg: "#faf5ff"
      },
      {
        id: "teeth",
        calc: "2 × 5 = 10",
        icon: "🦷",
        title: "10 Dientes",
        instruction: "Dibuja 10 dientes divertidos (chistosos, afilados o de sonrisa tierna).",
        color: "#059669",
        bg: "#ecfdf5"
      },
      {
        id: "limbs",
        calc: "4 × 2 = 8",
        icon: "🐾",
        title: "8 Patas o Antenas",
        instruction: "Dibuja 8 patas, tentáculos, antenas o accesorios a tu gusto.",
        color: "#d97706",
        bg: "#fffbeb"
      },
      {
        id: "stars",
        calc: "3 × 3 = 9",
        icon: "⭐",
        title: "9 Estrellas",
        instruction: "Dibuja 9 estrellas mágicas flotando alrededor de tu criatura.",
        color: "#db2777",
        bg: "#fdf2f8"
      }
    ]
  },
  space: {
    name: "Pack Galáctico",
    icon: "🚀",
    consignas: [
      {
        id: "horns",
        calc: "2 × 4 = 8",
        icon: "✨",
        title: "8 Cuernos / Antenas",
        instruction: "Dibuja 8 cuernitos o antenas espaciales que capten señales.",
        color: "#6366f1",
        bg: "#eef2ff"
      },
      {
        id: "claws",
        calc: "5 × 2 = 10",
        icon: "🐾",
        title: "10 Garras suaves",
        instruction: "Dibuja 10 garras o patitas cósmicas para trepar asteroides.",
        color: "#0284c7",
        bg: "#f0f9ff"
      },
      {
        id: "wings",
        calc: "3 × 2 = 6",
        icon: "🪽",
        title: "6 Alas o Aletas",
        instruction: "Dibuja 6 alitas gravitacionales para flotar en el espacio.",
        color: "#7c3aed",
        bg: "#faf5ff"
      },
      {
        id: "moons",
        calc: "4 × 3 = 12",
        icon: "🪐",
        title: "12 Anillos o Cráteres",
        instruction: "Dibuja 12 pequeños cráteres, lunas o anillos protectores.",
        color: "#ea580c",
        bg: "#fff7ed"
      }
    ]
  }
};

const MONSTER_EXAMPLES = [
  {
    name: "Octo-Chispas ⚡",
    power: "Dispara burbujas luminosas cuando se ríe a carcajadas.",
    likes: "Galletitas con chispas de chocolate y dormir en nubes de algodón.",
    favMult: "2 × 3 = 6 (¡por sus 6 ojitos curiosos!)",
    badgeColor: "#f59e0b",
    emojiAvatar: "🐙",
    summary: "Criatura redonda y suave con 6 ojos saltones, 12 manchas violetas, 10 dientes picarones, 8 tentáculos y 9 estrellas brillantes."
  },
  {
    name: "Nubecita Mágica ☁️",
    power: "Hace llover caramelos de menta en los días calurosos.",
    likes: "Ver arcoíris y jugar a las carreras de saltos.",
    favMult: "3 × 3 = 9 (¡las 9 estrellitas que la acompañan!)",
    badgeColor: "#38bdf8",
    emojiAvatar: "🦄",
    summary: "Monstruito esponjoso con 6 ojos amigables, 12 gotitas de color, 10 dientecitos sonrientes, 8 patitas nube y 9 estrellas de brillo."
  },
  {
    name: "Dino-Dulce 🦖",
    power: "Ruge tan bajito que suena como ronroneo de gatito.",
    likes: "Dibujar con témperas y los abrazos calentitos.",
    favMult: "4 × 2 = 8 (¡el número de sus patitas saltarinas!)",
    badgeColor: "#10b981",
    emojiAvatar: "🦕",
    summary: "Dinosaurio kawaii de color verde menta con 6 ojos juguetones, 12 lunares, 10 dientes de leche, 8 garras tiernas y 9 estrellas."
  }
];

class MonsterCreatorModule {
  constructor(app) {
    this.app = app;
    this.currentPackKey = 'default';
    this.consignasStatus = {}; // { eyes: true, spots: false, ... }
    
    // Canvas state
    this.canvas = null;
    this.ctx = null;
    this.isDrawing = false;
    this.currentTool = 'brush'; // 'brush', 'eraser', 'stamp'
    this.brushColor = '#4f46e5';
    this.brushSize = 8;
    this.currentStamp = '👀';
    this.undoStack = [];
    this.maxUndo = 15;
    
    // Student data fields
    this.monsterData = {
      name: '',
      power: '',
      likes: '',
      favMult: ''
    };
  }

  init() {
    this.loadSavedMonster();
    this.setupEventListeners();
    this.renderConsignas();
    this.initCanvas();
  }

  onOpen() {
    // Refresh canvas size when switching tab
    setTimeout(() => {
      this.resizeCanvas(true);
      this.renderConsignas();
    }, 100);
  }

  loadSavedMonster() {
    try {
      const saved = localStorage.getItem('misTablas_saved_monster');
      if (saved) {
        const parsed = JSON.parse(saved);
        this.monsterData = Object.assign(this.monsterData, parsed.data || {});
        this.consignasStatus = parsed.consignasStatus || {};
      }
    } catch (e) {
      console.warn('Error al cargar monstruo guardado', e);
    }
  }

  saveMonsterToStorage() {
    try {
      const payload = {
        data: this.monsterData,
        consignasStatus: this.consignasStatus,
        lastUpdated: new Date().toISOString()
      };
      if (this.canvas) {
        payload.canvasDataUrl = this.canvas.toDataURL('image/png');
      }
      localStorage.setItem('misTablas_saved_monster', JSON.stringify(payload));
    } catch (e) {
      console.warn('Error al guardar monstruo', e);
    }
  }

  /* =========================================================================
     CONSIGNAS DE MULTIPLICACIÓN (Máximo 4 o 5 para relajar al estudiante)
     ========================================================================= */
  renderConsignas() {
    const container = document.getElementById('monsterConsignasList');
    if (!container) return;
    container.innerHTML = '';

    const pack = MONSTER_PACKS[this.currentPackKey] || MONSTER_PACKS.default;
    const consignas = pack.consignas;

    let completedCount = 0;

    consignas.forEach((item, index) => {
      const isDone = !!this.consignasStatus[item.id];
      if (isDone) completedCount++;

      const card = document.createElement('div');
      card.className = `monster-consigna-card ${isDone ? 'completed' : ''}`;
      card.dataset.id = item.id;
      card.style.borderLeftColor = item.color;

      card.innerHTML = `
        <div class="consigna-left">
          <div class="consigna-math-badge" style="background: ${item.bg}; color: ${item.color}; border: 2px solid ${item.color};">
            <span class="consigna-calc">${item.calc}</span>
          </div>
          <div class="consigna-body">
            <h4 class="consigna-title">
              <span class="consigna-icon">${item.icon}</span> 
              ${item.title}
            </h4>
            <p class="consigna-desc">${item.instruction}</p>
          </div>
        </div>

        <button type="button" class="btn-check-consigna ${isDone ? 'checked' : ''}" title="Marcar como dibujado">
          ${isDone ? '✓ ¡Dibujado!' : '○ Marcar'}
        </button>
      `;

      const checkBtn = card.querySelector('.btn-check-consigna');
      checkBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleConsigna(item.id);
      });

      card.addEventListener('click', () => {
        this.toggleConsigna(item.id);
      });

      container.appendChild(card);
    });

    // Update progress pill
    const progressEl = document.getElementById('monsterProgressPill');
    if (progressEl) {
      progressEl.innerHTML = `🌟 Consignas listas: <strong>${completedCount} de ${consignas.length}</strong>`;
      if (completedCount === consignas.length) {
        progressEl.classList.add('all-done');
      } else {
        progressEl.classList.remove('all-done');
      }
    }
  }

  toggleConsigna(id) {
    this.consignasStatus[id] = !this.consignasStatus[id];
    if (this.consignasStatus[id]) {
      this.app.sound.playSuccess();
      this.app.triggerConfetti();
      this.app.showToast('✨ ¡Misión de dibujo completada! ¡Se ve genial!', 'success');
    } else {
      this.app.sound.playPop();
    }
    this.saveMonsterToStorage();
    this.renderConsignas();
  }

  /* =========================================================================
     CANVAS INTERACTIVO DE DIBUJO Y COLOREO
     ========================================================================= */
  initCanvas() {
    this.canvas = document.getElementById('monsterCanvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });

    this.resizeCanvas(false);
    this.clearCanvas(false);

    // Restore previous drawing if available
    try {
      const saved = localStorage.getItem('misTablas_saved_monster');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.canvasDataUrl) {
          const img = new Image();
          img.onload = () => {
            this.ctx.drawImage(img, 0, 0, this.canvas.width / (window.devicePixelRatio || 1), this.canvas.height / (window.devicePixelRatio || 1));
            this.pushUndoState();
          };
          img.src = parsed.canvasDataUrl;
        }
      }
    } catch (e) {}

    // Pointer events (Touch + Pen + Mouse unified)
    this.canvas.addEventListener('pointerdown', (e) => this.handlePointerDown(e));
    this.canvas.addEventListener('pointermove', (e) => this.handlePointerMove(e));
    window.addEventListener('pointerup', () => this.handlePointerUp());
    this.canvas.addEventListener('pointercancel', () => this.handlePointerUp());

    window.addEventListener('resize', () => {
      this.resizeCanvas(true);
    });
  }

  resizeCanvas(preserveContent = true) {
    if (!this.canvas || !this.ctx) return;
    const parent = this.canvas.parentElement;
    if (!parent) return;

    const rect = parent.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const displayWidth = Math.max(320, Math.floor(rect.width));
    const displayHeight = Math.max(420, Math.min(540, Math.floor(window.innerHeight * 0.55)));

    // Save current content if preserving
    let tempCanvas = null;
    if (preserveContent && this.canvas.width > 0 && this.canvas.height > 0) {
      tempCanvas = document.createElement('canvas');
      tempCanvas.width = this.canvas.width;
      tempCanvas.height = this.canvas.height;
      tempCanvas.getContext('2d').drawImage(this.canvas, 0, 0);
    }

    this.canvas.width = displayWidth * dpr;
    this.canvas.height = displayHeight * dpr;
    this.canvas.style.width = `${displayWidth}px`;
    this.canvas.style.height = `${displayHeight}px`;

    this.ctx.scale(dpr, dpr);

    if (tempCanvas) {
      this.ctx.drawImage(tempCanvas, 0, 0, displayWidth, displayHeight);
    } else {
      this.clearCanvas(false);
    }
  }

  getCanvasPos(e) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }

  handlePointerDown(e) {
    e.preventDefault();
    this.isDrawing = true;
    this.canvas.setPointerCapture(e.pointerId);

    const pos = this.getCanvasPos(e);

    if (this.currentTool === 'stamp') {
      this.placeStamp(pos.x, pos.y);
      this.pushUndoState();
      this.isDrawing = false;
      return;
    }

    this.ctx.beginPath();
    this.ctx.moveTo(pos.x, pos.y);
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';

    if (this.currentTool === 'eraser') {
      this.ctx.strokeStyle = '#ffffff';
      this.ctx.lineWidth = this.brushSize * 2.5;
    } else {
      this.ctx.strokeStyle = this.brushColor;
      this.ctx.lineWidth = this.brushSize;
    }

    // Single click dot
    this.ctx.lineTo(pos.x, pos.y);
    this.ctx.stroke();
  }

  handlePointerMove(e) {
    if (!this.isDrawing) return;
    if (this.currentTool === 'stamp') return;
    e.preventDefault();

    const pos = this.getCanvasPos(e);
    this.ctx.lineTo(pos.x, pos.y);
    this.ctx.stroke();
  }

  handlePointerUp() {
    if (!this.isDrawing) return;
    this.isDrawing = false;
    this.ctx.closePath();
    this.pushUndoState();
    this.saveMonsterToStorage();
  }

  placeStamp(x, y) {
    this.app.sound.playPop();
    this.ctx.save();
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    const stampSize = Math.max(32, this.brushSize * 4);
    this.ctx.font = `${stampSize}px 'Apple Color Emoji', 'Segoe UI Emoji', sans-serif`;
    this.ctx.fillText(this.currentStamp, x, y);
    this.ctx.restore();
    this.saveMonsterToStorage();
  }

  pushUndoState() {
    if (!this.canvas) return;
    try {
      if (this.undoStack.length >= this.maxUndo) {
        this.undoStack.shift();
      }
      this.undoStack.push(this.canvas.toDataURL('image/png'));
    } catch (e) {}
  }

  undo() {
    if (this.undoStack.length <= 1) {
      this.clearCanvas(false);
      return;
    }
    this.app.sound.playPop();
    this.undoStack.pop(); // Remove current state
    const previousState = this.undoStack[this.undoStack.length - 1];
    const img = new Image();
    img.onload = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = this.canvas.width / dpr;
      const h = this.canvas.height / dpr;
      this.ctx.clearRect(0, 0, w, h);
      this.ctx.fillStyle = '#ffffff';
      this.ctx.fillRect(0, 0, w, h);
      this.ctx.drawImage(img, 0, 0, w, h);
      this.saveMonsterToStorage();
    };
    img.src = previousState;
  }

  clearCanvas(confirmFirst = true) {
    if (confirmFirst) {
      const ok = confirm('¿Deseas borrar todo el dibujo y comenzar de nuevo?');
      if (!ok) return;
      this.app.sound.playPop();
    }
    const dpr = window.devicePixelRatio || 1;
    const w = this.canvas.width / dpr;
    const h = this.canvas.height / dpr;
    this.ctx.clearRect(0, 0, w, h);
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillRect(0, 0, w, h);
    this.pushUndoState();
    this.saveMonsterToStorage();
  }

  /* =========================================================================
     CONFIGURACIÓN DE EVENTOS Y FORMULARIO
     ========================================================================= */
  setupEventListeners() {
    // Form fields
    const nameInput = document.getElementById('monsterNameInput');
    const powerInput = document.getElementById('monsterPowerInput');
    const likesInput = document.getElementById('monsterLikesInput');
    const favMultInput = document.getElementById('monsterFavMultInput');

    if (nameInput) {
      nameInput.value = this.monsterData.name || '';
      nameInput.addEventListener('input', (e) => {
        this.monsterData.name = e.target.value;
        this.updatePreviewBadge();
        this.saveMonsterToStorage();
      });
    }

    if (powerInput) {
      powerInput.value = this.monsterData.power || '';
      powerInput.addEventListener('input', (e) => {
        this.monsterData.power = e.target.value;
        this.updatePreviewBadge();
        this.saveMonsterToStorage();
      });
    }

    if (likesInput) {
      likesInput.value = this.monsterData.likes || '';
      likesInput.addEventListener('input', (e) => {
        this.monsterData.likes = e.target.value;
        this.updatePreviewBadge();
        this.saveMonsterToStorage();
      });
    }

    if (favMultInput) {
      favMultInput.value = this.monsterData.favMult || '';
      favMultInput.addEventListener('input', (e) => {
        this.monsterData.favMult = e.target.value;
        this.updatePreviewBadge();
        this.saveMonsterToStorage();
      });
    }

    this.updatePreviewBadge();

    // Canvas tools (Pincel, Goma, Stickers)
    const btnBrush = document.getElementById('toolBrushBtn');
    const btnEraser = document.getElementById('toolEraserBtn');
    const btnUndo = document.getElementById('toolUndoBtn');
    const btnClear = document.getElementById('toolClearBtn');

    if (btnBrush) {
      btnBrush.addEventListener('click', () => {
        this.currentTool = 'brush';
        this.updateToolButtonsUI();
      });
    }

    if (btnEraser) {
      btnEraser.addEventListener('click', () => {
        this.currentTool = 'eraser';
        this.updateToolButtonsUI();
      });
    }

    if (btnUndo) {
      btnUndo.addEventListener('click', () => this.undo());
    }

    if (btnClear) {
      btnClear.addEventListener('click', () => this.clearCanvas(true));
    }

    // Color Swatches
    document.querySelectorAll('.monster-color-swatch').forEach(swatch => {
      swatch.addEventListener('click', () => {
        this.app.sound.playPop();
        document.querySelectorAll('.monster-color-swatch').forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');
        this.brushColor = swatch.dataset.color;
        this.currentTool = 'brush';
        this.updateToolButtonsUI();
      });
    });

    const customColorInput = document.getElementById('customColorPicker');
    if (customColorInput) {
      customColorInput.addEventListener('input', (e) => {
        this.brushColor = e.target.value;
        this.currentTool = 'brush';
        this.updateToolButtonsUI();
      });
    }

    // Brush Sizes
    document.querySelectorAll('.brush-size-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.app.sound.playPop();
        document.querySelectorAll('.brush-size-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.brushSize = parseInt(btn.dataset.size, 10) || 8;
      });
    });

    // Stamp Buttons
    document.querySelectorAll('.stamp-btn').forEach(stampBtn => {
      stampBtn.addEventListener('click', () => {
        this.app.sound.playPop();
        document.querySelectorAll('.stamp-btn').forEach(s => s.classList.remove('active'));
        stampBtn.classList.add('active');
        this.currentStamp = stampBtn.dataset.stamp;
        this.currentTool = 'stamp';
        this.updateToolButtonsUI();
        this.app.showToast(`✨ Estampa lista: ¡toca el lienzo para estampar ${this.currentStamp}!`, 'star');
      });
    });

    // Download PNG
    const btnDownload = document.getElementById('btnDownloadMonster');
    if (btnDownload) {
      btnDownload.addEventListener('click', () => this.downloadMonsterPNG());
    }

    // Save to Album
    const btnSaveAlbum = document.getElementById('btnSaveMonsterAlbum');
    if (btnSaveAlbum) {
      btnSaveAlbum.addEventListener('click', () => {
        this.app.sound.playSuccess();
        this.app.triggerConfetti();
        this.saveMonsterToStorage();
        this.app.showToast('🏆 ¡Monstruo guardado con éxito en tu perfil escolar!', 'success');
      });
    }

    // Print buttons
    const btnPrintBlank = document.getElementById('btnPrintBlankSheet');
    if (btnPrintBlank) {
      btnPrintBlank.addEventListener('click', () => this.openPrintView('blank'));
    }

    const btnPrintFilled = document.getElementById('btnPrintFilledSheet');
    if (btnPrintFilled) {
      btnPrintFilled.addEventListener('click', () => this.openPrintView('filled'));
    }

    // Modal Examples
    const btnShowExamples = document.getElementById('btnShowMonsterExamples');
    if (btnShowExamples) {
      btnShowExamples.addEventListener('click', () => this.openExamplesModal());
    }

    const closeExamplesBtn = document.getElementById('monsterExamplesClose');
    if (closeExamplesBtn) {
      closeExamplesBtn.addEventListener('click', () => {
        document.getElementById('monsterExamplesOverlay').classList.remove('open');
      });
    }

    // Switch Consignas Pack
    const btnTogglePack = document.getElementById('btnToggleConsignasPack');
    if (btnTogglePack) {
      btnTogglePack.addEventListener('click', () => {
        this.app.sound.playPop();
        this.currentPackKey = (this.currentPackKey === 'default') ? 'space' : 'default';
        const pack = MONSTER_PACKS[this.currentPackKey];
        btnTogglePack.textContent = `🎲 Cambiar Pack (${pack.name})`;
        this.renderConsignas();
        this.app.showToast(`✨ Se activó el ${pack.name}`, 'star');
      });
    }
  }

  updateToolButtonsUI() {
    const btnBrush = document.getElementById('toolBrushBtn');
    const btnEraser = document.getElementById('toolEraserBtn');
    if (btnBrush) btnBrush.classList.toggle('active', this.currentTool === 'brush');
    if (btnEraser) btnEraser.classList.toggle('active', this.currentTool === 'eraser');
    if (this.currentTool !== 'stamp') {
      document.querySelectorAll('.stamp-btn').forEach(s => s.classList.remove('active'));
    }
  }

  updatePreviewBadge() {
    const badgeName = document.getElementById('previewMonsterName');
    const badgePower = document.getElementById('previewMonsterPower');
    const badgeLikes = document.getElementById('previewMonsterLikes');
    const badgeFav = document.getElementById('previewMonsterFavMult');

    if (badgeName) badgeName.textContent = this.monsterData.name || 'Sin bautizar aún';
    if (badgePower) badgePower.textContent = this.monsterData.power ? `⚡ ${this.monsterData.power}` : 'Escribe su superpoder arriba';
    if (badgeLikes) badgeLikes.textContent = this.monsterData.likes ? `💖 Le gusta: ${this.monsterData.likes}` : 'Escribe qué le gusta arriba';
    if (badgeFav) badgeFav.textContent = this.monsterData.favMult ? `🔢 Multiplicación: ${this.monsterData.favMult}` : 'Elige su multiplicación favorita';
  }

  /* =========================================================================
     DESCARGA DE LA CRIATURA EN IMAGEN PNG
     ========================================================================= */
  downloadMonsterPNG() {
    if (!this.canvas) return;
    this.app.sound.playSuccess();

    // Create a framed composition canvas
    const exportCanvas = document.createElement('canvas');
    const dpr = 2; // High resolution export
    exportCanvas.width = 800 * dpr;
    exportCanvas.height = 950 * dpr;
    const ctx = exportCanvas.getContext('2d');
    ctx.scale(dpr, dpr);

    // Cute background gradient
    const grad = ctx.createLinearGradient(0, 0, 800, 950);
    grad.addColorStop(0, '#fefbf6');
    grad.addColorStop(0.5, '#fdf2f8');
    grad.addColorStop(1, '#eef2ff');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 800, 950);

    // Decorative frame
    ctx.strokeStyle = '#c7d2fe';
    ctx.lineWidth = 8;
    ctx.strokeRect(16, 16, 768, 918);

    // Header badge
    ctx.fillStyle = '#4f46e5';
    ctx.font = "bold 32px 'Fredoka', 'Quicksand', sans-serif";
    ctx.textAlign = 'center';
    ctx.fillText("🎨 ¡Mi Monstruo Multiplicador! 👾", 400, 64);

    const studentName = (this.app.getStudent() && this.app.getStudent().name) || 'Estudiante';
    ctx.fillStyle = '#64748b';
    ctx.font = "bold 18px 'Quicksand', sans-serif";
    ctx.fillText(`Creado por: ${studentName} • 4° Básico • Post-SIMCE`, 400, 96);

    // Drawing box with rounded border
    const drawBoxX = 50;
    const drawBoxY = 120;
    const drawBoxW = 700;
    const drawBoxH = 550;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(drawBoxX, drawBoxY, drawBoxW, drawBoxH);
    ctx.strokeStyle = '#818cf8';
    ctx.lineWidth = 4;
    ctx.strokeRect(drawBoxX, drawBoxY, drawBoxW, drawBoxH);

    // Draw the monster image scaled cleanly inside
    ctx.drawImage(this.canvas, drawBoxX, drawBoxY, drawBoxW, drawBoxH);

    // Footer info card
    const cardY = 690;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect(drawBoxX, cardY, drawBoxW, 210, 16);
    ctx.fill();
    ctx.strokeStyle = '#fde047';
    ctx.lineWidth = 4;
    ctx.stroke();

    const mName = this.monsterData.name || 'Monstruo Amigable';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#1e1b4b';
    ctx.font = "bold 26px 'Fredoka', sans-serif";
    ctx.fillText(`Nombre: ${mName}`, drawBoxX + 24, cardY + 44);

    ctx.font = "bold 17px 'Quicksand', sans-serif";
    ctx.fillStyle = '#0f766e';
    ctx.fillText(`⚡ Poder Especial: ${this.monsterData.power || 'Super amigable y veloz'}`, drawBoxX + 24, cardY + 84);

    ctx.fillStyle = '#b45309';
    ctx.fillText(`💖 Le gusta: ${this.monsterData.likes || 'Aprender y jugar con amigos'}`, drawBoxX + 24, cardY + 124);

    ctx.fillStyle = '#4338ca';
    ctx.fillText(`🔢 Multiplicación Favorita: ${this.monsterData.favMult || '2 × 3 = 6'}`, drawBoxX + 24, cardY + 164);

    // Trigger download
    const link = document.createElement('a');
    link.download = `Monstruo_Multiplicador_${studentName.replace(/\s+/g, '_')}.png`;
    link.href = exportCanvas.toDataURL('image/png');
    link.click();

    this.app.showToast('💾 ¡Descarga completada con éxito!', 'success');
  }

  /* =========================================================================
     IMPRESIÓN DE LA FICHA EN PAPEL (BLANCO O CON DIBUJO)
     ========================================================================= */
  openPrintView(mode = 'blank') {
    this.app.sound.playPop();

    const printableContainer = document.getElementById('printableWorksheet');
    if (!printableContainer) return;

    const studentName = (this.app.getStudent() && this.app.getStudent().name) || '';
    const dateStr = new Date().toLocaleDateString('es-CL');

    const pack = MONSTER_PACKS[this.currentPackKey] || MONSTER_PACKS.default;

    printableContainer.innerHTML = `
      <div class="print-page-layout">
        <!-- Encabezado Escolar Formal y Lúdico -->
        <header class="print-header">
          <div class="print-brand-row">
            <div class="print-logo-box">
              <span class="print-logo-icon">⭐</span>
              <div>
                <h1 class="print-main-title">MUNDO MULTIPLICA • 4° BÁSICO</h1>
                <p class="print-sub-title">Actividad Creativa Post-SIMCE: “Crea tu monstruo multiplicador”</p>
              </div>
            </div>
            <div class="print-ribbon-pill">¡Relajo y Creatividad! 🎨</div>
          </div>

          <!-- Campos de Identificación del Estudiante -->
          <div class="print-meta-grid">
            <div class="print-meta-item">
              <span class="print-meta-label">Estudiante:</span>
              <span class="print-meta-line">${mode === 'filled' ? studentName : '_________________________________________'}</span>
            </div>
            <div class="print-meta-item">
              <span class="print-meta-label">Curso:</span>
              <span class="print-meta-line">4° Año Básico</span>
            </div>
            <div class="print-meta-item">
              <span class="print-meta-label">Fecha:</span>
              <span class="print-meta-line">${dateStr}</span>
            </div>
          </div>
        </header>

        <!-- Instrucción Amigable y Cálida -->
        <section class="print-instruction-box">
          <p>
            <strong>¡Gran esfuerzo en el SIMCE! 🌟</strong> Ahora descansa la mente y echa a volar tu imaginación. 
            Inventa y dibuja a tu propio monstruo o criatura. Sus partes dependen de estas 
            <strong>${pack.consignas.length} multiplicaciones simples</strong>:
          </p>
        </section>

        <!-- Las 4 o 5 Consignas Claras y Grandes -->
        <section class="print-consignas-grid">
          ${pack.consignas.map(c => `
            <div class="print-consigna-pill">
              <div class="print-calc-box">${c.calc}</div>
              <div class="print-calc-text">➔ ${c.title}: ${c.instruction}</div>
              <div class="print-check-box">☐</div>
            </div>
          `).join('')}
        </section>

        <!-- Espacio Grande para Dibujar y Colorear -->
        <section class="print-drawing-frame">
          <div class="print-frame-label">
            🎨 Espacio de Dibujo y Color (¡Sé libre de inventar como tú quieras!)
          </div>
          <div class="print-drawing-inner" id="printDrawingInner">
            ${mode === 'filled' && this.canvas ? `
              <img src="${this.canvas.toDataURL('image/png')}" alt="Dibujo del Monstruo" class="print-monster-img">
            ` : `
              <div class="print-blank-watermark">
                <span>👾</span>
                <p>Dibuja aquí a tu Monstruo Multiplicador con lápices de colores ✨</p>
              </div>
            `}
          </div>
        </section>

        <!-- Datos del Monstruo para Escribir -->
        <footer class="print-profile-boxes">
          <div class="print-profile-row">
            <div class="print-field">
              <label>🏷️ Nombre de mi monstruo:</label>
              <div class="print-line-fill">${mode === 'filled' ? (this.monsterData.name || '') : ''}</div>
            </div>
            <div class="print-field">
              <label>⚡ Su poder especial:</label>
              <div class="print-line-fill">${mode === 'filled' ? (this.monsterData.power || '') : ''}</div>
            </div>
          </div>

          <div class="print-profile-row" style="margin-top: 8px;">
            <div class="print-field">
              <label>💖 Qué le gusta hacer o comer:</label>
              <div class="print-line-fill">${mode === 'filled' ? (this.monsterData.likes || '') : ''}</div>
            </div>
            <div class="print-field">
              <label>🔢 Su multiplicación favorita:</label>
              <div class="print-line-fill">${mode === 'filled' ? (this.monsterData.favMult || '') : ''}</div>
            </div>
          </div>
        </footer>

        <div class="print-page-footer">
          ⭐ <em>"Aprender también es una aventura" • Mundo Multiplica 4° Básico</em> ⭐
        </div>
      </div>
    `;

    setTimeout(() => {
      window.print();
    }, 200);
  }

  /* =========================================================================
     MODAL DE INSPIRACIÓN / EJEMPLOS DE MONSTRUOS
     ========================================================================= */
  openExamplesModal() {
    this.app.sound.playPop();
    const overlay = document.getElementById('monsterExamplesOverlay');
    const container = document.getElementById('monsterExamplesList');
    if (!overlay || !container) return;

    container.innerHTML = '';
    MONSTER_EXAMPLES.forEach(ex => {
      const card = document.createElement('div');
      card.className = 'monster-example-card';
      card.innerHTML = `
        <div class="example-avatar" style="background:${ex.badgeColor}20; border-color:${ex.badgeColor};">
          <span style="font-size:3rem;">${ex.emojiAvatar}</span>
        </div>
        <div class="example-info">
          <h3 style="color:#1e1b4b; font-size:1.4rem; margin-bottom:4px;">${ex.name}</h3>
          <p style="font-size:0.95rem; color:#475569; margin-bottom:8px;">${ex.summary}</p>
          <div style="font-size:0.88rem; color:#0f766e; font-weight:700;">⚡ <strong>Poder:</strong> ${ex.power}</div>
          <div style="font-size:0.88rem; color:#b45309; font-weight:700;">💖 <strong>Le gusta:</strong> ${ex.likes}</div>
          <div style="font-size:0.88rem; color:#4338ca; font-weight:800; margin-top:4px;">🔢 <strong>Favorita:</strong> ${ex.favMult}</div>
        </div>
      `;
      container.appendChild(card);
    });

    overlay.classList.add('open');
  }
}
