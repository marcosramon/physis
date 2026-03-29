// ============================================================
// PHYSIS — INTERFACE (RENDERIZAÇÃO)
// ============================================================
// Renderiza o jogo no DOM a partir do estado do motor (game.js).
// Usa vanilla JS — sem frameworks.
//
// PARA ADAPTAR:
// - Mude os textos de interface aqui
// - Altere o layout modificando as funções render*
// ============================================================

const UI = (() => {
  const app = document.getElementById("app");

  function render(s) {
    // Tema
    document.documentElement.setAttribute("data-theme", s.isDark ? "dark" : "light");

    switch (s.screen) {
      case "name":     renderNameScreen(s); break;
      case "rules":    renderRulesScreen(s); break;
      case "battle":   renderBattleScreen(s); break;
      case "victory":  renderEndScreen(s, true); break;
      case "defeat":   renderEndScreen(s, false); break;
      case "ranking":  renderRankingScreen(s); break;
    }

    // Modal
    if (s.activeModal) renderModal(s.activeModal);
  }

  // ─── TELA DE NOME ───────────────────────────────────────────
  function renderNameScreen(s) {
    app.innerHTML = `
      <button class="theme-toggle" onclick="PhysisGame.toggleTheme()">${s.isDark ? "☀️" : "🌙"}</button>
      <div class="screen">
        <div class="game-icon">🏛️</div>
        <h1 class="game-title">PHYSIS</h1>
        <p class="game-subtitle">Quiz-Battle dos Pré-Socráticos</p>
        <input 
          class="name-input" 
          type="text" 
          placeholder="Seu nome" 
          value="${escHtml(s.playerName)}"
          maxlength="30"
          id="nameInput"
        />
        <div style="height:12px"></div>
        <button class="btn btn-primary" onclick="PhysisGame.startGame()" ${!s.playerName ? 'disabled' : ''}>
          Entrar ▸
        </button>
        <div style="height:8px"></div>
        <button class="btn btn-secondary" onclick="PhysisGame.showRanking()">
          🏆 Ranking
        </button>
        <div class="footer">
          Concepção e design: <a href="https://marcosramon.net" target="_blank">Marcos Ramon</a><br>
          <a href="https://github.com/marcosramon/physis" target="_blank">Código aberto no GitHub</a>
        </div>
      </div>
    `;
    const input = document.getElementById("nameInput");
    input.addEventListener("input", e => PhysisGame.setPlayerName(e.target.value));
    input.addEventListener("keydown", e => { if (e.key === "Enter") PhysisGame.startGame(); });
    input.focus();
  }

  // ─── TELA DE REGRAS ─────────────────────────────────────────
  function renderRulesScreen(s) {
    app.innerHTML = `
      <button class="theme-toggle" onclick="PhysisGame.toggleTheme()">${s.isDark ? "☀️" : "🌙"}</button>
      <div class="screen">
        <div class="game-icon">⚔️</div>
        <h2 style="color:var(--accent);font-size:22px;margin-bottom:20px">Como jogar</h2>
        <div class="rules-box">
          <h3>1. Cartas</h3>
          <p>Você recebe 5 filósofos aleatórios como cartas. Cada um ataca com força diferente.</p>
          <h3>2. Batalha</h3>
          <p>Escolha um filósofo e responda a uma questão sobre os pré-socráticos. Acertou? Causa dano ao inimigo!</p>
          <h3>3. Desgaste</h3>
          <p>Errar zera seu ataque e aumenta o contra-ataque inimigo. Acertar reduz o dano que você sofre — mas nunca o elimina!</p>
          <h3>4. Fases</h3>
          <p>São 3 regiões com inimigos cada vez mais fortes. O chefão final é imbatível — sobreviva o máximo que puder!</p>
          <h3>5. Surpresas</h3>
          <p>Existem eventos secretos escondidos no jogo. Fique atento... 👀</p>
        </div>
        <div style="height:20px"></div>
        <button class="btn btn-primary" onclick="PhysisGame.startBattle()">
          Iniciar Batalha ⚔️
        </button>
      </div>
    `;
  }

  // ─── TELA DE BATALHA ────────────────────────────────────────
  function renderBattleScreen(s) {
    const enemy = getCurrentEnemyData(s);
    const phase = PHASES[s.phase];

    let middleContent = "";

    if (s.turnState === "choose") {
      middleContent = renderHandCards(s);
    } else if (s.turnState === "quiz" && s.currentQuestion) {
      middleContent = renderQuiz(s);
    } else if (s.turnState === "result") {
      middleContent = renderResult(s);
    } else if (s.turnState === "enemyAttack") {
      middleContent = `
        <div class="enemy-attack-screen">
          <div class="enemy-attack-emoji">${enemy.emoji}</div>
          <div class="enemy-attack-label">${escHtml(enemy.name)} contra-ataca!</div>
          <div class="enemy-attack-dmg">-${s.floatPlayerDmg || enemy.attack} HP</div>
        </div>
      `;
    }

    app.innerHTML = `
      <button class="theme-toggle" onclick="PhysisGame.toggleTheme()">${s.isDark ? "☀️" : "🌙"}</button>
      
      <!-- Header com fase -->
      <div class="battle-header">
        <div class="phase-label">${phase.emoji} Fase ${s.phase + 1}: ${escHtml(phase.name)}</div>
      </div>

      <!-- Inimigo -->
      <div class="enemy-area">
        <div style="position:relative;display:inline-block">
          <div class="enemy-emoji ${s.shakeEnemy ? 'anim-shake' : 'anim-float'}">${enemy.emoji}</div>
          ${s.floatEnemyDmg ? `<div class="floating-number floating-damage">-${s.floatEnemyDmg}</div>` : ''}
        </div>
        <div class="enemy-name">${escHtml(enemy.name)}</div>
        <div style="max-width:260px;margin:10px auto">
          ${renderHpBar(s.enemyHp, s.enemyMaxHp, 'var(--danger)')}
        </div>
        ${enemy.isBoss ? '<div class="boss-label">Chefão imbatível. Sobreviva e farme pontos (5x)!</div>' : ''}
      </div>

      <!-- Conteúdo central -->
      <div style="flex:1;overflow-y:auto;padding-bottom:10px">
        ${middleContent}
      </div>

      <!-- Jogador -->
      <div class="player-area ${s.shakePlayer ? 'anim-shake' : ''}" style="position:relative">
        <div class="player-emoji">🧙</div>
        <div class="player-info">
          <div class="player-name-display">${escHtml(s.playerName)} <span class="player-titles">${s.titles.join("")}</span></div>
          ${renderHpBar(s.playerHp, s.maxPlayerHp, 'var(--success)')}
        </div>
        <div class="player-score">${s.score}</div>
        ${s.floatPlayerDmg ? `<div class="floating-number floating-damage" style="right:60px;top:-10px">-${s.floatPlayerDmg}</div>` : ''}
      </div>
    `;

    // Bind events
    bindBattleEvents(s);
  }

  function renderHandCards(s) {
    const cards = s.hand.map(p => {
      const used = s.usedThisBattle.includes(p.id);
      return `
        <div class="philosopher-card ${used ? 'disabled' : ''}" 
             data-philosopher-id="${p.id}" 
             style="border-color:${p.color}">
          <div class="card-emoji">${p.emoji}</div>
          <div class="card-name" style="color:${p.color}">${escHtml(p.name)}</div>
          <div class="card-attack">⚔ ${p.attack}</div>
        </div>
      `;
    }).join("");

    return `
      <div class="hand-area">
        <div class="hand-label">Escolha quem atacará:</div>
        <div class="hand-grid">${cards}</div>
      </div>
    `;
  }

  function renderQuiz(s) {
    const q = s.currentQuestion;
    const options = q.opts.map((opt, i) => {
      let cls = "quiz-option";
      if (s.answered) {
        cls += " answered";
        if (i === q.correct) cls += " correct";
        else if (i === s.selectedAnswer && i !== q.correct) cls += " wrong";
      }
      return `<button class="${cls}" data-answer="${i}">${escHtml(opt)}</button>`;
    }).join("");

    return `
      <div class="quiz-panel">
        <div class="quiz-question">${escHtml(q.q)}</div>
        <div class="quiz-options">${options}</div>
      </div>
    `;
  }

  function renderResult(s) {
    const p = s.selectedPhilosopher;
    return `
      <div class="result-panel">
        <div class="result-header">
          <span class="result-label" style="color:${s.wasCorrect ? 'var(--success)' : 'var(--danger)'}">
            ${s.wasCorrect ? '✓ Correto!' : '✗ Errou...'}
          </span>
          <span class="result-damage" style="color:${s.wasCorrect ? 'var(--success)' : 'var(--danger)'}">
            ⚔ ${s.damageDealt} dano
          </span>
        </div>
        <div class="result-tip">${escHtml(s.answerTip)}</div>
        <div class="philosopher-quote" style="border-left:4px solid ${p.color}">
          <div class="quote-name" style="color:${p.color}">${p.emoji} ${escHtml(p.name)}</div>
          <div class="quote-fragment">"${escHtml(p.fragment)}"</div>
          <div class="quote-explanation">${escHtml(p.explanation)}</div>
        </div>
        <button class="btn btn-primary btn-full" onclick="PhysisGame.continueAfterResult()">Continuar ▸</button>
      </div>
    `;
  }

  function bindBattleEvents(s) {
    // Cartas de filósofo
    document.querySelectorAll(".philosopher-card:not(.disabled)").forEach(card => {
      card.addEventListener("click", () => {
        const id = card.dataset.philosopherId;
        const philosopher = s.hand.find(p => p.id === id);
        if (philosopher) PhysisGame.selectPhilosopher(philosopher);
      });
    });

    // Opções de resposta
    if (!s.answered) {
      document.querySelectorAll(".quiz-option").forEach(btn => {
        btn.addEventListener("click", () => {
          PhysisGame.answerQuestion(parseInt(btn.dataset.answer));
        });
      });
    }
  }

  // ─── TELA FINAL (VITÓRIA / DERROTA) ─────────────────────────
  function renderEndScreen(s, isVictory) {
    const msgs = isVictory ? VICTORY_MESSAGES : DEFEAT_MESSAGES;
    const msg = msgs[Math.floor(Math.random() * msgs.length)];

    app.innerHTML = `
      <button class="theme-toggle" onclick="PhysisGame.toggleTheme()">${s.isDark ? "☀️" : "🌙"}</button>
      <div class="screen">
        <div class="game-icon">${isVictory ? '🏆' : '💀'}</div>
        <h2 style="color:${isVictory ? 'var(--accent)' : 'var(--danger)'};font-size:24px">
          ${isVictory ? 'Vitória!' : 'Derrota'}
        </h2>
        <p style="color:var(--text-secondary);font-size:14px;line-height:1.6;margin:16px 0;max-width:340px">
          ${escHtml(msg)}
        </p>
        <div class="result-box ${isVictory ? 'victory' : 'defeat'}">
          <div class="player-titles" style="font-size:16px;font-weight:700;margin-bottom:8px">${s.titles.join("") || ""}</div>
          <div class="final-score" style="color:${isVictory ? 'var(--accent)' : 'var(--danger)'}">${s.score}</div>
          <div class="final-accuracy">${s.totalCorrect}/${s.totalQuestions} respostas corretas</div>
        </div>
        <button class="btn btn-primary" onclick="PhysisGame.restart()" style="margin-bottom:10px">
          Voltar ao início
        </button>
        <button class="btn btn-secondary" onclick="PhysisGame.showRanking()">
          🏆 Ranking
        </button>
        <div class="footer">
          Concepção e design: <a href="https://marcosramon.net" target="_blank">Marcos Ramon</a>
        </div>
      </div>
    `;
  }

  // ─── TELA DE RANKING ────────────────────────────────────────
  function renderRankingScreen(s) {
    const scores = PhysisGame.getScores();
    let list = "";

    if (scores.length === 0) {
      list = '<p style="text-align:center;color:var(--text-muted);padding:40px 0">Nenhuma pontuação registrada ainda.</p>';
    } else {
      list = scores.slice(0, 10).map((sc, i) => {
        const medal = i === 0 ? "gold" : i === 1 ? "silver" : i === 2 ? "bronze" : "";
        return `
          <div class="ranking-item ${medal}">
            <span class="ranking-pos">${i + 1}º</span>
            <div class="ranking-info">
              <div class="ranking-name">${escHtml(sc.name)} ${sc.titles || ""}</div>
              <div class="ranking-detail">${sc.correct}/${sc.total} acertos</div>
            </div>
            <span class="ranking-score">${sc.score} pts</span>
          </div>
        `;
      }).join("");
    }

    app.innerHTML = `
      <button class="theme-toggle" onclick="PhysisGame.toggleTheme()">${s.isDark ? "☀️" : "🌙"}</button>
      <div class="screen" style="justify-content:flex-start;padding-top:40px">
        <h2 style="color:var(--accent);font-size:24px;margin-bottom:20px">🏆 Ranking</h2>
        <div class="ranking-list">${list}</div>
        <div style="height:20px"></div>
        <button class="btn btn-secondary" onclick="PhysisGame.restart()" style="max-width:200px">
          ← Voltar
        </button>
      </div>
    `;
  }

  // ─── MODAL ──────────────────────────────────────────────────
  function renderModal(modal) {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.innerHTML = `
      <div class="modal-box">
        <div class="modal-title">${escHtml(modal.title)}</div>
        <div class="modal-text">${escHtml(modal.text)}</div>
        <button class="btn btn-primary" style="max-width:200px;margin:0 auto" id="modalDismiss">OK</button>
      </div>
    `;
    // Remover modal anterior se existir
    document.querySelectorAll(".modal-overlay").forEach(el => el.remove());
    document.body.appendChild(overlay);
    document.getElementById("modalDismiss").addEventListener("click", () => {
      overlay.remove();
      PhysisGame.dismissModal();
    });
  }

  // ─── UTILITÁRIOS ────────────────────────────────────────────
  function renderHpBar(current, max, color) {
    const pct = Math.max(0, (current / max) * 100);
    return `
      <div class="hp-bar-container">
        <div class="hp-bar-fill" style="width:${pct}%;background:${color}"></div>
      </div>
      <div class="hp-label">${current}/${max} HP</div>
    `;
  }

  function getCurrentEnemyData(s) {
    const phaseEnemies = ENEMIES.filter(e => e.phase === s.phase);
    return phaseEnemies[s.enemyIndex] || phaseEnemies[0];
  }

  function escHtml(str) {
    if (!str) return "";
    return String(str).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
  }

  // ─── INICIALIZAR ────────────────────────────────────────────
  PhysisGame.init(render);
})();
