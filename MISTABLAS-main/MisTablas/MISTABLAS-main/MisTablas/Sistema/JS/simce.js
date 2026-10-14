/**
 * PLATAFORMA EDUCATIVA "MIS TABLAS"
 * Módulo del Ensayo Matemático Tipo SIMCE (4° Básico)
 * Situaciones contextualizadas y evaluación pedagógica
 */

const SIMCE_QUESTIONS = [
  {
    id: 1,
    context: "Compras y Quiosco Escolar",
    icon: "🍪",
    problem: "En el quiosco de la escuela, Sofía compró 6 paquetes de galletas para compartir en el recreo con sus compañeros. Si cada paquete contiene exactamente 8 galletas, ¿cuántas galletas tiene Sofía en total?",
    options: [
      { letter: "A", text: "14 galletas", val: 14 },
      { letter: "B", text: "42 galletas", val: 42 },
      { letter: "C", text: "48 galletas", val: 48 },
      { letter: "D", text: "56 galletas", val: 56 }
    ],
    correctLetter: "C",
    correctVal: 48,
    explanation: "Para calcular el total de galletas, representamos 6 paquetes de 8 galletas como una multiplicación: 6 × 8 = 48 galletas (o sumando 8 + 8 + 8 + 8 + 8 + 8 = 48)."
  },
  {
    id: 2,
    context: "Organización de Grupos en Sala de Clases",
    icon: "🔬",
    problem: "En el curso de 4° básico hay 28 estudiantes en total. La profesora Marcela necesita organizarlos en 7 grupos de trabajo con la misma cantidad de integrantes para realizar un experimento de Ciencias. ¿Cuántos estudiantes habrá en cada grupo?",
    options: [
      { letter: "A", text: "3 estudiantes por grupo", val: 3 },
      { letter: "B", text: "4 estudiantes por grupo", val: 4 },
      { letter: "C", text: "7 estudiantes por grupo", val: 7 },
      { letter: "D", text: "21 estudiantes por grupo", val: 21 }
    ],
    correctLetter: "B",
    correctVal: 4,
    explanation: "Buscamos qué número multiplicado por 7 da 28: 7 × 4 = 28. Por lo tanto, en cada grupo habrá 4 estudiantes."
  },
  {
    id: 3,
    context: "Distribución de Materiales Escolares",
    icon: "🖍️",
    problem: "Para la clase de Artes Visuales, el profesor entregó a las mesas 9 cajas de lápices de cera. Si cada caja contiene 6 lápices, ¿cuántos lápices de cera repartió el profesor en total?",
    options: [
      { letter: "A", text: "15 lápices", val: 15 },
      { letter: "B", text: "45 lápices", val: 45 },
      { letter: "C", text: "54 lápices", val: 54 },
      { letter: "D", text: "63 lápices", val: 63 }
    ],
    correctLetter: "C",
    correctVal: 54,
    explanation: "Multiplicamos la cantidad de cajas por la cantidad de lápices en cada una: 9 × 6 = 54 lápices (podemos recordar el truco del 9: 5 + 4 = 9)."
  },
  {
    id: 4,
    context: "El Huerto Escolar (Filas y Columnas)",
    icon: "🥬",
    problem: "En el huerto del colegio, los estudiantes plantaron lechugas ordenadas en forma de cuadrícula: hicieron 8 filas y en cada fila plantaron 7 lechugas. ¿Cuántas lechugas plantaron en total en el huerto?",
    options: [
      { letter: "A", text: "15 lechugas en total", val: 15 },
      { letter: "B", text: "49 lechugas en total", val: 49 },
      { letter: "C", text: "54 lechugas en total", val: 54 },
      { letter: "D", text: "56 lechugas en total", val: 56 }
    ],
    correctLetter: "D",
    correctVal: 56,
    explanation: "Una disposición rectangular de 8 filas por 7 columnas representa 8 × 7 = 56 lechugas en total (recuerda la secuencia mnemotécnica: 5, 6, 7, 8 -> 56 = 7 × 8)."
  },
  {
    id: 5,
    context: "Ahorro y Monedas de la Vida Cotidiana",
    icon: "🪙",
    problem: "Matías junta monedas en su alcancía. Durante 5 días seguidos guardó 10 monedas de $10 pesos cada día. ¿Cuántas monedas de $10 pesos reunió Matías durante esos 5 días?",
    options: [
      { letter: "A", text: "15 monedas", val: 15 },
      { letter: "B", text: "50 monedas", val: 50 },
      { letter: "C", text: "55 monedas", val: 55 },
      { letter: "D", text: "100 monedas", val: 100 }
    ],
    correctLetter: "B",
    correctVal: 50,
    explanation: "Multiplicamos 5 días por 10 monedas diarias: 5 × 10 = 50 monedas. (Aplicamos el patrón del 10: agregamos un cero al 5)."
  },
  {
    id: 6,
    context: "Juegos y Puntajes en la Feria Escolar",
    icon: "🎯",
    problem: "En la kermesse de la escuela, Vicente jugó al tiro al blanco. Acertó 6 tiros en la diana amarilla, la cual entrega 9 puntos por cada acierto. ¿Cuántos puntos consiguió Vicente en ese juego?",
    options: [
      { letter: "A", text: "45 puntos", val: 45 },
      { letter: "B", text: "54 puntos", val: 54 },
      { letter: "C", text: "60 puntos", val: 60 },
      { letter: "D", text: "63 puntos", val: 63 }
    ],
    correctLetter: "B",
    correctVal: 54,
    explanation: "Vicente logró 6 aciertos de 9 puntos: 6 × 9 = 54 puntos acumulados."
  },
  {
    id: 7,
    context: "El Acto Cívico del Colegio",
    icon: "🪑",
    problem: "Para la ceremonia de fin de año en el gimnasio, los auxiliares ordenaron 5 filas con 9 sillas cada una. ¿Cuántas sillas prepararon en total para que los apoderados tomen asiento?",
    options: [
      { letter: "A", text: "14 sillas", val: 14 },
      { letter: "B", text: "40 sillas", val: 40 },
      { letter: "C", text: "45 sillas", val: 45 },
      { letter: "D", text: "50 sillas", val: 50 }
    ],
    correctLetter: "C",
    correctVal: 45,
    explanation: "Hay 5 filas con 9 sillas cada una: 5 × 9 = 45 sillas. (Como multiplicamos por 5 y 9 es impar, termina en 5)."
  },
  {
    id: 8,
    context: "Salida Pedagógica en Furgón Escolar",
    icon: "🚐",
    problem: "Para una salida educativa al museo de ciencias, 4 furgones escolares se llenaron completamente con estudiantes de 4° básico. Si en cada furgón viajaban 8 estudiantes sentados, ¿cuántos estudiantes fueron al museo?",
    options: [
      { letter: "A", text: "12 estudiantes", val: 12 },
      { letter: "B", text: "24 estudiantes", val: 24 },
      { letter: "C", text: "32 estudiantes", val: 32 },
      { letter: "D", text: "36 estudiantes", val: 36 }
    ],
    correctLetter: "C",
    correctVal: 32,
    explanation: "Calculamos 4 grupos de 8 estudiantes: 4 × 8 = 32 estudiantes (el doble de 8 es 16, y el doble de 16 es 32)."
  },
  {
    id: 9,
    context: "Biblioteca de Aula y Fomento Lector",
    icon: "📚",
    problem: "En la biblioteca de la sala de clases hay una estantería con 3 repisas. En cada repisa la profesora colocó 8 libros de cuentos chilenos. ¿Cuántos libros de cuentos hay en la estantería?",
    options: [
      { letter: "A", text: "11 libros", val: 11 },
      { letter: "B", text: "21 libros", val: 21 },
      { letter: "C", text: "24 libros", val: 24 },
      { letter: "D", text: "28 libros", val: 28 }
    ],
    correctLetter: "C",
    correctVal: 24,
    explanation: "Hay 3 repisas con 8 libros cada una: 3 × 8 = 24 libros (o sumando 8 + 8 + 8 = 24)."
  },
  {
    id: 10,
    context: "Decoración del Aniversario del Colegio",
    icon: "🎈",
    problem: "Para decorar el patio de la escuela, el centro de alumnos preparó 7 ramilletes de globos. Si cada ramillete está compuesto por exactamente 7 globos de colores, ¿cuántos globos utilizaron en total?",
    options: [
      { letter: "A", text: "14 globos", val: 14 },
      { letter: "B", text: "42 globos", val: 42 },
      { letter: "C", text: "49 globos", val: 49 },
      { letter: "D", text: "56 globos", val: 56 }
    ],
    correctLetter: "C",
    correctVal: 49,
    explanation: "Multiplicamos 7 ramilletes por 7 globos: 7 × 7 = 49 globos en total."
  }
];

