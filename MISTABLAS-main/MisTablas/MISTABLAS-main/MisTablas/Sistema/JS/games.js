/**
 * PLATAFORMA EDUCATIVA "MUNDO MULTIPLICA"
 * Los 10 Minijuegos de Acción Visual e Interactiva
 */

class GamesModule {
  constructor(app) {
    this.app = app;
    this.currentGame = null;
    this.timerInterval = null;
    this.gameScore = 0;
    this.streak = 0;
  }

  init() {
    this.setupArenaEvents();
  }

  setupArenaEvents() {
    const closeBtn = document.getElementById('arenaCloseBtn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeArena());
    }
  }

  openArena(title, gameType) {
    this.currentGame = gameType;
    this.gameScore = 0;
    this.streak = 0;
    clearInterval(this.timerInterval);

    const overlay = document.getElementById('gameArenaOverlay');
    const titleEl = document.getElementById('arenaTitle');
    const scoreEl = document.getElementById('arenaScore');
    const streakEl = document.getElementById('arenaStreak');

    if (titleEl) titleEl.textContent = title;
    if (scoreEl) scoreEl.textContent = '0 pts';
    if (streakEl) streakEl.textContent = '0 racha';

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  closeArena() {
    clearInterval(this.timerInterval);
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
     1. BATALLA DE CRIATURAS
     ========================================================================= */
  startCreatureBattleGame() {
    this.openArena('⚔️ Batalla de Criaturas Pokémon-Cute', 'battle');
    const body = document.getElementById('arenaBody');

    let bossHP = 100;
    let turn = 0;
    const student = this.app.getStudent();
    const myAvatar = student.avatar || 'creature2.svg';

    body.innerHTML = `
      <div class="battle-arena">
        <div class="battle-characters-row">
          <!-- Mi Criatura -->
          <div class="battle-char-box">
            <div style="font-family:'Fredoka',sans-serif; font-size:1.1rem; font-weight:800; color:#4f46e5;">Tu Mascota</div>
            <img id="myBattleImg" src="IMAGEN/${myAvatar}" style="width:90px; height:90px; transition:transform 0.2s;" alt="Tu criatura">
            <div class="battle-hp-bar"><div class="battle-hp-fill" style="width:100%;"></div></div>
          </div>

          <!-- VS Badge -->
          <div style="font-family:'Fredoka',sans-serif; font-size:1.8rem; font-weight:900; color:#ef4444;">VS</div>

          <!-- Rival Boss -->
          <div class="battle-char-box">
            <div style="font-family:'Fredoka',sans-serif; font-size:1.1rem; font-weight:800; color:#9333ea;">Guardián Rival</div>
            <img id="rivalBattleImg" src="IMAGEN/boss_dragon.svg" style="width:100px; height:100px; transition:transform 0.2s;" alt="Rival">
            <div class="battle-hp-bar"><div id="rivalHpFill" class="battle-hp-fill" style="background:#a855f7; width:100%;"></div></div>
          </div>
        </div>

        <div id="battleSpecialBanner" style="display:none; background:#fef08a; border:2px solid #eab308; color:#854d0e; font-family:'Fredoka',sans-serif; font-weight:800; padding:6px 14px; border-radius:9999px; margin-bottom:12px; font-size:1.1rem;">
          ⚡ ¡ATAQUE ESPECIAL ACTIVADO! (Doble Daño) ⚡
        </div>

        <div id="battlePrompt" style="font-family:'Fredoka',sans-serif; font-size:2.8rem; color:#1e1b4b; font-weight:900; margin-bottom:18px;">
          -- × -- = ?
        </div>

        <div id="battleChoices" style="display:grid; grid-template-columns:1fr 1fr; gap:14px; max-width:440px; margin:0 auto;"></div>
      </div>
    `;

    const nextRound = () => {
      if (bossHP <= 0) {
        this.app.sound.playSuccess();
        this.finishGameModal('¡Victoria en la Batalla!', `¡Derrotaste al Guardián Rival con tus multiplicaciones! Ganaste ${this.gameScore} monedas.`);
        return;
      }

      const a = Math.floor(Math.random() * 8) + 2;
      const b = Math.floor(Math.random() * 9) + 2;
      const ans = a * b;

      document.getElementById('battlePrompt').textContent = `${a} × ${b} = ?`;

      // Check special attack condition
      const isSpecial = this.streak >= 2;
      const specialBanner = document.getElementById('battleSpecialBanner');
      if (specialBanner) specialBanner.style.display = isSpecial ? 'inline-block' : 'none';

      let opts = [ans];
      while (opts.length < 4) {
        const fake = ans + (Math.floor(Math.random() * 7) - 3) * 2;
        if (fake > 0 && !opts.includes(fake)) opts.push(fake);
      }
      opts.sort(() => Math.random() - 0.5);

      const choicesBox = document.getElementById('battleChoices');
      choicesBox.innerHTML = '';

      opts.forEach(opt => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'choice-chip';
        btn.textContent = opt;

        btn.addEventListener('click', () => {
          if (opt === ans) {
            this.app.sound.playSuccess();
            const dmg = isSpecial ? 50 : 25;
            bossHP = Math.max(0, bossHP - dmg);
            this.addGamePoints(150);

            // Attack animations
            const myImg = document.getElementById('myBattleImg');
            const rivalImg = document.getElementById('rivalBattleImg');
            if (myImg) myImg.style.transform = 'scale(1.2) translateX(20px)';
            if (rivalImg) rivalImg.style.transform = 'rotate(10deg) scale(0.9)';
            document.getElementById('rivalHpFill').style.width = `${bossHP}%`;

            setTimeout(() => {
              if (myImg) myImg.style.transform = 'none';
              if (rivalImg) rivalImg.style.transform = 'none';
              nextRound();
            }, 500);
          } else {
            this.app.sound.playError();
            btn.classList.add('wrong');
            this.resetStreak();
            if (specialBanner) specialBanner.style.display = 'none';
          }
        });

        choicesBox.appendChild(btn);
      });
    };

    nextRound();
  }

  /* =========================================================================
     2. ATRAPA AL MONSTRUO CORRECTO
     ========================================================================= */
  startCatchMonsterGame() {
    this.openArena('🎈 Atrapa al Monstruo Correcto', 'catch');
    const body = document.getElementById('arenaBody');

    body.innerHTML = `
      <div class="catch-sky-arena" id="catchSky">
        <div class="catch-target-prompt" id="catchPrompt">Cargando...</div>
      </div>
    `;

    const sky = document.getElementById('catchSky');
    const prompt = document.getElementById('catchPrompt');
    let round = 0;
    const maxRounds = 7;

    const creatures = ['creature2.svg', 'creature3.svg', 'creature4.svg', 'creature5.svg', 'creature6.svg'];

    const nextRound = () => {
      if (round >= maxRounds) {
        this.finishGameModal('¡Puntería Legendaria!', `¡Atrapaste a todos los monstruos con sus números! Puntos: ${this.gameScore}.`);
        return;
      }
      round++;
      sky.querySelectorAll('.floating-bubble').forEach(b => b.remove());

      const a = Math.floor(Math.random() * 8) + 2;
      const b = Math.floor(Math.random() * 9) + 2;
      const correctAns = a * b;

      prompt.textContent = `¿Quién tiene ${a} × ${b}?`;

      let answers = [correctAns];
      while (answers.length < 4) {
        const fake = correctAns + (Math.floor(Math.random() * 7) - 3) * 2;
        if (fake > 0 && !answers.includes(fake)) answers.push(fake);
      }
      answers.sort(() => Math.random() - 0.5);

      answers.forEach((ans, idx) => {
        const bubble = document.createElement('div');
        bubble.className = 'floating-bubble';
        const img = creatures[idx % creatures.length];
        bubble.innerHTML = `
          <div style="display:flex; flex-direction:column; align-items:center;">
            <img src="IMAGEN/${img}" style="width:36px; height:36px;" alt="Monstruo">
            <span style="font-size:1.1rem; line-height:1;">${ans}</span>
          </div>
        `;

        bubble.style.left = `${14 + idx * 22}%`;
        bubble.style.top = `${28 + (idx % 2 === 0 ? 12 : 38)}%`;
        bubble.style.animation = `floatKawaii ${4 + idx}s ease-in-out infinite alternate`;

        bubble.addEventListener('click', () => {
          if (ans === correctAns) {
            this.app.sound.playSuccess();
            bubble.style.transform = 'scale(1.6)';
            bubble.style.opacity = '0';
            this.addGamePoints(120);
            setTimeout(nextRound, 400);
          } else {
            this.app.sound.playError();
            bubble.style.background = '#f43f5e';
            this.resetStreak();
          }
        });

        sky.appendChild(bubble);
      });
    };

    nextRound();
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
          ¡Llega a la meta antes que el Rival!
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
        this.app.sound.playSuccess();
        this.finishGameModal('¡1er Lugar en la Carrera! 🥇', `¡Cruzaste la meta a toda velocidad y ganaste el trofeo dorado! Puntos: ${this.gameScore}.`);
        return;
      }

      // Rival advances automatically a bit
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
            this.app.sound.playSuccess();
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
            this.app.sound.playError();
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
        this.app.sound.playSuccess();
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
            this.app.sound.playSuccess();
            stone.style.background = '#10b981';
            stone.style.borderColor = '#34d399';
            feedback.textContent = '🐸 ¡Salto perfecto!';
            this.addGamePoints(140);
            setTimeout(nextStep, 600);
          } else {
            this.app.sound.playError();
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
        this.app.sound.playSuccess();
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
            this.app.sound.playSuccess();
            cannon.style.borderColor = '#10b981';
            cannon.style.background = '#065f46';
            this.addGamePoints(150);
            setTimeout(nextWave, 500);
          } else {
            this.app.sound.playError();
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
      { id: 2, id2: 2, op: '7 × 8', val: 56 },
      { id: 3, id2: 3, op: '9 × 3', val: 27 },
      { id: 4, id2: 4, op: '6 × 6', val: 36 },
      { id: 5, id2: 5, op: '5 × 8', val: 40 },
      { id: 6, id2: 6, op: '8 × 4', val: 32 }
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

        this.app.sound.playPop();
        cardEl.classList.remove('hidden');
        cardEl.textContent = card.text;
        flippedCards.push({ el: cardEl, data: card });

        if (flippedCards.length === 2) {
          lockBoard = true;
          const [c1, c2] = flippedCards;

          if (c1.data.id === c2.data.id && c1.data.type !== c2.data.type) {
            setTimeout(() => {
              this.app.sound.playSuccess();
              c1.el.classList.add('matched');
              c2.el.classList.add('matched');
              flippedCards = [];
              lockBoard = false;
              matchedCount++;
              this.addGamePoints(150);

              if (matchedCount === pairs.length) {
                this.finishGameModal('¡Memoria Prodigiosa!', `¡Descubriste todas las parejas de multiplicación! Puntos: ${this.gameScore}.`);
              }
            }, 500);
          } else {
            setTimeout(() => {
              this.app.sound.playError();
              c1.el.classList.add('hidden');
              c1.el.textContent = '';
              c2.el.classList.add('hidden');
              c2.el.textContent = '';
              flippedCards = [];
              lockBoard = false;
              this.resetStreak();
            }, 1000);
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
        this.app.sound.playSuccess();
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
            this.app.sound.playSuccess();
            step++;
            this.addGamePoints(160);
            setTimeout(nextLabStep, 500);
          } else {
            this.app.sound.playError();
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
    const totalChests = 4;

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
        this.app.sound.playPop();
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
              this.app.sound.playSuccess();
              card.classList.add('opened');
              card.style.borderColor = '#10b981';
              card.style.background = '#dcfce7';
              card.innerHTML = `
                <div style="font-size:3rem;">🎁</div>
                <div style="font-family:'Fredoka',sans-serif; font-weight:800; color:#15803d;">¡Abierto!</div>
                <div style="font-size:0.8rem; font-weight:800; color:#b45309;">${c.reward}</div>
              `;
              modalArea.style.display = 'none';
              this.addGamePoints(180);
              openedCount++;

              if (openedCount === totalChests) {
                setTimeout(() => {
                  this.finishGameModal('¡Todos los Cofres Abiertos!', `¡Encontraste todo el tesoro pirata matemático! Monedas acumuladas: ${this.gameScore}.`);
                }, 600);
              }
            } else {
              this.app.sound.playError();
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
    let questionsAnswered = 0;

    const timerEl = document.getElementById('arenaTimer');
    if (timerEl) timerEl.textContent = `⏱️ ${timeLeft}s`;

    body.innerHTML = `
      <div style="background: #ffffff; border-radius: 24px; padding: 26px; max-width: 500px; width: 100%; text-align: center;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <span style="font-family:'Fredoka',sans-serif; font-weight:800; color:#4f46e5;">¡RESPONDE A TODA VELOCIDAD!</span>
          <span id="comboMultiplierBadge" style="font-family:'Fredoka',sans-serif; font-weight:900; color:#ea580c; font-size:1.2rem;">COMBO ×1</span>
        </div>

        <div id="comboOp" style="font-family: 'Fredoka', sans-serif; font-size: 3.2rem; color: #1e1b4b; font-weight: 900; margin: 14px 0;">-- × --</div>
        <div id="comboChoices" style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;"></div>
      </div>
    `;

    this.timerInterval = setInterval(() => {
      timeLeft--;
      if (timerEl) timerEl.textContent = `⏱️ ${timeLeft}s`;

      if (timeLeft <= 0) {
        clearInterval(this.timerInterval);
        this.app.sound.playSuccess();
        this.finishGameModal('¡Tiempo Cumplido!', `¡Gran velocidad relámpago! Resolviste ${questionsAnswered} operaciones y conseguiste ${this.gameScore} puntos.`);
      }
    }, 1000);

    const askNext = () => {
      if (timeLeft <= 0) return;
      const a = Math.floor(Math.random() * 8) + 2;
      const b = Math.floor(Math.random() * 9) + 2;
      const correct = a * b;

      document.getElementById('comboOp').textContent = `${a} × ${b}`;

      const mult = Math.min(4, Math.max(1, this.streak + 1));
      const badge = document.getElementById('comboMultiplierBadge');
      if (badge) badge.textContent = `COMBO ×${mult} 🔥`;

      let options = [correct];
      while (options.length < 4) {
        const fake = correct + (Math.floor(Math.random() * 7) - 3) * 2;
        if (fake > 0 && !options.includes(fake)) options.push(fake);
      }
      options.sort(() => Math.random() - 0.5);

      const choicesBox = document.getElementById('comboChoices');
      choicesBox.innerHTML = '';

      options.forEach(opt => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'choice-chip';
        btn.textContent = opt;

        btn.addEventListener('click', () => {
          if (opt === correct) {
            this.app.sound.playSuccess();
            questionsAnswered++;
            this.addGamePoints(100 * mult);
            askNext();
          } else {
            this.app.sound.playError();
            this.resetStreak();
            if (badge) badge.textContent = `COMBO ×1`;
            btn.classList.add('wrong');
          }
        });

        choicesBox.appendChild(btn);
      });
    };

    askNext();
  }

  /* =========================================================================
     10. EL IMPOSTOR MATEMÁTICO (¿Cuál tarjeta tiene el error?)
     ========================================================================= */
  startMathImpostorGame() {
    this.openArena('🕵️ El Impostor Matemático (Encuentra la Falsa)', 'impostor');
    const body = document.getElementById('arenaBody');

    let round = 0;
    const maxRounds = 5;

    body.innerHTML = `
      <div style="background:#ffffff; border-radius:24px; padding:26px; max-width:680px; width:100%; text-align:center;">
        <h3 style="font-size:1.7rem; color:#1e1b4b; margin-bottom:6px;">¿Quién es el Impostor?</h3>
        <p style="color:#64748b; font-weight:700; margin-bottom:18px;">
          Tres operaciones son correctas y <strong>una es falsa</strong>. ¡Toca la tarjeta mentirosa!
        </p>

        <div class="impostor-cards-grid" id="impostorGrid"></div>
      </div>
    `;

    const nextRound = () => {
      if (round >= maxRounds) {
        this.app.sound.playSuccess();
        this.finishGameModal('¡Detective Maestro! 🔍', `¡Desenmascaraste a todos los impostores matemáticos! Puntos: ${this.gameScore}.`);
        return;
      }
      round++;

      // Create 3 true equations and 1 false
      const ops = [
        { a: 6, b: 4, res: 24, fake: false },
        { a: 5, b: 8, res: 40, fake: false },
        { a: 7, b: 3, res: 21, fake: false },
        { a: 9, b: 4, res: 38, fake: true } // Impostor! 9*4 = 36
      ];

      // Shuffle
      ops.sort(() => Math.random() - 0.5);

      const grid = document.getElementById('impostorGrid');
      grid.innerHTML = '';

      ops.forEach(item => {
        const card = document.createElement('div');
        card.className = 'impostor-card';
        card.textContent = `${item.a} × ${item.b} = ${item.res}`;

        card.addEventListener('click', () => {
          if (item.fake) {
            this.app.sound.playSuccess();
            card.style.background = '#dcfce7';
            card.style.borderColor = '#16a34a';
            card.textContent = `🚨 ¡IMPOSTOR DESCUBIERTO! (${item.a} × ${item.b} = ${item.a * item.b})`;
            this.addGamePoints(200);
            setTimeout(nextRound, 1000);
          } else {
            this.app.sound.playError();
            card.style.background = '#fee2e2';
            card.style.borderColor = '#dc2626';
            this.resetStreak();
          }
        });

        grid.appendChild(card);
      });
    };

    nextRound();
  }

  /* =========================================================================
     DESAFÍO ESPECIAL DE ZONA / JEFE FINAL
     ========================================================================= */
  startSpecialMission(tablesList, missionTitle) {
    this.openArena(`👑 Desafío Guardián: ${missionTitle}`, 'boss');
    const body = document.getElementById('arenaBody');

    let bossHP = 100;
    let turn = 0;

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
        this.app.sound.playSuccess();
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
            this.app.sound.playSuccess();
            bossHP -= 25;
            this.addGamePoints(150);
            document.getElementById('specialBossHp').style.width = `${Math.max(0, bossHP)}%`;
            setTimeout(nextTurn, 500);
          } else {
            this.app.sound.playError();
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
        <div style="font-size: 4.5rem; margin-bottom: 12px;">🏆</div>
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
      this.closeArena();
    });
  }
}
