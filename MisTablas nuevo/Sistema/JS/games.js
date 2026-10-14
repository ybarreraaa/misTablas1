/**
 * PLATAFORMA EDUCATIVA "MUNDO MULTIPLICA"
 * Minijuegos Interactivos y Dinámicos de Comprensión Matemática y Acción
 */

class GamesModule {
  constructor(app) {
    this.app = app;
    this.currentGame = null;
    this.timerInterval = null;
    this.animationFrameId = null;
    this.gameScore = 0;
    this.streak = 0;
  }

  init() {
    this.setupArenaEvents();
  }

  setupArenaEvents() {
    const closeBtn = document.getElementById('arenaCloseBtn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.app.sound.playClick();
        this.closeArena();
      });
    }
  }

  openArena(title, gameType) {
    this.currentGame = gameType;
    this.gameScore = 0;
    this.streak = 0;
    clearInterval(this.timerInterval);
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);

    const overlay = document.getElementById('gameArenaOverlay');
    const titleEl = document.getElementById('arenaTitle');
    const scoreEl = document.getElementById('arenaScore');
    const streakEl = document.getElementById('arenaStreak');

    if (titleEl) titleEl.textContent = title;
    if (scoreEl) scoreEl.textContent = '0 pts';
    if (streakEl) streakEl.textContent = '0 racha';

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    this.app.sound.playWhoosh();
  }

  closeArena() {
    clearInterval(this.timerInterval);
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
    const overlay = document.getElementById('gameArenaOverlay');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    const body = document.getElementById('arenaBody');
    if (body) body.innerHTML = '';
    this.app.updateHeaderStats();
  }

  addGamePoints(pts) {
    this.gameScore += pts;
    this.streak++;
    this.app.addScore(pts);
    const scoreEl = document.getElementById('arenaScore');
    const streakEl = document.getElementById('arenaStreak');
    if (scoreEl) scoreEl.textContent = `${this.gameScore} pts`;
    if (streakEl) streakEl.textContent = `🔥 ${this.streak}`;
  }

  resetStreak() {
    this.streak = 0;
    const streakEl = document.getElementById('arenaStreak');
    if (streakEl) streakEl.textContent = '0 racha';
  }

  /* =========================================================================
     JUEGO 1: LA FÁBRICA DE CAJAS MÁGICAS (CONSTRUCTOR DE GRUPOS KAWAII)
     100% dinámico, interactivo y enfocado en qué significa multiplicar
     ========================================================================= */
  startBoxFactoryGame() {
    this.openArena('📦 La Fábrica de Cajas Mágicas: ¡Arma los Pedidos!', 'factory');
    const body = document.getElementById('arenaBody');

    let round = 0;
    const maxRounds = 7;
    const mascots = [
      { name: "Chispa-Ratón", img: "creature2.svg", color: "#f59e0b" },
      { name: "Fuchy-Zorrito", img: "creature3.svg", color: "#ea580c" },
      { name: "Pingüi-Frost", img: "creature4.svg", color: "#0284c7" },
      { name: "Drako-Verde", img: "creature5.svg", color: "#16a34a" },
      { name: "Axo-Rosa", img: "creature6.svg", color: "#db2777" },
      { name: "Gati-Cósmico", img: "creature7.svg", color: "#7c3aed" }
    ];

    const itemTypes = [
      { name: "donas mágicas", emoji: "🍩" },
      { name: "frutillas dulces", emoji: "🍓" },
      { name: "gemas brillantes", emoji: "💎" },
      { name: "estrellitas de oro", emoji: "⭐" },
      { name: "galletas con chispas", emoji: "🍪" }
    ];

    body.innerHTML = `
      <div class="factory-arena" id="factoryArena">
        <!-- Banner del Pedido de la Mascota -->
        <div class="factory-order-banner" id="factoryOrderBanner">
          <img id="factoryMascotImg" src="IMAGEN/creature2.svg" class="factory-client-avatar" alt="Cliente">
          <div class="factory-order-text">
            <div class="factory-order-title" id="factoryOrderTitle">Pedido de Chispa-Ratón</div>
            <div class="factory-order-desc" id="factoryOrderDesc">Cargando pedido mágico...</div>
          </div>
        </div>

        <!-- Cinta Transportadora con las Cajas de Grupos -->
        <div class="factory-conveyor">
          <div style="font-family:'Fredoka',sans-serif; color:#cbd5e1; font-size:0.9rem; font-weight:800; margin-bottom:8px; text-transform:uppercase;">
            🛠️ Cinta Transportadora de Cajas • Ronda <span id="factoryRoundNum">1</span>/${maxRounds}
          </div>
          <div class="factory-conveyor-belt" id="factoryConveyorBelt"></div>
        </div>

        <!-- Resumen Dinámico de Grupos -->
        <div style="background:#ffffff; border-radius:18px; padding:12px 18px; border:2.5px solid #fde047; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
          <div style="font-family:'Fredoka',sans-serif; font-size:1.15rem; font-weight:800; color:#1e1b4b;" id="factoryGroupEquation">
            -- × -- = ?
          </div>
          <div style="font-size:0.95rem; font-weight:800; color:#0f766e; background:#ccfbf1; padding:4px 12px; border-radius:9999px;" id="factoryAdditionHint">
            -- + -- = ?
          </div>
        </div>

        <!-- Chutes / Puertas de Envío con Opciones -->
        <div>
          <div style="font-family:'Fredoka',sans-serif; font-weight:800; font-size:1.05rem; color:#78350f; margin-bottom:10px;">
            🚚 ¿Cuántos objetos van en el envío total? ¡Elige la compuerta correcta!
          </div>
          <div class="factory-chutes-grid" id="factoryChutesGrid"></div>
        </div>

        <div id="factoryFeedbackMsg" style="min-height:28px; font-family:'Fredoka',sans-serif; font-size:1.15rem; font-weight:800;"></div>
      </div>
    `;

    const nextOrder = () => {
      if (round >= maxRounds) {
        this.app.sound.playLevelUp();
        this.finishGameModal(
          '¡Maestro Empacador del Reino! 🏆',
          `¡Completaste los 7 pedidos de la Fábrica con éxito total! Puntuación final: ${this.gameScore} puntos.`
        );
        return;
      }

      round++;
      document.getElementById('factoryRoundNum').textContent = round;
      const feedbackEl = document.getElementById('factoryFeedbackMsg');
      feedbackEl.textContent = '';
      feedbackEl.style.color = '#1e1b4b';

      const mascot = mascots[(round - 1) % mascots.length];
      const item = itemTypes[(round - 1) % itemTypes.length];

      // Random factors (focus on tables 2 to 9, manageable group counts 2 to 5)
      const boxesCount = Math.floor(Math.random() * 4) + 2; // 2, 3, 4 o 5 cajas
      const itemsPerBox = Math.floor(Math.random() * 6) + 2; // 2 a 7 items por caja
      const totalItems = boxesCount * itemsPerBox;

      // Update Order Banner
      document.getElementById('factoryMascotImg').src = `IMAGEN/${mascot.img}`;
      document.getElementById('factoryOrderTitle').textContent = `Pedido de ${mascot.name}`;
      document.getElementById('factoryOrderTitle').style.color = mascot.color;
      document.getElementById('factoryOrderDesc').textContent = 
        `"¡Hola! Necesito empacar ${boxesCount} cajas con ${itemsPerBox} ${item.name} cada una."`;

      // Update Formula & Repeated Addition
      document.getElementById('factoryGroupEquation').innerHTML = 
        `📦 <strong>${boxesCount} cajas × ${itemsPerBox} ${item.name} = ?</strong>`;
      const additionStr = Array(boxesCount).fill(itemsPerBox).join(' + ');
      document.getElementById('factoryAdditionHint').textContent = 
        `${additionStr} = ? (${boxesCount} veces ${itemsPerBox})`;

      // Render Boxes on the Conveyor
      const belt = document.getElementById('factoryConveyorBelt');
      belt.innerHTML = '';

      for (let b = 1; b <= boxesCount; b++) {
        const boxCard = document.createElement('div');
        boxCard.className = 'factory-box-card';
        boxCard.id = `boxCard-${b}`;
        
        let itemsHtml = '';
        for (let i = 1; i <= itemsPerBox; i++) {
          itemsHtml += `<span style="font-size:1.25rem; animation:popInItem ${0.1 + i * 0.05}s ease;">${item.emoji}</span>`;
        }

        boxCard.innerHTML = `
          <div class="factory-box-label">Caja ${b}</div>
          <div class="factory-box-items">${itemsHtml}</div>
          <div style="font-family:'Fredoka',sans-serif; font-size:0.75rem; font-weight:800; color:#fef08a;">${itemsPerBox} ${item.name.split(' ')[0]}</div>
        `;

        belt.appendChild(boxCard);
      }

      // Generate Options
      let options = [totalItems];
      while (options.length < 4) {
        const delta = (Math.floor(Math.random() * 5) - 2) * itemsPerBox;
        const fake = totalItems + (delta === 0 ? itemsPerBox : delta);
        if (fake > 0 && !options.includes(fake)) options.push(fake);
      }
      options.sort(() => Math.random() - 0.5);

      // Render Chutes
      const chutesGrid = document.getElementById('factoryChutesGrid');
      chutesGrid.innerHTML = '';

      options.forEach(opt => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'factory-chute-btn';
        btn.innerHTML = `
          <span>${opt}</span>
          <span style="font-size:0.75rem; font-weight:700; color:#64748b;">${opt === totalItems ? '¡Listo!' : 'Total'}</span>
        `;

        btn.addEventListener('click', () => {
          chutesGrid.querySelectorAll('.factory-chute-btn').forEach(b => b.disabled = true);

          if (opt === totalItems) {
            // ¡CORRECTO!
            this.app.sound.playCorrect();
            btn.classList.add('correct');
            feedbackEl.style.color = '#15803d';
            feedbackEl.textContent = `🎉 ¡Envío Perfecto! ${boxesCount} cajas × ${itemsPerBox} = ${totalItems} ${item.name}.`;

            // Pack animation
            document.querySelectorAll('.factory-box-card').forEach(bEl => {
              bEl.classList.add('packed');
              bEl.style.transform = 'scale(1.1)';
            });

            this.addGamePoints(150);

            setTimeout(() => {
              this.app.sound.playCoin();
            }, 300);

            setTimeout(nextOrder, 1500);
          } else {
            // INCORRECTO
            this.app.sound.playIncorrect();
            btn.classList.add('wrong');
            feedbackEl.style.color = '#b91c1c';
            feedbackEl.textContent = `💡 ${mascot.name} dice: "Cuenta conmigo: ${additionStr} = ¡${totalItems}!"`;
            this.resetStreak();

            chutesGrid.querySelectorAll('.factory-chute-btn').forEach(b => {
              if (parseInt(b.querySelector('span').textContent, 10) === totalItems) {
                b.classList.add('correct');
              }
            });

            setTimeout(nextOrder, 2200);
          }
        });

        chutesGrid.appendChild(btn);
      });
    };

    nextOrder();
  }

  // Alias para mantener compatibilidad
  startCreatureBattleGame() {
    this.startBoxFactoryGame();
  }

  /* =========================================================================
     JUEGO 2: CASCADA DE BURBUJAS MÁGICAS (PUNTERÍA Y FÍSICAS EN EL RÍO)
     Burbujas flotantes en tiempo real con números y grupos visuales
     ========================================================================= */
  startBubbleCascadeGame() {
    this.openArena('🌊 Cascada de Burbujas Mágicas: ¡Puntería en el Río!', 'cascade');
    const body = document.getElementById('arenaBody');

    let round = 0;
    const maxRounds = 7;
    const student = this.app.getStudent();
    const myAvatar = student.avatar || 'creature2.svg';

    body.innerHTML = `
      <div class="catch-river-arena" id="bubbleRiverArena">
        <!-- Banner del Objetivo de la Operación -->
        <div class="catch-target-box">
          <div style="font-size:0.8rem; font-weight:800; color:#fde047; text-transform:uppercase; letter-spacing:0.5px;">
            🎯 Apunta y revienta la burbuja correcta • Ronda <span id="cascadeRoundNum">1</span>/${maxRounds}
          </div>
          <div class="catch-target-formula" id="cascadeTargetFormula">-- × -- = ?</div>
          <div class="catch-hint-pill" id="cascadeHintPill">Cargando pistas de la corriente...</div>
        </div>

        <!-- Área de Flotación de Burbujas -->
        <div id="bubblesFloatContainer" style="position:absolute; top:0; left:0; width:100%; height:100%; pointer-events:auto;"></div>

        <!-- Barra Inferior del Jugador / Cañón Estelar -->
        <div style="position:absolute; bottom:12px; left:50%; transform:translateX(-50%); display:flex; align-items:center; gap:12px; background:rgba(15,23,42,0.85); padding:8px 20px; border-radius:9999px; border:2px solid #38bdf8; z-index:20;">
          <img src="IMAGEN/${myAvatar}" style="width:40px; height:40px; border-radius:50%;" alt="Jugador">
          <span style="font-family:'Fredoka',sans-serif; color:#ffffff; font-size:1rem; font-weight:800;">
            ⭐ Toca directamente cualquier burbuja para disparar tu rayo estelar
          </span>
        </div>
      </div>
    `;

    const arena = document.getElementById('bubbleRiverArena');
    const container = document.getElementById('bubblesFloatContainer');

    const nextWave = () => {
      if (round >= maxRounds) {
        this.app.sound.playLevelUp();
        this.finishGameModal(
          '¡Rey de la Cascada Mágica! 🌊',
          `¡Salvaste a todas las criaturas flotantes reventando las respuestas correctas! Puntos: ${this.gameScore}.`
        );
        return;
      }

      round++;
      document.getElementById('cascadeRoundNum').textContent = round;
      container.innerHTML = '';

      // Random math challenge (focus on tables 2 to 9)
      const a = Math.floor(Math.random() * 8) + 2;
      const b = Math.floor(Math.random() * 8) + 2;
      const correctAns = a * b;

      document.getElementById('cascadeTargetFormula').textContent = `${a} × ${b} = ?`;
      document.getElementById('cascadeHintPill').textContent = 
        `💡 Recuerda: ${a} veces ${b}... ¡Suma ${a} grupos de ${b}!`;

      // 4 bubble options
      let answers = [correctAns];
      while (answers.length < 4) {
        const fake = correctAns + (Math.floor(Math.random() * 7) - 3) * 2;
        if (fake > 0 && !answers.includes(fake)) answers.push(fake);
      }
      answers.sort(() => Math.random() - 0.5);

      const bubbleColors = [
        'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
        'linear-gradient(135deg, #7c3aed 0%, #c084fc 100%)',
        'linear-gradient(135deg, #059669 0%, #34d399 100%)',
        'linear-gradient(135deg, #db2777 0%, #f472b6 100%)'
      ];

      answers.forEach((ans, idx) => {
        const bubble = document.createElement('div');
        bubble.className = 'dynamic-river-bubble';
        bubble.style.background = bubbleColors[idx % bubbleColors.length];

        // Group dot preview inside the bubble
        let dotPreview = '';
        if (ans === correctAns) {
          dotPreview = `<div style="font-size:0.65rem; color:#fef08a; font-weight:800; line-height:1;">${a}×${b}</div>`;
        } else {
          dotPreview = `<div style="font-size:0.65rem; opacity:0.8; line-height:1;">burbuja</div>`;
        }

        bubble.innerHTML = `
          <span>${ans}</span>
          ${dotPreview}
        `;

        // Position spread across width and varied height
        const leftPercent = 12 + idx * 22;
        const topPercent = 28 + (idx % 2 === 0 ? 8 : 28);
        bubble.style.left = `${leftPercent}%`;
        bubble.style.top = `${topPercent}%`;
        bubble.style.animation = `floatKawaii ${3.5 + idx * 0.7}s ease-in-out infinite alternate`;

        bubble.addEventListener('click', () => {
          // Shoot star effect
          const star = document.createElement('div');
          star.className = 'flying-shooting-star';
          star.textContent = '⭐';
          star.style.left = `${leftPercent + 4}%`;
          star.style.bottom = '70px';
          arena.appendChild(star);
          setTimeout(() => star.remove(), 400);

          if (ans === correctAns) {
            // CORRECT!
            this.app.sound.playCorrect();
            bubble.classList.add('popped');
            this.addGamePoints(160);

            const toast = document.createElement('div');
            toast.style.position = 'absolute';
            toast.style.top = '120px';
            toast.style.left = '50%';
            toast.style.transform = 'translateX(-50%)';
            toast.style.background = '#10b981';
            toast.style.color = '#ffffff';
            toast.style.fontFamily = "'Fredoka', sans-serif";
            toast.style.fontWeight = '900';
            toast.style.fontSize = '1.25rem';
            toast.style.padding = '8px 24px';
            toast.style.borderRadius = '9999px';
            toast.style.boxShadow = '0 8px 20px rgba(0,0,0,0.3)';
            toast.style.zIndex = '30';
            toast.textContent = `🎉 ¡EXCELENTE! ${a} × ${b} = ${correctAns}`;
            arena.appendChild(toast);

            setTimeout(() => toast.remove(), 1100);
            setTimeout(nextWave, 1200);
          } else {
            // INCORRECT!
            this.app.sound.playIncorrect();
            bubble.style.animation = 'shake 0.4s';
            bubble.style.filter = 'brightness(0.7)';
            this.resetStreak();

            setTimeout(() => {
              bubble.style.filter = '';
              bubble.style.animation = `floatKawaii ${3.5 + idx * 0.7}s ease-in-out infinite alternate`;
            }, 600);
          }
        });

        container.appendChild(bubble);
      });
    };

    nextWave();
  }

  // Alias para mantener compatibilidad
  startCatchMonsterGame() {
    this.startBubbleCascadeGame();
  }

  /* =========================================================================
     3. CARRERA MATEMÁTICA (Turbo + Podio)
     ========================================================================= */
  startMathRaceGame() {
    this.openArena('🏎️ Carrera Matemática: ¡Pisa el Turbo!', 'race');
    const body = document.getElementById('arenaBody');

    let playerPos = 20;
    let rivalPos = 20;
    const finishLine = 560;
    let questionStartTime = Date.now();

    body.innerHTML = `
      <div class="race-track-box">
        <h3 style="text-align:center; margin-bottom:14px; font-size:1.5rem; color:#f8fafc;">
          ¡Llega a la meta antes que el Rival respondiendo rápido!
        </h3>

        <!-- Carril Jugador -->
        <div class="race-lane">
          <div id="playerRunner" class="race-runner" style="left: 20px;">🚗💨</div>
          <div class="race-finish-line">🏁</div>
        </div>

        <!-- Carril Rival -->
        <div class="race-lane">
          <div id="rivalRunner" class="race-runner" style="left: 20px;">🏎️</div>
          <div class="race-finish-line">🏁</div>
        </div>

        <div style="background:#1e1b4b; border-radius:20px; padding:20px; margin-top:20px; text-align:center;">
          <div id="racePrompt" style="font-family:'Fredoka',sans-serif; font-size:2.6rem; color:#facc15; font-weight:900; margin-bottom:16px;">-- × --</div>
          <div id="raceChoices" style="display:grid; grid-template-columns:1fr 1fr; gap:12px; max-width:400px; margin:0 auto;"></div>
        </div>
      </div>
    `;

    const nextRaceLap = () => {
      if (playerPos >= finishLine) {
        this.app.sound.playLevelUp();
        this.finishGameModal('¡1er Lugar en la Carrera! 🥇', `¡Cruzaste la meta a toda velocidad y ganaste el trofeo dorado! Puntos: ${this.gameScore}.`);
        return;
      }

      rivalPos += 45;
      const rivalEl = document.getElementById('rivalRunner');
      if (rivalEl) rivalEl.style.left = `${Math.min(finishLine - 40, rivalPos)}px`;

      questionStartTime = Date.now();
      const a = Math.floor(Math.random() * 8) + 2;
      const b = Math.floor(Math.random() * 8) + 2;
      const ans = a * b;

      document.getElementById('racePrompt').textContent = `${a} × ${b} = ?`;

      let opts = [ans];
      while (opts.length < 4) {
        const fake = ans + (Math.floor(Math.random() * 5) - 2) * 2;
        if (fake > 0 && !opts.includes(fake)) opts.push(fake);
      }
      opts.sort(() => Math.random() - 0.5);

      const box = document.getElementById('raceChoices');
      box.innerHTML = '';

      opts.forEach(opt => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'choice-chip';
        btn.textContent = opt;

        btn.addEventListener('click', () => {
          const elapsed = (Date.now() - questionStartTime) / 1000;
          if (opt === ans) {
            this.app.sound.playCorrect();
            const isTurbo = elapsed < 2.8;
            playerPos += isTurbo ? 130 : 85;
            this.addGamePoints(isTurbo ? 200 : 120);

            const runnerEl = document.getElementById('playerRunner');
            runnerEl.style.left = `${Math.min(finishLine, playerPos)}px`;
            if (isTurbo) {
              runnerEl.innerHTML = '🚀🔥';
              setTimeout(() => { runnerEl.innerHTML = '🚗💨'; }, 600);
            }

            setTimeout(nextRaceLap, 400);
          } else {
            this.app.sound.playIncorrect();
            btn.classList.add('wrong');
            this.resetStreak();
          }
        });

        box.appendChild(btn);
      });
    };

    nextRaceLap();
  }

  /* =========================================================================
     4. CAMINO PELIGROSO (Río y Piedras de Salto)
     ========================================================================= */
  startDangerousPathGame() {
    this.openArena('🌉 Camino Peligroso: ¡Salta en la Piedra Correcta!', 'path');
    const body = document.getElementById('arenaBody');

    let step = 0;
    const maxSteps = 6;

    body.innerHTML = `
      <div class="river-path-arena">
        <h3 style="font-size:1.6rem; color:#ffffff; margin-bottom:6px;">
          Paso ${step + 1} de ${maxSteps}: ¡Cruza el río saltando sobre la respuesta!
        </h3>
        <p style="color:#e0f2fe; font-weight:700; margin-bottom:16px;">Si te equivocas, la piedra tambalea y puedes reintentar sin caerte.</p>

        <div id="pathPrompt" style="font-family:'Fredoka',sans-serif; font-size:3rem; color:#fef08a; font-weight:900; margin-bottom:18px;">
          -- × --
        </div>

        <div class="river-stepping-stones" id="riverStones"></div>
        <div id="pathFeedback" style="min-height:30px; font-family:'Fredoka',sans-serif; font-size:1.3rem; color:#ffffff; font-weight:700;"></div>
      </div>
    `;

    const nextStep = () => {
      if (step >= maxSteps) {
        this.app.sound.playLevelUp();
        this.finishGameModal('¡Cruzaste el Río con Éxito! 🏞️', `¡Llegaste a la otra orilla sin caerte! Ganaste ${this.gameScore} monedas.`);
        return;
      }
      step++;

      const a = Math.floor(Math.random() * 8) + 2;
      const b = Math.floor(Math.random() * 8) + 2;
      const ans = a * b;

      document.getElementById('pathPrompt').textContent = `${a} × ${b} = ?`;

      let opts = [ans];
      while (opts.length < 4) {
        const fake = ans + (Math.floor(Math.random() * 7) - 3) * 2;
        if (fake > 0 && !opts.includes(fake)) opts.push(fake);
      }
      opts.sort(() => Math.random() - 0.5);

      const stonesBox = document.getElementById('riverStones');
      stonesBox.innerHTML = '';

      opts.forEach(opt => {
        const stone = document.createElement('div');
        stone.className = 'river-stone';
        stone.textContent = opt;

        stone.addEventListener('click', () => {
          const feedback = document.getElementById('pathFeedback');
          if (opt === ans) {
            this.app.sound.playCorrect();
            stone.style.background = '#10b981';
            stone.style.borderColor = '#34d399';
            feedback.textContent = '🐸 ¡Salto perfecto!';
            this.addGamePoints(140);
            setTimeout(nextStep, 600);
          } else {
            this.app.sound.playIncorrect();
            stone.style.animation = 'shake 0.4s';
            feedback.textContent = '💦 ¡La piedra resbaló! Intenta otra vez.';
            this.resetStreak();
          }
        });

        stonesBox.appendChild(stone);
      });
    };

    nextStep();
  }

  /* =========================================================================
     5. DEFIENDE EL CASTILLO
     ========================================================================= */
  startCastleDefenseGame() {
    this.openArena('🏰 Defiende el Castillo', 'defense');
    const body = document.getElementById('arenaBody');

    let wave = 0;
    const maxWaves = 6;

    body.innerHTML = `
      <div class="castle-defense-arena">
        <h3 style="font-size:1.6rem; color:#f8fafc; margin-bottom:8px;">Oleada ${wave + 1} de ${maxWaves}</h3>
        <p style="color:#cbd5e1; font-weight:600;">Dispara el cañón mágico que tenga la respuesta exacta antes de que los monstruos avancen.</p>

        <div class="defense-monsters-track">
          <div style="font-size:2.8rem;">🏰</div>
          <div style="font-size:2.2rem; animation:floatKawaii 3s infinite alternate;" id="advancingMonster">👾</div>
          <div id="defenseOp" style="font-family:'Fredoka',sans-serif; font-size:2.4rem; color:#facc15; font-weight:900;">-- × --</div>
        </div>

        <div class="defense-cannons-grid" id="defenseCannons"></div>
      </div>
    `;

    const nextWave = () => {
      if (wave >= maxWaves) {
        this.app.sound.playLevelUp();
        this.finishGameModal('¡Castillo Protegido! 🛡️', `¡Detuviste todas las oleadas invasoras! Puntos ganados: ${this.gameScore}.`);
        return;
      }
      wave++;

      const a = Math.floor(Math.random() * 8) + 2;
      const b = Math.floor(Math.random() * 9) + 2;
      const ans = a * b;

      document.getElementById('defenseOp').textContent = `${a} × ${b}`;

      let opts = [ans];
      while (opts.length < 4) {
        const fake = ans + (Math.floor(Math.random() * 7) - 3) * 2;
        if (fake > 0 && !opts.includes(fake)) opts.push(fake);
      }
      opts.sort(() => Math.random() - 0.5);

      const cannonsBox = document.getElementById('defenseCannons');
      cannonsBox.innerHTML = '';

      opts.forEach((opt, idx) => {
        const cannon = document.createElement('button');
        cannon.type = 'button';
        cannon.className = 'defense-cannon-btn';
        cannon.innerHTML = `<div>💣 Cañón ${idx + 1}</div><div>${opt}</div>`;

        cannon.addEventListener('click', () => {
          if (opt === ans) {
            this.app.sound.playCorrect();
            cannon.style.borderColor = '#10b981';
            cannon.style.background = '#065f46';
            this.addGamePoints(150);
            setTimeout(nextWave, 500);
          } else {
            this.app.sound.playIncorrect();
            cannon.style.borderColor = '#ef4444';
            this.resetStreak();
          }
        });

        cannonsBox.appendChild(cannon);
      });
    };

    nextWave();
  }

  /* =========================================================================
     6. MEMORIA DE MULTIPLICACIONES
     ========================================================================= */
  startMemoryMultiplicationGame() {
    this.openArena('🃏 Memoria de Multiplicaciones (Encuentra Parejas)', 'memory');
    const body = document.getElementById('arenaBody');

    const pairs = [
      { id: 1, op: '4 × 6', val: 24 },
      { id: 2, op: '7 × 8', val: 56 },
      { id: 3, op: '9 × 3', val: 27 },
      { id: 4, op: '6 × 6', val: 36 },
      { id: 5, op: '5 × 8', val: 40 },
      { id: 6, op: '8 × 4', val: 32 }
    ];

    let cards = [];
    pairs.forEach(p => {
      cards.push({ id: p.id, text: p.op, type: 'op' });
      cards.push({ id: p.id, text: p.val.toString(), type: 'val' });
    });
    cards.sort(() => Math.random() - 0.5);

    body.innerHTML = `
      <div style="color: #ffffff; text-align: center; margin-bottom: 16px;">
        <p style="font-size: 1.15rem; font-weight: 700;">¡Voltea dos cartas y empareja la operación con su resultado exacto!</p>
      </div>
      <div class="memory-board" id="memoryBoard"></div>
    `;

    const board = document.getElementById('memoryBoard');
    let flippedCards = [];
    let matchedCount = 0;
    let lockBoard = false;

    cards.forEach((card, idx) => {
      const cardEl = document.createElement('div');
      cardEl.className = 'memory-card hidden';
      cardEl.dataset.idx = idx;

      cardEl.addEventListener('click', () => {
        if (lockBoard || cardEl.classList.contains('matched') || !cardEl.classList.contains('hidden')) return;

        this.app.sound.playClick();
        cardEl.classList.remove('hidden');
        cardEl.textContent = card.text;
        flippedCards.push({ el: cardEl, data: card });

        if (flippedCards.length === 2) {
          lockBoard = true;
          const [c1, c2] = flippedCards;

          if (c1.data.id === c2.data.id && c1.data.type !== c2.data.type) {
            setTimeout(() => {
              this.app.sound.playCorrect();
              c1.el.classList.add('matched');
              c2.el.classList.add('matched');
              flippedCards = [];
              lockBoard = false;
              matchedCount++;
              this.addGamePoints(150);

              if (matchedCount === pairs.length) {
                this.app.sound.playLevelUp();
                this.finishGameModal('¡Memoria Prodigiosa!', `¡Descubriste todas las parejas de multiplicación! Puntos: ${this.gameScore}.`);
              }
            }, 500);
          } else {
            setTimeout(() => {
              this.app.sound.playIncorrect();
              c1.el.classList.add('hidden');
              c1.el.textContent = '';
              c2.el.classList.add('hidden');
              c2.el.textContent = '';
              flippedCards = [];
              lockBoard = false;
              this.resetStreak();
            }, 900);
          }
        }
      });

      board.appendChild(cardEl);
    });
  }

  /* =========================================================================
     7. LABORATORIO DE CRIATURAS (Incubadora Paso a Paso)
     ========================================================================= */
  startCreatureLabGame() {
    this.openArena('🧪 Laboratorio de Criaturas: ¡Crea un Monstruito!', 'lab');
    const body = document.getElementById('arenaBody');

    let step = 0;
    const steps = [
      { name: "Huevo Mágico", icon: "🥚", prompt: "Resuelve para calentar el huevo mágico" },
      { name: "Color y Piel", icon: "🎨", prompt: "Resuelve para darle un color brillante" },
      { name: "Ojos Kawaii", icon: "✨", prompt: "Resuelve para iluminar sus ojitos" },
      { name: "Alitas de Vuelo", icon: "🪽", prompt: "Resuelve para darle poderes mágicos" },
      { name: "¡Nacimiento!", icon: "🐣", prompt: "¡El toque final para despertarlo!" }
    ];

    body.innerHTML = `
      <div class="lab-incubator-card">
        <h3 style="font-size:1.7rem; color:#1e1b4b; margin-bottom:6px;">Incubadora del Laboratorio</h3>
        <p id="labStepDesc" style="color:#64748b; font-weight:700; margin-bottom:12px;">Cargando paso...</p>

        <div class="incubator-capsule">
          <div id="incubatorIcon" style="font-size:4rem; animation:rubberBand 1s infinite alternate;">🥚</div>
        </div>

        <div id="labOp" style="font-family:'Fredoka',sans-serif; font-size:2.6rem; color:#4f46e5; font-weight:900; margin-bottom:16px;">-- × --</div>
        <div id="labChoices" style="display:grid; grid-template-columns:1fr 1fr; gap:12px; max-width:400px; margin:0 auto;"></div>
      </div>
    `;

    const nextLabStep = () => {
      if (step >= steps.length) {
        this.app.sound.playLevelUp();
        this.finishGameModal('¡Criatura Nacida con Éxito! 🎉', `¡Completaste todos los pasos del laboratorio y desbloqueaste una nueva criatura en tu Colección! Puntos: ${this.gameScore}.`);
        return;
      }

      const current = steps[step];
      document.getElementById('labStepDesc').textContent = `Paso ${step + 1} de 5: ${current.prompt} (${current.name})`;
      document.getElementById('incubatorIcon').textContent = current.icon;

      const a = Math.floor(Math.random() * 8) + 2;
      const b = Math.floor(Math.random() * 8) + 2;
      const ans = a * b;

      document.getElementById('labOp').textContent = `${a} × ${b} = ?`;

      let opts = [ans];
      while (opts.length < 4) {
        const fake = ans + (Math.floor(Math.random() * 5) - 2) * 2;
        if (fake > 0 && !opts.includes(fake)) opts.push(fake);
      }
      opts.sort(() => Math.random() - 0.5);

      const box = document.getElementById('labChoices');
      box.innerHTML = '';

      opts.forEach(opt => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'choice-chip';
        btn.textContent = opt;

        btn.addEventListener('click', () => {
          if (opt === ans) {
            this.app.sound.playCorrect();
            step++;
            this.addGamePoints(160);
            setTimeout(nextLabStep, 500);
          } else {
            this.app.sound.playIncorrect();
            btn.classList.add('wrong');
            this.resetStreak();
          }
        });

        box.appendChild(btn);
      });
    };

    nextLabStep();
  }

  /* =========================================================================
     8. TESORO PERDIDO (Cofres con Candados de Multiplicación)
     ========================================================================= */
  startLostTreasureGame() {
    this.openArena('💎 Tesoro Perdido: ¡Abre los Cofres Secretos!', 'treasure');
    const body = document.getElementById('arenaBody');

    let openedCount = 0;
    const chestOperations = [
      { a: 6, b: 7, ans: 42, reward: "🪙 +200 Monedas" },
      { a: 8, b: 8, ans: 64, reward: "⭐ Gema Brillante" },
      { a: 9, b: 6, ans: 54, reward: "👑 Corona Dorada" },
      { a: 7, b: 7, ans: 49, reward: "🏆 ¡Trofeo Supremo!" }
    ];

    body.innerHTML = `
      <div style="background:#ffffff; border-radius:24px; padding:28px; max-width:680px; width:100%; text-align:center;">
        <h3 style="font-size:1.8rem; color:#1e1b4b; margin-bottom:6px;">El Mapa del Tesoro Oculto</h3>
        <p style="color:#64748b; font-weight:700; margin-bottom:20px;">Toca cada cofre y resuelve la clave de su candado para abrirlo.</p>

        <div class="treasure-map-grid" id="treasureGrid"></div>

        <div id="chestModalArea" style="margin-top:20px; display:none; background:#f8fafc; border:3px solid #cbd5e1; border-radius:18px; padding:16px;">
          <div id="chestOpText" style="font-family:'Fredoka',sans-serif; font-size:2.2rem; color:#4f46e5; font-weight:900;">-- × --</div>
          <div id="chestChoices" style="display:grid; grid-template-columns:1fr 1fr; gap:10px; max-width:360px; margin:14px auto 0;"></div>
        </div>
      </div>
    `;

    const grid = document.getElementById('treasureGrid');
    const modalArea = document.getElementById('chestModalArea');

    chestOperations.forEach((c, idx) => {
      const card = document.createElement('div');
      card.className = 'chest-card';
      card.id = `chestCard-${idx}`;
      card.innerHTML = `
        <img src="IMAGEN/chest.svg" style="width:60px; height:60px;" alt="Cofre">
        <div style="font-family:'Fredoka',sans-serif; font-weight:800; font-size:1.1rem; color:#b45309;">Cofre ${idx + 1}</div>
        <div style="font-size:0.85rem; color:#64748b; font-weight:700;">🔒 Cerrado</div>
      `;

      card.addEventListener('click', () => {
        if (card.classList.contains('opened')) return;
        this.app.sound.playClick();
        modalArea.style.display = 'block';
        document.getElementById('chestOpText').textContent = `¿Clave del Cofre?: ${c.a} × ${c.b} = ?`;

        let opts = [c.ans];
        while (opts.length < 4) {
          const fake = c.ans + (Math.floor(Math.random() * 5) - 2) * 2;
          if (fake > 0 && !opts.includes(fake)) opts.push(fake);
        }
        opts.sort(() => Math.random() - 0.5);

        const choicesBox = document.getElementById('chestChoices');
        choicesBox.innerHTML = '';

        opts.forEach(opt => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'choice-chip';
          btn.textContent = opt;

          btn.addEventListener('click', () => {
            if (opt === c.ans) {
              this.app.sound.playChest();
              card.classList.add('opened');
              card.innerHTML = `
                <div style="font-size:3rem; animation:starTwinkle 1s infinite;">✨</div>
                <div style="font-family:'Fredoka',sans-serif; font-weight:800; font-size:1rem; color:#059669;">${c.reward}</div>
              `;
              modalArea.style.display = 'none';
              openedCount++;
              this.addGamePoints(200);

              if (openedCount === chestOperations.length) {
                this.app.sound.playLevelUp();
                this.finishGameModal('¡Tesoro Legendario Conquistado! 💎', `¡Abriste los 4 cofres del tesoro! Puntuación final: ${this.gameScore}.`);
              }
            } else {
              this.app.sound.playIncorrect();
              btn.classList.add('wrong');
              this.resetStreak();
            }
          });

          choicesBox.appendChild(btn);
        });
      });

      grid.appendChild(card);
    });
  }

  /* =========================================================================
     9. COMBO RELÁMPAGO (60 Segundos)
     ========================================================================= */
  startLightningComboGame() {
    this.openArena('⚡ Combo Relámpago (60 Segundos)', 'combo');
    const body = document.getElementById('arenaBody');

    let timeLeft = 60;
    let comboMultiplier = 1;

    body.innerHTML = `
      <div style="background:#ffffff; border-radius:24px; padding:28px; max-width:580px; width:100%; text-align:center;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
          <div style="font-family:'Fredoka',sans-serif; font-size:1.6rem; color:#ea580c; font-weight:900;">
            ⏱️ <span id="comboTimer">60</span>s
          </div>
          <div style="font-family:'Fredoka',sans-serif; font-size:1.3rem; color:#4f46e5; font-weight:800;" id="comboMultLabel">
            Multiplicador: x1
          </div>
        </div>

        <div id="comboOp" style="font-family:'Fredoka',sans-serif; font-size:3.2rem; color:#1e1b4b; font-weight:900; margin-bottom:20px;">-- × --</div>
        <div id="comboChoices" style="display:grid; grid-template-columns:1fr 1fr; gap:12px; max-width:380px; margin:0 auto;"></div>
      </div>
    `;

    const timerEl = document.getElementById('comboTimer');
    this.timerInterval = setInterval(() => {
      timeLeft--;
      if (timerEl) timerEl.textContent = timeLeft;

      if (timeLeft <= 0) {
        clearInterval(this.timerInterval);
        this.app.sound.playLevelUp();
        this.finishGameModal('¡Tiempo Cumplido! ⚡', `¡Lograste un récord de velocidad! Puntos acumulados: ${this.gameScore}.`);
      }
    }, 1000);

    const nextComboQuestion = () => {
      const a = Math.floor(Math.random() * 8) + 2;
      const b = Math.floor(Math.random() * 8) + 2;
      const ans = a * b;

      document.getElementById('comboOp').textContent = `${a} × ${b}`;

      let opts = [ans];
      while (opts.length < 4) {
        const fake = ans + (Math.floor(Math.random() * 5) - 2) * 2;
        if (fake > 0 && !opts.includes(fake)) opts.push(fake);
      }
      opts.sort(() => Math.random() - 0.5);

      const box = document.getElementById('comboChoices');
      box.innerHTML = '';

      opts.forEach(opt => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'choice-chip';
        btn.textContent = opt;

        btn.addEventListener('click', () => {
          if (opt === ans) {
            this.app.sound.playCorrect();
            comboMultiplier = Math.min(4, comboMultiplier + 1);
            document.getElementById('comboMultLabel').textContent = `Multiplicador: x${comboMultiplier} 🔥`;
            this.addGamePoints(80 * comboMultiplier);
            nextComboQuestion();
          } else {
            this.app.sound.playIncorrect();
            btn.classList.add('wrong');
            comboMultiplier = 1;
            document.getElementById('comboMultLabel').textContent = 'Multiplicador: x1';
            this.resetStreak();
          }
        });

        box.appendChild(btn);
      });
    };

    nextComboQuestion();
  }

  /* =========================================================================
     10. EL IMPOSTOR MATEMÁTICO (Pensamiento Crítico)
     ========================================================================= */
  startMathImpostorGame() {
    this.openArena('🕵️ El Impostor Matemático: ¡Descubre el Error Falso!', 'impostor');
    const body = document.getElementById('arenaBody');

    let round = 0;
    const maxRounds = 5;

    body.innerHTML = `
      <div style="background:#ffffff; border-radius:24px; padding:28px; max-width:640px; width:100%; text-align:center;">
        <h3 style="font-size:1.8rem; color:#ef4444; margin-bottom:6px;">¡Hay un impostor entre nosotros!</h3>
        <p style="color:#64748b; font-weight:700; margin-bottom:18px;">
          Tres operaciones dicen la verdad, pero <strong>una tiene un error falso</strong>. ¡Encuéntrala!
        </p>
        <div id="impostorCardsGrid" style="display:grid; grid-template-columns:1fr 1fr; gap:14px; max-width:500px; margin:0 auto;"></div>
        <div id="impostorFeedback" style="min-height:30px; margin-top:16px; font-family:'Fredoka',sans-serif; font-size:1.2rem; font-weight:800;"></div>
      </div>
    `;

    const nextImpostorRound = () => {
      if (round >= maxRounds) {
        this.app.sound.playLevelUp();
        this.finishGameModal('¡Detective Matemático Experto! 🕵️‍♂️', `¡Descubriste a todos los impostores! Puntuación: ${this.gameScore}.`);
        return;
      }
      round++;

      const grid = document.getElementById('impostorCardsGrid');
      const feedback = document.getElementById('impostorFeedback');
      grid.innerHTML = '';
      feedback.textContent = '';

      let operations = [];
      for (let i = 0; i < 4; i++) {
        const a = Math.floor(Math.random() * 8) + 2;
        const b = Math.floor(Math.random() * 8) + 2;
        operations.push({ a, b, ans: a * b, isFake: false });
      }

      const impostorIdx = Math.floor(Math.random() * 4);
      const fakeDelta = (Math.random() < 0.5 ? 1 : -1) * (Math.floor(Math.random() * 4) + 2);
      operations[impostorIdx].ans += fakeDelta;
      operations[impostorIdx].isFake = true;

      operations.forEach((op, idx) => {
        const card = document.createElement('button');
        card.type = 'button';
        card.className = 'choice-chip';
        card.style.fontSize = '1.4rem';
        card.style.padding = '18px';
        card.textContent = `${op.a} × ${op.b} = ${op.ans}`;

        card.addEventListener('click', () => {
          if (op.isFake) {
            this.app.sound.playCorrect();
            card.classList.add('correct');
            feedback.style.color = '#10b981';
            feedback.textContent = `🎯 ¡Impostor descubierto! ${op.a} × ${op.b} en verdad es ${op.a * op.b}.`;
            this.addGamePoints(180);
            setTimeout(nextImpostorRound, 1200);
          } else {
            this.app.sound.playIncorrect();
            card.classList.add('wrong');
            feedback.style.color = '#ef4444';
            feedback.textContent = `❌ ¡Esa operación es correcta! Sigue buscando al impostor.`;
            this.resetStreak();
          }
        });

        grid.appendChild(card);
      });
    };

    nextImpostorRound();
  }

  /* =========================================================================
     MISIÓN ESPECIAL / JEFE DE ZONA
     ========================================================================= */
  startSpecialMission(tablesList, missionTitle) {
    this.openArena(`👑 Desafío Guardián: ${missionTitle}`, 'boss');
    const body = document.getElementById('arenaBody');

    let bossHP = 100;

    body.innerHTML = `
      <div style="background:#ffffff; border-radius:24px; padding:28px; max-width:620px; width:100%; text-align:center;">
        <div style="font-family:'Fredoka',sans-serif; font-size:1.6rem; color:#7c3aed; font-weight:800; margin-bottom:6px;">
          ¡Duelo con el Jefe de Zona!
        </div>
        <p style="color:#64748b; font-weight:700;">Supera el desafío respondiendo las multiplicaciones de la zona para ganar la insignia dorada.</p>

        <img src="IMAGEN/boss_dragon.svg" style="width:110px; height:110px; margin:12px auto; animation:rubberBand 1s infinite alternate;" alt="Boss">

        <div style="width:220px; height:18px; background:#e2e8f0; border-radius:9999px; margin:0 auto 16px; overflow:hidden;">
          <div id="specialBossHp" style="width:100%; height:100%; background:#9333ea; transition:width 0.3s;"></div>
        </div>

        <div id="specialBossOp" style="font-family:'Fredoka',sans-serif; font-size:2.8rem; color:#1e1b4b; font-weight:900; margin-bottom:16px;">-- × --</div>
        <div id="specialBossChoices" style="display:grid; grid-template-columns:1fr 1fr; gap:12px; max-width:400px; margin:0 auto;"></div>
      </div>
    `;

    const nextTurn = () => {
      if (bossHP <= 0) {
        this.app.sound.playLevelUp();
        this.finishGameModal('¡Insignia de Zona Conquistada! 🏅', `¡Venciste al Guardián de ${missionTitle}! Sumaste ${this.gameScore} puntos.`);
        return;
      }

      const t = tablesList[Math.floor(Math.random() * tablesList.length)];
      const k = Math.floor(Math.random() * 8) + 2;
      const ans = t * k;

      document.getElementById('specialBossOp').textContent = `${t} × ${k} = ?`;

      let opts = [ans];
      while (opts.length < 4) {
        const fake = ans + (Math.floor(Math.random() * 5) - 2) * 2;
        if (fake > 0 && !opts.includes(fake)) opts.push(fake);
      }
      opts.sort(() => Math.random() - 0.5);

      const box = document.getElementById('specialBossChoices');
      box.innerHTML = '';

      opts.forEach(opt => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'choice-chip';
        btn.textContent = opt;

        btn.addEventListener('click', () => {
          if (opt === ans) {
            this.app.sound.playCorrect();
            bossHP -= 25;
            this.addGamePoints(150);
            document.getElementById('specialBossHp').style.width = `${Math.max(0, bossHP)}%`;
            setTimeout(nextTurn, 500);
          } else {
            this.app.sound.playIncorrect();
            btn.classList.add('wrong');
            this.resetStreak();
          }
        });

        box.appendChild(btn);
      });
    };

    nextTurn();
  }

  finishGameModal(title, text) {
    this.app.triggerConfetti();
    const body = document.getElementById('arenaBody');
    body.innerHTML = `
      <div style="background: #ffffff; border-radius: 28px; padding: 36px 28px; max-width: 540px; width: 100%; text-align: center; box-shadow: 0 25px 50px rgba(0,0,0,0.35); border:4px solid #fde047;">
        <div style="font-size: 4.5rem; margin-bottom: 12px; animation:starTwinkle 1.5s infinite;">🏆</div>
        <h3 style="font-size: 2.1rem; color: #1e1b4b; margin-bottom: 8px;">${title}</h3>
        <p style="font-size: 1.2rem; color: #64748b; font-weight: 700; margin-bottom: 26px;">${text}</p>
        <div style="display: flex; gap: 14px; justify-content: center;">
          <button type="button" class="btn btn-primary" id="btnExitArena" style="font-size: 1.25rem; padding: 16px 32px;">
            ¡Volver a Mundo Multiplica! 🏠
          </button>
        </div>
      </div>
    `;

    document.getElementById('btnExitArena').addEventListener('click', () => {
      this.app.sound.playClick();
      this.closeArena();
    });
  }
}
