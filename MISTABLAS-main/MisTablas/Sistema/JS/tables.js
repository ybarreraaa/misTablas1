/**
 * PLATAFORMA EDUCATIVA "MIS TABLAS"
 * Módulo de Aprendizaje Interactivo de Tablas del 2 al 10
 * Con Mascotas Kawaii, Enfoque COPISI y Ejercicios Interactivos
 */

const TABLES_DATA = {
  2: {
    num: 2,
    title: "Tabla del 2",
    creatureName: "Chispa-Ratón",
    creatureImg: "creature2.svg",
    motto: "¡El poder del doble y los saltos de 2 en 2!",
    color: "#f59e0b",
    bgSoft: "#fefce8",
    borderColor: "#fde047",
    emoji: "⚡",
    objectName: "rayitos",
    objectEmoji: "⚡",
    pattern: "¡Todos los resultados son números pares (0, 2, 4, 6 u 8)! Multiplicar por 2 siempre es calcular el DOBLE de un número.",
    trick: "💡 Truco de Chispa-Ratón: ¿Cuánto es 2 × 7? Es lo mismo que sumar 7 + 7 = 14.",
    questions: [
      { prompt: "¿Cuánto es 2 × 4?", formula: "2 × 4 = ?", a: 2, b: 4, ans: 8, options: [6, 8, 10, 12], hint: "El doble de 4: 4 + 4 = 8" },
      { prompt: "Completa el número que falta: 2 × ___ = 14", formula: "2 × ? = 14", a: 2, b: 7, ans: 7, options: [5, 6, 7, 8], hint: "¿Qué número sumado consigo mismo da 14?" },
      { prompt: "¿Cuánto es 2 × 9?", formula: "2 × 9 = ?", a: 2, b: 9, ans: 18, options: [16, 18, 19, 20], hint: "9 + 9 = 18" },
      { prompt: "Si tienes 2 cajas con 6 chocolates cada una, ¿cuántos hay?", formula: "2 × 6 = ?", a: 2, b: 6, ans: 12, options: [10, 12, 14, 16], hint: "6 + 6 chocolates" },
      { prompt: "¿Cuánto es 2 × 8?", formula: "2 × 8 = ?", a: 2, b: 8, ans: 16, options: [14, 15, 16, 18], hint: "8 + 8 = 16" }
    ]
  },
  3: {
    num: 3,
    title: "Tabla del 3",
    creatureName: "Fuchy-Zorrito",
    creatureImg: "creature3.svg",
    motto: "¡El triple de saltos y hojas mágicas!",
    color: "#ea580c",
    bgSoft: "#fff7ed",
    borderColor: "#fdba74",
    emoji: "🦊",
    objectName: "hojitas",
    objectEmoji: "🍃",
    pattern: "¡Patrón Mágico! Si sumas los dígitos del resultado, siempre obtienes 3, 6 o 9 (Ejemplo: 3 × 8 = 24 -> 2 + 4 = 6).",
    trick: "💡 Truco de Fuchy: Multiplicar por 3 es calcular el doble y sumar el número una vez más.",
    questions: [
      { prompt: "¿Cuánto es 3 × 5?", formula: "3 × 5 = ?", a: 3, b: 5, ans: 15, options: [12, 14, 15, 18], hint: "5 + 5 + 5 = 15" },
      { prompt: "¿Cuánto es 3 × 4?", formula: "3 × 4 = ?", a: 3, b: 4, ans: 12, options: [9, 10, 12, 15], hint: "4 + 4 + 4 = 12" },
      { prompt: "Completa el factor: 3 × ___ = 21", formula: "3 × ? = 21", a: 3, b: 7, ans: 7, options: [6, 7, 8, 9], hint: "Siete veces 3 es 21" },
      { prompt: "¿Cuánto es 3 × 9?", formula: "3 × 9 = ?", a: 3, b: 9, ans: 27, options: [24, 26, 27, 30], hint: "Suma de dígitos: 2 + 7 = 9" },
      { prompt: "¿Cuánto es 3 × 6?", formula: "3 × 6 = ?", a: 3, b: 6, ans: 18, options: [15, 16, 18, 21], hint: "6 + 6 + 6 = 18" }
    ]
  },
  4: {
    num: 4,
    title: "Tabla del 4",
    creatureName: "Pingüi-Frost",
    creatureImg: "creature4.svg",
    motto: "¡El doble del doble en la nieve!",
    color: "#0284c7",
    bgSoft: "#f0f9ff",
    borderColor: "#7dd3fc",
    emoji: "🐧",
    objectName: "copitos",
    objectEmoji: "❄️",
    pattern: "¡El doble del doble! Para multiplicar por 4, duplica el número dos veces (Ej: 4 × 6 -> doble de 6 es 12, doble de 12 es 24).",
    trick: "💡 Truco de Pingüi: Todos los resultados de la tabla del 4 terminan en 0, 4, 8, 2 o 6.",
    questions: [
      { prompt: "¿Cuánto es 4 × 3?", formula: "4 × 3 = ?", a: 4, b: 3, ans: 12, options: [9, 10, 12, 14], hint: "Doble de 3 es 6, doble de 6 es 12" },
      { prompt: "¿Cuánto es 4 × 6?", formula: "4 × 6 = ?", a: 4, b: 6, ans: 24, options: [20, 22, 24, 28], hint: "Doble de 6 es 12, doble de 12 es 24" },
      { prompt: "Completa la operación: 4 × ___ = 32", formula: "4 × ? = 32", a: 4, b: 8, ans: 8, options: [6, 7, 8, 9], hint: "¿Qué número multiplicado por 4 da 32?" },
      { prompt: "¿Cuánto es 4 × 7?", formula: "4 × 7 = ?", a: 4, b: 7, ans: 28, options: [24, 26, 28, 30], hint: "7 + 7 = 14, y 14 + 14 = 28" },
      { prompt: "¿Cuánto es 4 × 9?", formula: "4 × 9 = ?", a: 4, b: 9, ans: 36, options: [32, 36, 40, 42], hint: "Doble de 9 es 18, doble de 18 es 36" }
    ]
  },
  5: {
    num: 5,
    title: "Tabla del 5",
    creatureName: "Drako-Verde",
    creatureImg: "creature5.svg",
    motto: "¡Monedas y estrellas de 5 en 5!",
    color: "#16a34a",
    bgSoft: "#f0fdf4",
    borderColor: "#86efac",
    emoji: "🐲",
    objectName: "estrellitas",
    objectEmoji: "⭐",
    pattern: "¡La regla dorada! Todos los resultados terminan en 0 (si multiplicas por par) o en 5 (si multiplicas por impar).",
    trick: "💡 Truco de Drako: Multiplica el número por 10 y luego calcula la mitad (Ej: 5 × 8 = 80 ÷ 2 = 40).",
    questions: [
      { prompt: "¿Cuánto es 5 × 7?", formula: "5 × 7 = ?", a: 5, b: 7, ans: 35, options: [30, 35, 40, 45], hint: "Termina en 5 porque 7 es impar" },
      { prompt: "¿Cuánto es 5 × 6?", formula: "5 × 6 = ?", a: 5, b: 6, ans: 30, options: [25, 30, 35, 40], hint: "Termina en 0 porque 6 es par" },
      { prompt: "¿Cuánto es 5 × 8?", formula: "5 × 8 = ?", a: 5, b: 8, ans: 40, options: [35, 40, 45, 50], hint: "5 × 8 = 40" },
      { prompt: "Completa la ecuación: 5 × ___ = 45", formula: "5 × ? = 45", a: 5, b: 9, ans: 9, options: [7, 8, 9, 10], hint: "Cinco por nueve es 45" },
      { prompt: "¿Cuánto es 5 × 4?", formula: "5 × 4 = ?", a: 5, b: 4, ans: 20, options: [15, 20, 25, 30], hint: "La mitad de 40 es 20" }
    ]
  },
  6: {
    num: 6,
    title: "Tabla del 6",
    creatureName: "Axo-Rosa",
    creatureImg: "creature6.svg",
    motto: "¡El hexágono mágico y las flores rosadas!",
    color: "#db2777",
    bgSoft: "#fdf2f8",
    borderColor: "#fbcfe8",
    emoji: "🌸",
    objectName: "florecitas",
    objectEmoji: "🌸",
    pattern: "Si multiplicas 6 por un número par, el resultado termina en ese mismo número (Ej: 6 × 2 = 12, 6 × 4 = 24, 6 × 6 = 36, 6 × 8 = 48).",
    trick: "💡 Truco de Axo: Multiplica por 5 y luego suma el número una vez más. (6 × 7 = 35 + 7 = 42).",
    questions: [
      { prompt: "¿Cuánto es 6 × 7?", formula: "6 × 7 = ?", a: 6, b: 7, ans: 42, options: [36, 40, 42, 48], hint: "5 × 7 = 35, y 35 + 7 = 42" },
      { prompt: "¿Cuánto es 6 × 6?", formula: "6 × 6 = ?", a: 6, b: 6, ans: 36, options: [30, 32, 36, 40], hint: "Seis veces seis da 36" },
      { prompt: "¿Cuánto es 6 × 8?", formula: "6 × 8 = ?", a: 6, b: 8, ans: 48, options: [42, 46, 48, 54], hint: "Termina en 8 porque multiplicas por 8" },
      { prompt: "Completa la operación: 6 × ___ = 54", formula: "6 × ? = 54", a: 6, b: 9, ans: 9, options: [7, 8, 9, 10], hint: "6 veces 9 es 54" },
      { prompt: "¿Cuánto es 6 × 4?", formula: "6 × 4 = ?", a: 6, b: 4, ans: 24, options: [20, 22, 24, 28], hint: "Termina en 4: 24" }
    ]
  },
  7: {
    num: 7,
    title: "Tabla del 7",
    creatureName: "Gati-Cósmico",
    creatureImg: "creature7.svg",
    motto: "¡Los 7 días de la semana cósmica!",
    color: "#7c3aed",
    bgSoft: "#faf5ff",
    borderColor: "#d8b4fe",
    emoji: "🐱",
    objectName: "estrellas cósmicas",
    objectEmoji: "🔮",
    pattern: "Descomposición amistosa: 7 × N = (5 × N) + (2 × N). ¡Suma la tabla del 5 con la tabla del 2!",
    trick: "💡 El secreto 5, 6, 7, 8: 56 = 7 × 8. ¡Fácil de recordar!",
    questions: [
      { prompt: "¿Cuánto es 7 × 8?", formula: "7 × 8 = ?", a: 7, b: 8, ans: 56, options: [54, 56, 58, 62], hint: "Acuérdate de 5, 6, 7, 8 -> 56 = 7 × 8" },
      { prompt: "¿Cuánto es 7 × 4?", formula: "7 × 4 = ?", a: 7, b: 4, ans: 28, options: [24, 26, 28, 30], hint: "4 semanas de 7 días: 28 días" },
      { prompt: "Completa el cálculo: 7 × ___ = 49", formula: "7 × ? = 49", a: 7, b: 7, ans: 7, options: [6, 7, 8, 9], hint: "Siete por siete es 49" },
      { prompt: "¿Cuánto es 7 × 9?", formula: "7 × 9 = ?", a: 7, b: 9, ans: 63, options: [56, 61, 63, 70], hint: "7 × 10 = 70. Réstale 7: 63" },
      { prompt: "¿Cuánto es 7 × 6?", formula: "7 × 6 = ?", a: 7, b: 6, ans: 42, options: [38, 40, 42, 46], hint: "Igual que 6 × 7 = 42" }
    ]
  },
  8: {
    num: 8,
    title: "Tabla del 8",
    creatureName: "Panda-Bambú",
    creatureImg: "creature8.svg",
    motto: "¡El triple doble de fuerza matemática!",
    color: "#0f766e",
    bgSoft: "#f0fdfa",
    borderColor: "#99f6e4",
    emoji: "🐼",
    objectName: "tallos de bambú",
    objectEmoji: "🎋",
    pattern: "¡El triple doble! Duplica el número tres veces consecutivas para obtener el resultado de multiplicar por 8.",
    trick: "💡 Todos los resultados de la tabla del 8 son números pares que terminan en 8, 6, 4, 2, 0.",
    questions: [
      { prompt: "¿Cuánto es 8 × 8?", formula: "8 × 8 = ?", a: 8, b: 8, ans: 64, options: [56, 62, 64, 72], hint: "Un tablero de ajedrez tiene 8 × 8 = 64 casillas" },
      { prompt: "¿Cuánto es 8 × 3?", formula: "8 × 3 = ?", a: 8, b: 3, ans: 24, options: [21, 24, 26, 28], hint: "8 + 8 + 8 = 24" },
      { prompt: "Completa la multiplicación: 8 × ___ = 56", formula: "8 × ? = 56", a: 8, b: 7, ans: 7, options: [6, 7, 8, 9], hint: "56 dividido en 8 da 7" },
      { prompt: "¿Cuánto es 8 × 9?", formula: "8 × 9 = ?", a: 8, b: 9, ans: 72, options: [68, 70, 72, 80], hint: "80 menos 8 es 72" },
      { prompt: "¿Cuánto es 8 × 5?", formula: "8 × 5 = ?", a: 8, b: 5, ans: 40, options: [35, 40, 45, 48], hint: "La mitad de 80 es 40" }
    ]
  },
  9: {
    num: 9,
    title: "Tabla del 9",
    creatureName: "Buhito-Sabio",
    creatureImg: "creature9.svg",
    motto: "¡El enigma de la suma de dígitos!",
    color: "#b45309",
    bgSoft: "#fefce8",
    borderColor: "#fde047",
    emoji: "🦉",
    objectName: "pergaminos",
    objectEmoji: "📜",
    pattern: "¡La suma mágica! En todas las respuestas del 9 al 90, la suma de las dos cifras siempre da 9 (Ej: 18 -> 1+8=9, 27 -> 2+7=9).",
    trick: "💡 Truco de Buhito: Multiplica por 10 y réstale el número (Ej: 9 × 6 = 60 - 6 = 54).",
    questions: [
      { prompt: "¿Cuánto es 9 × 4?", formula: "9 × 4 = ?", a: 9, b: 4, ans: 36, options: [32, 34, 36, 40], hint: "La suma de dígitos es 9: 3 + 6 = 9" },
      { prompt: "¿Cuánto es 9 × 7?", formula: "9 × 7 = ?", a: 9, b: 7, ans: 63, options: [54, 61, 63, 72], hint: "6 + 3 = 9" },
      { prompt: "¿Cuánto es 9 × 9?", formula: "9 × 9 = ?", a: 9, b: 9, ans: 81, options: [72, 79, 81, 90], hint: "90 menos 9 = 81" },
      { prompt: "Completa el factor: 9 × ___ = 72", formula: "9 × ? = 72", a: 9, b: 8, ans: 8, options: [6, 7, 8, 9], hint: "7 + 2 = 9. El factor es 8" },
      { prompt: "¿Cuánto es 9 × 5?", formula: "9 × 5 = ?", a: 9, b: 5, ans: 45, options: [40, 45, 50, 54], hint: "4 + 5 = 9. Termina en 5" }
    ]
  },
  10: {
    num: 10,
    title: "Tabla del 10",
    creatureName: "Estrellín-Solar",
    creatureImg: "creature10.svg",
    motto: "¡El cero mágico y las decenas brillantes!",
    color: "#0891b2",
    bgSoft: "#ecfeff",
    borderColor: "#a5f3fc",
    emoji: "⭐",
    objectName: "monedas mágicas",
    objectEmoji: "🪙",
    pattern: "¡El Cero Mágico! Para multiplicar un número entero por 10, solo debes colocar un CERO al final del número.",
    trick: "💡 Truco de Estrellín: 10 × 4 = 40, 10 × 7 = 70, 10 × 10 = 100. ¡Súper rápido y divertido!",
    questions: [
      { prompt: "¿Cuánto es 10 × 6?", formula: "10 × 6 = ?", a: 10, b: 6, ans: 60, options: [50, 60, 70, 80], hint: "Pon un cero después del 6: 60" },
      { prompt: "¿Cuánto es 10 × 9?", formula: "10 × 9 = ?", a: 10, b: 9, ans: 90, options: [80, 89, 90, 100], hint: "Pon un cero después del 9" },
      { prompt: "¿Cuánto es 10 × 10?", formula: "10 × 10 = ?", a: 10, b: 10, ans: 100, options: [90, 99, 100, 110], hint: "Una centena completa: 100" },
      { prompt: "Completa el cálculo: 10 × ___ = 80", formula: "10 × ? = 80", a: 10, b: 8, ans: 8, options: [6, 7, 8, 9], hint: "¿A qué número le agregas un cero para dar 80?" },
      { prompt: "¿Cuánto es 10 × 4?", formula: "10 × 4 = ?", a: 10, b: 4, ans: 40, options: [30, 35, 40, 50], hint: "Cuatro decenas = 40" }
    ]
  }
};

