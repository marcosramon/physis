// ============================================================
// PHYSIS — MOTOR DO JOGO
// ============================================================
// Este arquivo contém toda a lógica do jogo:
// - Gerenciamento de estado (HP, score, fases)
// - Sistema de batalha por turnos
// - Sistema de easter eggs
// - Ranking local (localStorage)
//
// DEPENDÊNCIAS (devem ser carregados antes):
// - philosophers.js (PHILOSOPHERS, PHASES, ENEMIES, etc.)
// - questions.js (QUESTIONS)
// - easter-eggs.js (EASTER_EGGS)
// - sfx.js (SFX)
// ============================================================

const PhysisGame = (() => {
  // ─── ESTADO DO JOGO ─────────────────────────────────────────
  let state = {};

  function resetState() {
    state = {
      screen: "name",        // name | rules | battle | victory | defeat | ranking
      playerName: "",
      playerHp: 100,
      maxPlayerHp: 100,
      score: 0,
      phase: 0,
      enemyIndex: 0,
      enemyHp: 0,
      enemyMaxHp: 0,
      hand: [],              // 5 filósofos sorteados
      usedThisBattle: [],    // filósofos já usados na batalha atual
      usedQuestions: new Set(),
      selectedPhilosopher: null,
      currentQuestion: null,
      questionTimestamp: 0,
      turnState: "choose",   // choose | quiz | result | enemyAttack
      answered: false,
      selectedAnswer: null,
      correctIdx: null,
      wasCorrect: false,
      answerTip: "",
      damageDealt: 0,
      totalCorrect: 0,
      totalQuestions: 0,
      consecutiveCorrect: 0,
      consecutiveErrors: 0,
      devocaoCount: {},       // { philosopherId: count }
      triggeredEggs: {},      // { eggId: true }
      triggeredEggsLocal: {}, // para eggs do lado do cliente
      titles: [],             // títulos conquistados
      shakeEnemy: false,
      shakePlayer: false,
      floatEnemyDmg: null,
      floatPlayerDmg: null,
      activeModal: null,      // { title, text }
      pendingEggs: [],
      isDark: true
    };
  }

  // ─── CALLBACKS (definidos pelo UI) ──────────────────────────
  let onStateChange = () => {};

  function setState(updates) {
    Object.assign(state, updates);
    onStateChange(state);
  }

  function getState() {
    return { ...state };
  }

  // ─── INICIALIZAÇÃO ──────────────────────────────────────────
  function init(callback) {
    onStateChange = callback;
    resetState();
    onStateChange(state);
  }

  // ─── ENTRADA DO JOGADOR ─────────────────────────────────────
  function setPlayerName(name) {
    setState({ playerName: name.trim() });
  }

  function startGame() {
    if (!state.playerName) return;
    setState({ screen: "rules" });
  }

  function startBattle() {
    const hand = shuffleArray([...PHILOSOPHERS]).slice(0, 5);
    const enemy = getEnemy(0, 0);
    setState({
      screen: "battle",
      hand,
      phase: 0,
      enemyIndex: 0,
      enemyHp: enemy.hp,
      enemyMaxHp: enemy.hp,
      usedThisBattle: [],
      turnState: "choose"
    });
    startIdleTimer();
    startTabWatcher();
  }

  // ─── SISTEMA DE BATALHA ─────────────────────────────────────
  function getEnemy(phase, index) {
    const phaseEnemies = ENEMIES.filter(e => e.phase === phase);
    return phaseEnemies[index] || phaseEnemies[0];
  }

  function getCurrentEnemy() {
    return getEnemy(state.phase, state.enemyIndex);
  }

  function selectPhilosopher(philosopher) {
    if (state.usedThisBattle.includes(philosopher.id)) return;
    SFX.select();

    // Buscar questão não usada deste filósofo
    const available = QUESTIONS.filter(
      q => q.philosopherId === philosopher.id && !state.usedQuestions.has(q.q)
    );

    // Se não houver questão deste filósofo, pegar qualquer não usada
    let question;
    if (available.length > 0) {
      question = available[Math.floor(Math.random() * available.length)];
    } else {
      const anyAvailable = QUESTIONS.filter(q => !state.usedQuestions.has(q.q));
      if (anyAvailable.length > 0) {
        question = anyAvailable[Math.floor(Math.random() * anyAvailable.length)];
      } else {
        // Resetar questões usadas se todas foram usadas
        state.usedQuestions.clear();
        question = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];
      }
    }

    setState({
      selectedPhilosopher: philosopher,
      currentQuestion: question,
      questionTimestamp: Date.now(),
      turnState: "quiz",
      answered: false,
      selectedAnswer: null,
      correctIdx: null
    });

    resetIdleTimer();
  }

  function answerQuestion(answerIndex) {
    if (state.answered) return;

    const question = state.currentQuestion;
    const correct = answerIndex === question.correct;
    const timeTaken = Date.now() - state.questionTimestamp;
    const philosopher = state.selectedPhilosopher;
    const enemy = getCurrentEnemy();

    // Calcular dano
    let damage = 0;
    if (correct) {
      damage = philosopher.attack + Math.floor(Math.random() * 6);
      SFX.correct();
    } else {
      damage = 0;
      SFX.wrong();
    }

    // Atualizar contadores
    const newUsedQuestions = new Set(state.usedQuestions);
    newUsedQuestions.add(question.q);

    const newConsCorrect = correct ? state.consecutiveCorrect + 1 : 0;
    const newConsErrors = correct ? 0 : state.consecutiveErrors + 1;

    // Devoção
    const newDevocao = { ...state.devocaoCount };
    if (correct) {
      newDevocao[philosopher.id] = (newDevocao[philosopher.id] || 0) + 1;
    }

    // Easter eggs
    const eggs = checkEasterEggs(correct, timeTaken, newConsCorrect, newConsErrors, newDevocao, philosopher.id);

    setState({
      answered: true,
      selectedAnswer: answerIndex,
      correctIdx: question.correct,
      wasCorrect: correct,
      answerTip: question.tip,
      damageDealt: damage,
      totalCorrect: state.totalCorrect + (correct ? 1 : 0),
      totalQuestions: state.totalQuestions + 1,
      usedQuestions: newUsedQuestions,
      consecutiveCorrect: newConsCorrect,
      consecutiveErrors: newConsErrors,
      devocaoCount: newDevocao,
      enemyHp: Math.max(0, state.enemyHp - damage),
      score: state.score + (correct ? (enemy.isBoss ? 50 : 10) : 0),
      usedThisBattle: [...state.usedThisBattle, philosopher.id],
      shakeEnemy: damage > 0,
      floatEnemyDmg: damage > 0 ? damage : null,
      pendingEggs: eggs,
      turnState: "result"
    });

    // Limpar shake
    setTimeout(() => setState({ shakeEnemy: false, floatEnemyDmg: null }), 600);

    resetIdleTimer();
  }

  function continueAfterResult() {
    // Mostrar easter eggs pendentes primeiro
    if (state.pendingEggs.length > 0) {
      const egg = state.pendingEggs[0];
      const remaining = state.pendingEggs.slice(1);

      let hpChange = 0;
      const newTitles = [...state.titles];
      if (egg.hpBonus) hpChange = egg.hpBonus;
      if (egg.hpPenalty) hpChange = -egg.hpPenalty;
      if (egg.titleEmoji) newTitles.push(egg.titleEmoji);

      SFX.easterEgg();
      setState({
        activeModal: { title: egg.title, text: egg.text },
        pendingEggs: remaining,
        playerHp: Math.min(state.maxPlayerHp, Math.max(0, state.playerHp + hpChange)),
        titles: newTitles,
        floatPlayerDmg: hpChange < 0 ? Math.abs(hpChange) : null
      });
      if (hpChange < 0) {
        setTimeout(() => setState({ floatPlayerDmg: null }), 1000);
      }
      return;
    }

    // Verificar se inimigo morreu
    if (state.enemyHp <= 0) {
      advanceEnemy();
      return;
    }

    // Verificar se ainda tem filósofos disponíveis
    const availablePhilosophers = state.hand.filter(p => !state.usedThisBattle.includes(p.id));
    if (availablePhilosophers.length === 0) {
      // Refill hand
      const newHand = shuffleArray([...PHILOSOPHERS]).slice(0, 5);
      setState({ hand: newHand, usedThisBattle: [] });
    }

    // Contra-ataque do inimigo
    enemyAttack();
  }

  function dismissModal() {
    setState({ activeModal: null });
    // Se há mais eggs, continueAfterResult vai mostrar o próximo
    if (state.pendingEggs.length > 0) {
      continueAfterResult();
    }
  }

  function enemyAttack() {
    const enemy = getCurrentEnemy();
    const baseDmg = enemy.attack;
    // Se o jogador acertou, dano é reduzido
    const dmg = state.wasCorrect ? Math.max(1, Math.floor(baseDmg * 0.5)) : baseDmg;

    SFX.enemyAttack();
    setState({
      turnState: "enemyAttack",
      shakePlayer: true,
      floatPlayerDmg: dmg
    });

    setTimeout(() => {
      const newHp = Math.max(0, state.playerHp - dmg);
      setState({
        playerHp: newHp,
        shakePlayer: false,
        floatPlayerDmg: null
      });

      setTimeout(() => {
        if (newHp <= 0) {
          SFX.defeat();
          setState({ screen: "defeat", turnState: "choose" });
        } else {
          setState({ turnState: "choose" });
        }
      }, 500);
    }, 1200);
  }

  function advanceEnemy() {
    const phaseEnemies = ENEMIES.filter(e => e.phase === state.phase);
    const nextEnemyIdx = state.enemyIndex + 1;

    if (nextEnemyIdx < phaseEnemies.length) {
      // Próximo inimigo da mesma fase
      const nextEnemy = phaseEnemies[nextEnemyIdx];
      SFX.victory();
      const newHand = shuffleArray([...PHILOSOPHERS]).slice(0, 5);
      setState({
        enemyIndex: nextEnemyIdx,
        enemyHp: nextEnemy.hp,
        enemyMaxHp: nextEnemy.hp,
        hand: newHand,
        usedThisBattle: [],
        turnState: "choose"
      });
    } else {
      // Avançar de fase
      const nextPhase = state.phase + 1;
      if (nextPhase < PHASES.length) {
        SFX.phaseTransition();
        const nextEnemy = getEnemy(nextPhase, 0);
        const newHand = shuffleArray([...PHILOSOPHERS]).slice(0, 5);
        setState({
          phase: nextPhase,
          enemyIndex: 0,
          enemyHp: nextEnemy.hp,
          enemyMaxHp: nextEnemy.hp,
          hand: newHand,
          usedThisBattle: [],
          turnState: "choose"
        });
      } else {
        // Jogo completo!
        SFX.epicVictory();
        setState({ screen: "victory" });
        saveScore();
      }
    }
  }

  // ─── EASTER EGGS ────────────────────────────────────────────
  function checkEasterEggs(correct, timeTaken, consCorrect, consErrors, devocao, philosopherId) {
    const eggs = [];

    // Streak eggs
    EASTER_EGGS.streak.forEach(egg => {
      if (state.triggeredEggs[egg.id]) return;
      if (egg.condition.type === "correct" && consCorrect === egg.condition.count) {
        state.triggeredEggs[egg.id] = true;
        eggs.push(egg);
      }
      if (egg.condition.type === "errors" && consErrors === egg.condition.count) {
        state.triggeredEggs[egg.id] = true;
        eggs.push(egg);
      }
    });

    // Speed eggs
    EASTER_EGGS.speed.forEach(egg => {
      if (state.triggeredEggs[egg.id]) return;
      if (timeTaken < egg.condition.maxTime) {
        if (egg.onlyOnError && correct) return;
        state.triggeredEggs[egg.id] = true;
        eggs.push(egg);
      }
    });

    // Devotion eggs
    EASTER_EGGS.devotion.forEach(egg => {
      if (state.triggeredEggs[egg.id]) return;
      if (correct && devocao[philosopherId] >= egg.condition.count) {
        state.triggeredEggs[egg.id] = true;
        eggs.push(egg);
      }
    });

    return eggs;
  }

  // ─── IDLE & TAB WATCHERS ────────────────────────────────────
  let idleTimer = null;

  function startIdleTimer() {
    clearTimeout(idleTimer);
  }

  function resetIdleTimer() {
    clearTimeout(idleTimer);
    if (state.turnState === "quiz" || state.turnState === "choose") {
      const idleEgg = EASTER_EGGS.idle[0];
      if (idleEgg && !state.triggeredEggsLocal[idleEgg.id]) {
        idleTimer = setTimeout(() => {
          state.triggeredEggsLocal[idleEgg.id] = true;
          SFX.easterEgg();
          setState({ activeModal: { title: idleEgg.title, text: idleEgg.text } });
        }, (idleEgg.condition.idleSeconds || 30) * 1000);
      }
    }
  }

  function startTabWatcher() {
    document.addEventListener("visibilitychange", handleTabSwitch);
  }

  function handleTabSwitch() {
    if (document.hidden && state.screen === "battle") {
      const tabEgg = EASTER_EGGS.tabswitch[0];
      if (tabEgg && !state.triggeredEggsLocal[tabEgg.id]) {
        state.triggeredEggsLocal[tabEgg.id] = true;
        SFX.easterEgg();
        const penalty = tabEgg.hpPenalty || 0;
        setState({
          activeModal: { title: tabEgg.title, text: tabEgg.text },
          playerHp: Math.max(0, state.playerHp - penalty),
          floatPlayerDmg: penalty > 0 ? penalty : null
        });
        if (penalty > 0) {
          setTimeout(() => setState({ floatPlayerDmg: null }), 1000);
        }
      }
    }
  }

  // ─── RANKING (localStorage) ─────────────────────────────────
  function saveScore() {
    try {
      const scores = JSON.parse(localStorage.getItem("physis_scores") || "[]");
      scores.push({
        name: state.playerName,
        score: state.score,
        correct: state.totalCorrect,
        total: state.totalQuestions,
        titles: state.titles.join(""),
        timestamp: Date.now()
      });
      // Manter top 50
      scores.sort((a, b) => b.score - a.score);
      localStorage.setItem("physis_scores", JSON.stringify(scores.slice(0, 50)));
    } catch (e) { /* localStorage indisponível */ }
  }

  function getScores() {
    try {
      return JSON.parse(localStorage.getItem("physis_scores") || "[]");
    } catch (e) {
      return [];
    }
  }

  function clearScores() {
    try { localStorage.removeItem("physis_scores"); } catch (e) {}
  }

  // ─── UTILITÁRIOS ────────────────────────────────────────────
  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function toggleTheme() {
    setState({ isDark: !state.isDark });
  }

  function restart() {
    document.removeEventListener("visibilitychange", handleTabSwitch);
    clearTimeout(idleTimer);
    resetState();
    onStateChange(state);
  }

  function showRanking() {
    setState({ screen: "ranking" });
  }

  // ─── API PÚBLICA ────────────────────────────────────────────
  return {
    init,
    getState,
    setPlayerName,
    startGame,
    startBattle,
    selectPhilosopher,
    answerQuestion,
    continueAfterResult,
    dismissModal,
    toggleTheme,
    restart,
    showRanking,
    getScores,
    clearScores
  };
})();