class SimceModule {
  constructor(app) {
    this.app = app;
    this.currentIndex = 0;
    this.userAnswers = {}; // { questionId: selectedLetter }
    this.timerSeconds = 0;
    this.timerInterval = null;
    this.isFinished = false;
  }

  init() {
    this.setupViewEvents();
  }

  setupViewEvents() {
    const btnStart = document.getElementById('btnStartSimce');
    if (btnStart) {
      btnStart.addEventListener('click', () => this.startSimceTest());
    }

    const btnPrev = document.getElementById('simceBtnPrev');
    const btnNext = document.getElementById('simceBtnNext');
    const btnFinish = document.getElementById('simceBtnFinish');

    if (btnPrev) btnPrev.addEventListener('click', () => this.prevQuestion());
    if (btnNext) btnNext.addEventListener('click', () => this.nextQuestion());
    if (btnFinish) btnFinish.addEventListener('click', () => this.confirmFinishSimce());
  }

  startSimceTest() {
    this.currentIndex = 0;
    this.userAnswers = {};
    this.timerSeconds = 0;
    this.isFinished = false;
    clearInterval(this.timerInterval);

    this.app.sound.playSuccess();

    // Show test container, hide intro and results
    document.getElementById('simceIntroScreen').style.display = 'none';
    document.getElementById('simceResultScreen').style.display = 'none';
    document.getElementById('simceTestingContainer').style.display = 'block';

    // Start timer
    this.timerInterval = setInterval(() => {
      this.timerSeconds++;
      const mins = String(Math.floor(this.timerSeconds / 60)).padStart(2, '0');
      const secs = String(this.timerSeconds % 60).padStart(2, '0');
      const timerEl = document.getElementById('simceTimerDisplay');
      if (timerEl) timerEl.textContent = `⏱️ ${mins}:${secs}`;
    }, 1000);

    this.renderSidebarNav();
    this.loadQuestion(0);
  }