class TablesModule {
  constructor(app) {
    this.app = app;
    this.currentTable = 2;
    this.currentMultiplier = 1;
    this.practiceIndex = 0;
    this.practiceScore = 0;
  }

  init() {
    this.renderTablesGrid();
    this.setupModalEvents();
  }

  renderTablesGrid() {
    const grid = document.getElementById('tablesGrid');
    if (!grid) return;
    grid.innerHTML = '';

    const student = this.app.getStudent();
    const completed = student.completedTables || [];
    const tableProgress = student.tableProgress || {};

    for (let t = 2; t <= 10; t++) {
      const data = TABLES_DATA[t];
      const prog = tableProgress[t] || { percent: 0, stars: 0 };
      const isDone = completed.includes(t);

      let statusBadge = `<span class="table-card-status status-active">Disponible</span>`;
      if (isDone) {
        statusBadge = `<span class="table-card-status status-done">¡Dominada! ✓</span>`;
      } else if (prog.percent > 0) {
        statusBadge = `<span class="table-card-status" style="background:#fef3c7; color:#b45309;">En curso (${prog.percent}%)</span>`;
      }

      // Stars HTML
      let starsHtml = '';
      for (let s = 1; s <= 3; s++) {
        const earned = s <= (prog.stars || 0);
        starsHtml += `<span class="table-star-icon ${earned ? 'earned' : ''}">★</span>`;
      }

      const card = document.createElement('article');
      card.className = 'table-card';
      card.style.borderColor = data.borderColor;
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.innerHTML = `
        <div>
          <div class="table-card-top">
            <!-- Cute Mascot Avatar -->
            <div class="table-creature-avatar" style="background: ${data.bgSoft}; border-color: ${data.borderColor};">
              <img src="IMAGEN/${data.creatureImg}" alt="${data.creatureName}" title="${data.creatureName}">
            </div>
            
            <div class="table-card-badge-box">
              <span class="table-number-tag" style="color: ${data.color};">× ${t}</span>
              ${statusBadge}
            </div>
          </div>

          <h3 class="table-card-title">${data.title}: ${data.creatureName}</h3>
          
          <div class="table-creature-speech">
            <span>💬</span> <span>"${data.motto}"</span>
          </div>

          <div class="table-card-stars" title="${prog.stars || 0} de 3 estrellas obtenidas">
            ${starsHtml}
          </div>
        </div>

        <div class="table-card-footer">
          <span>${data.emoji} ${prog.percent || 0}% de avance</span>
          <button type="button" class="btn btn-primary btn-sm" style="background: ${data.color}; border: none;">
            ¡Explorar! ➔
          </button>
        </div>
      `;

      card.addEventListener('click', () => this.openTableModal(t));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.openTableModal(t);
        }
      });

      grid.appendChild(card);

      // Milestone Card after Table 4
      if (t === 4) {
        const comboCard = document.createElement('div');
        comboCard.className = 'combo-mission-card';
        comboCard.innerHTML = `
          <div class="combo-mission-content">
            <h3>⚡ Misión Desafío: Trío Inicial (Tablas 2, 3 y 4)</h3>
            <p>¡Chispa-Ratón, Fuchy-Zorrito y Pingüi-Frost te invitan a un reto especial combinado!</p>
          </div>
          <button type="button" class="btn btn-accent" style="white-space: nowrap;">¡Jugar Desafío! 🎯</button>
        `;
        comboCard.addEventListener('click', () => {
          this.app.gamesModule.startSpecialMission([2, 3, 4], "Misión Trío: Tablas 2, 3 y 4");
        });
        grid.appendChild(comboCard);
      }

      // Milestone Card after Table 7
      if (t === 7) {
        const comboCard2 = document.createElement('div');
        comboCard2.className = 'combo-mission-card';
        comboCard2.style.background = 'linear-gradient(135deg, #fbcfe8 0%, #f472b6 50%, #c084fc 100%)';
        comboCard2.style.borderColor = '#db2777';
        comboCard2.innerHTML = `
          <div class="combo-mission-content">
            <h3 style="color: #831843;">🌸 Gran Reto Mágico: Tablas 5, 6 y 7</h3>
            <p style="color: #701a75;">¡Drako, Axo y Gati-Cósmico unen sus poderes antes del Ensayo SIMCE!</p>
          </div>
          <button type="button" class="btn btn-accent" style="white-space: nowrap; background: #db2777;">¡Aceptar Reto! ⚡</button>
        `;
        comboCard2.addEventListener('click', () => {
          this.app.gamesModule.startSpecialMission([5, 6, 7], "Gran Reto Mágico: Tablas 5, 6 y 7");
        });
        grid.appendChild(comboCard2);
      }
    }
  }

  setupModalEvents() {
    const closeBtn = document.getElementById('tableModalClose');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeTableModal());
    }

    const tabExplore = document.getElementById('tabExplore');
    const tabPractice = document.getElementById('tabPractice');
    if (tabExplore && tabPractice) {
      tabExplore.addEventListener('click', () => this.switchTableTab('explore'));
      tabPractice.addEventListener('click', () => this.switchTableTab('practice'));
    }
  }

  switchTableTab(tab) {
    const tabExplore = document.getElementById('tabExplore');
    const tabPractice = document.getElementById('tabPractice');
    const viewExplore = document.getElementById('viewExplore');
    const viewPractice = document.getElementById('viewPractice');

    if (tab === 'explore') {
      tabExplore.classList.add('active');
      tabPractice.classList.remove('active');
      viewExplore.style.display = 'block';
      viewPractice.style.display = 'none';
    } else {
      tabExplore.classList.remove('active');
      tabPractice.classList.add('active');
      viewExplore.style.display = 'none';
      viewPractice.style.display = 'block';
      this.loadPracticeQuestion(0);
    }
  }

  openTableModal(tableNum) {
    this.currentTable = tableNum;
    this.currentMultiplier = 1;
    this.app.sound.playPop();

    const data = TABLES_DATA[tableNum];
    const modal = document.getElementById('tableModalOverlay');
    const titleEl = document.getElementById('tableModalTitle');
    const badgeEl = document.getElementById('tableModalBadge');
    const creatureImgEl = document.getElementById('tableModalCreatureImg');

    if (titleEl) titleEl.textContent = `${data.title} con ${data.creatureName}`;
    if (badgeEl) {
      badgeEl.textContent = `TABLA DEL ${tableNum}`;
      badgeEl.style.background = data.color;
    }
    if (creatureImgEl) {
      creatureImgEl.src = `IMAGEN/${data.creatureImg}`;
      creatureImgEl.alt = data.creatureName;
    }

    this.switchTableTab('explore');
    this.renderMultiplierBar();
    this.updateCopisiView(1);
    this.updatePatternBox();

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  closeTableModal() {
    const modal = document.getElementById('tableModalOverlay');
    modal.classList.remove('open');
    document.body.style.overflow = '';
    this.renderTablesGrid();
    this.app.updateHeaderStats();
  }

  renderMultiplierBar() {
    const container = document.getElementById('multiplierBar');
    if (!container) return;
    container.innerHTML = '';

    for (let k = 1; k <= 10; k++) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `mult-btn ${k === this.currentMultiplier ? 'active' : ''}`;
      btn.textContent = `× ${k}`;
      btn.addEventListener('click', () => {
        this.app.sound.playPop();
        document.querySelectorAll('.mult-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentMultiplier = k;
        this.updateCopisiView(k);
      });
      container.appendChild(btn);
    }
  }

  updateCopisiView(k) {
    const t = this.currentTable;
    const res = t * k;
    const data = TABLES_DATA[t];

    const formulaEl = document.getElementById('copisiFormula');
    if (formulaEl) {
      formulaEl.innerHTML = `<strong>${t} × ${k} = ${res}</strong>`;
    }

    const addEl = document.getElementById('copisiAddition');
    if (addEl) {
      const parts = Array(k).fill(t);
      addEl.textContent = `${parts.join(' + ')} = ${res} (${k} veces ${t})`;
    }

    const groupsContainer = document.getElementById('visualGroups');
    if (groupsContainer) {
      groupsContainer.innerHTML = '';
      for (let g = 1; g <= k; g++) {
        const basket = document.createElement('div');
        basket.className = 'visual-group-basket';
        basket.style.borderColor = data.borderColor;
        basket.title = `Grupo ${g}: ${t} ${data.objectName}`;

        let itemsHtml = '';
        for (let i = 1; i <= t; i++) {
          itemsHtml += `<span class="visual-item-dot">${data.objectEmoji}</span>`;
        }
        basket.innerHTML = `
          <div style="font-size:0.8rem; font-weight:800; color:${data.color}; width:100%; text-align:center; margin-bottom:4px;">Grupo ${g}</div>
          <div style="display:flex; flex-wrap:wrap; gap:6px; justify-content:center;">${itemsHtml}</div>
        `;
        groupsContainer.appendChild(basket);
      }
    }

    this.renderNumberLine(t, k);
  }

  renderNumberLine(t, k) {
    const lineTrack = document.getElementById('numberLineTrack');
    if (!lineTrack) return;
    lineTrack.innerHTML = '';

    for (let step = 0; step <= 10; step++) {
      const stepVal = t * step;
      const stepEl = document.createElement('div');
      stepEl.className = 'nl-step';
      
      const isPastOrCurrent = step <= k && step > 0;
      stepEl.innerHTML = `
        ${isPastOrCurrent ? `<div class="nl-arc"><span class="nl-arc-badge">+${t}</span></div>` : ''}
        <div class="nl-tick" style="${step <= k ? 'background:#10b981; height: 16px;' : ''}"></div>
        <div class="nl-label" style="${step === k ? 'color: #4f46e5; font-size: 1.15rem; font-weight: 900;' : ''}">${stepVal}</div>
      `;
      lineTrack.appendChild(stepEl);
    }
  }

  updatePatternBox() {
    const data = TABLES_DATA[this.currentTable];
    const patternEl = document.getElementById('patternText');
    const trickEl = document.getElementById('trickText');
    if (patternEl) patternEl.textContent = data.pattern;
    if (trickEl) trickEl.textContent = data.trick;
  }

  /* =========================================================================
     EJERCICIOS INTERACTIVOS (Grandes Botones + Feedback Kawaii Inmediato)
     ========================================================================= */
  loadPracticeQuestion(index) {
    this.practiceIndex = index;
    const data = TABLES_DATA[this.currentTable];
    const q = data.questions[index];

    if (index === 0) {
      this.practiceScore = 0;
    }

    const container = document.getElementById('practiceContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="practice-header-meta">
        <div class="practice-question-badge">⭐ Ejercicio ${index + 1} de ${data.questions.length}</div>
        <div style="font-family:'Fredoka',sans-serif; font-size:1.1rem; font-weight:800; color:#b45309;">
          Puntos ganados: <span id="currentQuizScore">${this.practiceScore * 100}</span> pts 🪙
        </div>
      </div>

      <h3 class="practice-prompt">${q.prompt}</h3>
      <div class="practice-big-op">${q.formula}</div>

      <div class="practice-choices" id="practiceChoices">
        ${q.options.map(opt => `
          <button type="button" class="choice-chip" data-val="${opt}">${opt}</button>
        `).join('')}
      </div>

      <div style="display:flex; justify-content:center; gap:14px; margin-top:8px;">
        <button type="button" class="btn btn-secondary btn-sm" id="btnHint">💡 Pista de ${data.creatureName}</button>
      </div>

      <!-- Immediate Feedback Banner -->
      <div id="practiceFeedback" class="feedback-card-banner" style="display:none;"></div>
    `;

    const hintBtn = document.getElementById('btnHint');
    const feedbackEl = document.getElementById('practiceFeedback');

    hintBtn.addEventListener('click', () => {
      this.app.sound.playPop();
      feedbackEl.style.display = 'flex';
      feedbackEl.className = 'feedback-card-banner';
      feedbackEl.style.background = '#fefce8';
      feedbackEl.style.color = '#854d0e';
      feedbackEl.style.border = '3px solid #fde047';
      feedbackEl.innerHTML = `💡 <strong>${data.creatureName} dice:</strong> "${q.hint}"`;
    });

    const choiceBtns = container.querySelectorAll('.choice-chip');
    choiceBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const val = parseInt(btn.dataset.val, 10);
        choiceBtns.forEach(b => b.disabled = true);
        feedbackEl.style.display = 'flex';

        if (val === q.ans) {
          // CORRECT!
          this.app.sound.playSuccess();
          btn.classList.add('correct');
          feedbackEl.className = 'feedback-card-banner success';
          feedbackEl.innerHTML = `🎉 <strong>¡Correcto!</strong> ¡Eres genial! ${q.formula.replace('?', val)}`;
          this.practiceScore++;
          this.app.addScore(100);
          document.getElementById('currentQuizScore').textContent = this.practiceScore * 100;
        } else {
          // RETRY!
          this.app.sound.playError();
          btn.classList.add('wrong');
          feedbackEl.className = 'feedback-card-banner retry';
          feedbackEl.innerHTML = `💪 <strong>¡Inténtalo otra vez!</strong> ${data.creatureName} te recuerda: ${q.hint}`;
          choiceBtns.forEach(b => {
            if (parseInt(b.dataset.val, 10) === q.ans) b.classList.add('correct');
          });
        }

        setTimeout(() => {
          if (this.practiceIndex + 1 < data.questions.length) {
            this.loadPracticeQuestion(this.practiceIndex + 1);
          } else {
            this.finishPractice();
          }
        }, 1500);
      });
    });
  }

  finishPractice() {
    const total = TABLES_DATA[this.currentTable].questions.length;
    const earnedStars = this.practiceScore >= 5 ? 3 : this.practiceScore >= 3 ? 2 : 1;
    const percent = Math.round((this.practiceScore / total) * 100);
    const data = TABLES_DATA[this.currentTable];

    // Update persistence
    const student = this.app.getStudent();
    if (!student.tableProgress) student.tableProgress = {};
    const prevProg = student.tableProgress[this.currentTable] || { percent: 0, stars: 0 };

    student.tableProgress[this.currentTable] = {
      percent: Math.max(prevProg.percent, percent),
      stars: Math.max(prevProg.stars, earnedStars)
    };

    if (percent >= 80 && !student.completedTables.includes(this.currentTable)) {
      student.completedTables.push(this.currentTable);
      this.app.triggerConfetti();
      this.app.showToast(`🏆 ¡Felicitaciones! ¡${data.creatureName} se unió a tu equipo de campeones!`, 'star');
    }

    this.app.saveStudent(student);

    const container = document.getElementById('practiceContainer');
    container.innerHTML = `
      <div style="text-align: center; padding: 20px;">
        <img src="IMAGEN/${data.creatureImg}" alt="${data.creatureName}" style="width: 110px; height: 110px; margin-bottom: 12px; animation: rubberBand 0.8s;">
        <h3 style="font-size: 2.2rem; color: #1e1b4b; margin-bottom: 8px;">¡Desafío Superado con ${data.creatureName}!</h3>
        <p style="font-size: 1.25rem; color: #475569; font-weight: 700; margin-bottom: 16px;">
          Respondiste correctamente ${this.practiceScore} de ${total} ejercicios (${percent}%).
        </p>
        <div style="font-size: 2.8rem; color: #f59e0b; margin-bottom: 24px;">
          ${'★'.repeat(earnedStars)}${'☆'.repeat(3 - earnedStars)}
        </div>
        <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
          <button type="button" class="btn btn-secondary" id="btnRetryPractice">🔄 Practicar de Nuevo</button>
          <button type="button" class="btn btn-primary" id="btnBackToExplore">📖 Ver Explicación de Grupos</button>
        </div>
      </div>
    `;

    document.getElementById('btnRetryPractice').addEventListener('click', () => {
      this.loadPracticeQuestion(0);
    });

    document.getElementById('btnBackToExplore').addEventListener('click', () => {
      this.switchTableTab('explore');
    });
  }
}