  renderSidebarNav() {
    const navGrid = document.getElementById('simceNavGrid');
    if (!navGrid) return;
    navGrid.innerHTML = '';

    SIMCE_QUESTIONS.forEach((q, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `simce-q-btn ${idx === this.currentIndex ? 'current' : ''} ${this.userAnswers[q.id] ? 'answered' : ''}`;
      btn.textContent = q.id;
      btn.addEventListener('click', () => {
        this.app.sound.playPop();
        this.loadQuestion(idx);
      });
      navGrid.appendChild(btn);
    });

    const answeredCount = Object.keys(this.userAnswers).length;
    const countEl = document.getElementById('simceAnsweredCount');
    if (countEl) countEl.textContent = `${answeredCount} de 10`;
  }

  loadQuestion(index) {
    this.currentIndex = index;
    const q = SIMCE_QUESTIONS[index];

    // Update Sidebar highlight
    this.renderSidebarNav();

    // Context & badges
    document.getElementById('simceQBadge').textContent = `Pregunta ${q.id} de 10`;
    document.getElementById('simceContextTag').innerHTML = `${q.icon} ${q.context}`;
    document.getElementById('simceProblemText').textContent = q.problem;

    // Options A, B, C, D
    const optionsContainer = document.getElementById('simceOptionsList');
    optionsContainer.innerHTML = '';

    q.options.forEach(opt => {
      const card = document.createElement('div');
      card.className = `simce-option-card ${this.userAnswers[q.id] === opt.letter ? 'selected' : ''}`;
      card.innerHTML = `
        <div class="option-letter">${opt.letter}</div>
        <div class="option-text">${opt.text}</div>
      `;

      card.addEventListener('click', () => {
        this.app.sound.playPop();
        this.userAnswers[q.id] = opt.letter;
        
        // Visual selection
        optionsContainer.querySelectorAll('.simce-option-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        
        this.renderSidebarNav();
      });

      optionsContainer.appendChild(card);
    });

    // Prev / Next button state
    document.getElementById('simceBtnPrev').disabled = (index === 0);
    document.getElementById('simceBtnNext').disabled = (index === SIMCE_QUESTIONS.length - 1);
  }

  prevQuestion() {
    if (this.currentIndex > 0) {
      this.app.sound.playPop();
      this.loadQuestion(this.currentIndex - 1);
    }
  }

  nextQuestion() {
    if (this.currentIndex < SIMCE_QUESTIONS.length - 1) {
      this.app.sound.playPop();
      this.loadQuestion(this.currentIndex + 1);
    }
  }

  confirmFinishSimce() {
    const answeredCount = Object.keys(this.userAnswers).length;
    const remaining = 10 - answeredCount;

    if (remaining > 0) {
      this.app.sound.playError();
      const confirmSend = confirm(`⚠️ Aún te quedan ${remaining} pregunta(s) sin responder.\n¿Deseas enviar el ensayo de todas formas?`);
      if (!confirmSend) return;
    }

    this.finishSimceTest();
  }

  finishSimceTest() {
    clearInterval(this.timerInterval);
    this.isFinished = true;
    this.app.sound.playSuccess();
    this.app.triggerConfetti();

    let correctCount = 0;
    SIMCE_QUESTIONS.forEach(q => {
      if (this.userAnswers[q.id] === q.correctLetter) {
        correctCount++;
      }
    });

    const percent = Math.round((correctCount / 10) * 100);
    
    // Scale SIMCE estimation (ranges 200..330)
    const simceScore = 200 + (correctCount * 13);

    let levelTitle = "Nivel Adecuado ★★★";
    let levelColor = "#15803d";
    let levelMessage = "¡Excelente rendimiento! Demuestras una comprensión sólida de la multiplicación en situaciones cotidianas de 4° básico.";

    if (correctCount >= 9) {
      levelTitle = "Nivel Destacado / Avanzado 🏆";
      levelColor = "#4f46e5";
      levelMessage = "¡Rendimiento sobresaliente! Dominas con total seguridad las tablas del 2 al 10 y la resolución de problemas tipo SIMCE.";
    } else if (correctCount >= 6) {
      levelTitle = "Nivel Adecuado 🌟";
      levelColor = "#059669";
      levelMessage = "¡Buen trabajo! Has alcanzado los aprendizajes requeridos para 4° básico. Revisa las preguntas con error para perfeccionar tus destrezas.";
    } else if (correctCount >= 4) {
      levelTitle = "Nivel Elemental ⚠️";
      levelColor = "#d97706";
      levelMessage = "Vas por buen camino, pero te recomendamos reforzar las tablas visuales y volver a practicar antes del SIMCE oficial.";
    } else {
      levelTitle = "Nivel Inicial / Por Mejorar 💡";
      levelColor = "#dc2626";
      levelMessage = "No te desanimes. Las matemáticas requieren práctica: visita el módulo 'Aprende las Tablas' y prueba los juegos dinámicos.";
    }

    // Award general score
    this.app.addScore(correctCount * 150);

    // Save in student profile
    const student = this.app.getStudent();
    if (!student.simceHistory) student.simceHistory = [];
    student.simceHistory.push({
      date: new Date().toLocaleDateString('es-CL'),
      correct: correctCount,
      simceScore: simceScore,
      percent: percent,
      timeSeconds: this.timerSeconds
    });

    if (!student.achievements.includes('simce_ready')) {
      student.achievements.push('simce_ready');
    }
    this.app.saveStudent(student);

    // Render results view
    document.getElementById('simceTestingContainer').style.display = 'none';
    const resultScreen = document.getElementById('simceResultScreen');
    resultScreen.style.display = 'block';

    const mins = Math.floor(this.timerSeconds / 60);
    const secs = this.timerSeconds % 60;

    resultScreen.innerHTML = `
      <div class="simce-result-card">
        <img src="IMAGEN/simce_badge.svg" alt="Insignia SIMCE" style="width: 80px; height: 80px; margin-bottom: 12px;">
        <h2 style="font-size: 2.2rem; color: #1e1b4b; margin-bottom: 6px;">Resultado del Ensayo SIMCE</h2>
        <p style="color: #64748b; font-weight: 700; margin-bottom: 20px;">Matemática 4° Básico • Tiempo utilizado: ${mins}m ${secs}s</p>

        <div class="simce-score-circle">
          <span class="big-num">${simceScore}</span>
          <span class="sub-txt">PUNTOS SIMCE</span>
        </div>

        <div class="simce-feedback-level" style="color: ${levelColor};">${levelTitle}</div>
        <p class="simce-feedback-text">${levelMessage}</p>

        <div style="display: flex; justify-content: center; gap: 20px; margin-bottom: 24px; font-weight: 800;">
          <div style="background: #f0fdf4; padding: 10px 18px; border-radius: 12px; border: 1.5px solid #86efac; color: #166534;">
            ✅ Correctas: ${correctCount} / 10 (${percent}%)
          </div>
          <div style="background: #fef2f2; padding: 10px 18px; border-radius: 12px; border: 1.5px solid #fca5a5; color: #991b1b;">
            ❌ Por mejorar: ${10 - correctCount} / 10
          </div>
        </div>

        <!-- Banner Post-SIMCE: Crea tu Monstruo Multiplicador -->
        <div class="post-simce-relax-banner">
          <div style="display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 8px;">
            <span style="font-size: 2.5rem;">🎨</span>
            <div style="text-align: left;">
              <span class="cute-ribbon-pill" style="background:#fef08a; color:#854d0e; font-size:0.82rem; font-weight:800;">
                ¡MOMENTO DE RELAJO Y CREATIVIDAD!
              </span>
              <h3 style="font-size: 1.55rem; color: #1e1b4b; margin-top: 4px;">
                Crea tu Monstruo Multiplicador
              </h3>
            </div>
          </div>
          <p style="color: #475569; font-size: 1.05rem; font-weight: 600; line-height: 1.5; max-width: 620px; margin: 0 auto 16px;">
            ¡Hiciste un esfuerzo enorme en la prueba! Ahora deja atrás la evaluación, relaja tu mente y diviértete dibujando a tu propia criatura mágica con 5 multiplicaciones entretenidas.
          </p>
          <button type="button" class="btn btn-accent btn-lg" id="btnGoToMonsterCreator" style="background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%); font-size: 1.25rem; padding: 14px 32px;">
            <span>🎨 ¡Crear mi Monstruo Multiplicador!</span> 👾
          </button>
        </div>

        <h3 style="font-size: 1.4rem; color: #1e1b4b; margin: 28px 0 16px; text-align: left;">
          📋 Retroalimentación y Explicación Paso a Paso:
        </h3>

        <div class="simce-review-list" id="simceReviewList"></div>

        <div style="display: flex; gap: 14px; justify-content: center; margin-top: 30px; flex-wrap: wrap;">
          <button type="button" class="btn btn-secondary" id="btnRestartSimce">🔄 Repetir el Ensayo</button>
          <button type="button" class="btn btn-primary" id="btnExitSimce">🏠 Volver al Mapa de Zonas</button>
        </div>
      </div>
    `;

    // Render review items
    const reviewList = document.getElementById('simceReviewList');
    SIMCE_QUESTIONS.forEach(q => {
      const userChoice = this.userAnswers[q.id] || "Sin responder";
      const isCorrect = (userChoice === q.correctLetter);

      const item = document.createElement('div');
      item.className = `simce-review-item ${isCorrect ? 'correct' : 'incorrect'}`;
      item.innerHTML = `
        <div class="review-item-header">
          <span>Pregunta ${q.id}: ${q.context}</span>
          <span style="font-weight: 800; color: ${isCorrect ? '#166534' : '#991b1b'};">
            ${isCorrect ? '✅ Correcta' : '❌ Incorrecta'}
          </span>
        </div>
        <div style="font-size: 0.95rem; margin-bottom: 6px; color: #334155;"><strong>Problema:</strong> ${q.problem}</div>
        <div style="font-size: 0.9rem; margin-bottom: 4px;">
          Tu respuesta: <strong>${userChoice}</strong> | Respuesta correcta: <strong>${q.correctLetter}</strong>
        </div>
        <div class="review-explanation">
          💡 <strong>Solución:</strong> ${q.explanation}
        </div>
      `;
      reviewList.appendChild(item);
    });

    const btnMonster = document.getElementById('btnGoToMonsterCreator');
    if (btnMonster) {
      btnMonster.addEventListener('click', () => {
        this.app.sound.playSuccess();
        this.app.switchMainTab('monster');
      });
    }

    document.getElementById('btnRestartSimce').addEventListener('click', () => {
      this.startSimceTest();
    });

    document.getElementById('btnExitSimce').addEventListener('click', () => {
      this.app.switchMainTab('adventure');
    });
  }
}
