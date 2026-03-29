// ============================================================
// PHYSIS — EASTER EGGS
// ============================================================
// Easter eggs são eventos surpresa que ocorrem durante o jogo.
// Eles podem dar bônus de HP, causar dano extra, ou apenas
// exibir uma mensagem divertida e educativa.
//
// TIPOS:
// - "streak":     dispara ao atingir X acertos ou erros seguidos
// - "speed":      dispara baseado no tempo de resposta
// - "devotion":   dispara ao usar muito o mesmo filósofo
// - "idle":       dispara se o jogador ficar ocioso
// - "tabswitch":  dispara se trocar de aba (colar?)
//
// PARA ADAPTAR:
// - Mude textos e condições conforme seu conteúdo
// - Adicione novos tipos criando handlers em game.js
// ============================================================

const EASTER_EGGS = {

  // ─── Baseados em sequência (streak) ───────────────────────
  streak: [
    {
      id: "socrates",
      condition: { type: "errors", count: 3 },
      title: "🤷 Só sei que nada sei",
      text: "Você errou 3 vezes seguidas. Sócrates reconheceu sua ignorância — e isso lhe rendeu sabedoria. HP restaurado!",
      hpBonus: 15
    },
    {
      id: "hacker",
      condition: { type: "correct", count: 8 },
      title: "💾 Mestre do algoritmo",
      text: "8 acertos seguidos! Você uniu o rigor filosófico com precisão computacional. Título conquistado e HP restaurado!",
      hpBonus: 25,
      titleEmoji: "💾"
    },
    {
      id: "hermes",
      condition: { type: "correct", count: 5 },
      title: "🏅 Velocidade de Hermes",
      text: "5 acertos seguidos! Hermes, mensageiro dos deuses, aprova sua agilidade mental!",
      hpBonus: 10,
      titleEmoji: "🏅"
    }
  ],

  // ─── Baseados em velocidade ───────────────────────────────
  speed: [
    {
      id: "rushed",
      condition: { maxTime: 2500 }, // milissegundos
      onlyOnError: true,
      title: "🏃 A pressa sofista",
      text: "Respondeu em menos de 2.5 segundos e errou? Os sofistas também priorizavam velocidade sobre verdade. Dano extra!",
      hpPenalty: 10
    }
  ],

  // ─── Baseados em devoção a um filósofo ────────────────────
  devotion: [
    {
      id: "eleusis",
      condition: { count: 8 }, // acertos com o mesmo filósofo
      title: "🏺 Mistérios de Elêusis",
      text: "Você demonstrou devoção absoluta a um filósofo! Tales disse que 'tudo está cheio de deuses', e os deuses sorriram para você.",
      hpBonus: 20,
      titleEmoji: "🏺"
    }
  ],

  // ─── Baseados em inatividade ──────────────────────────────
  idle: [
    {
      id: "bathroom",
      condition: { idleSeconds: 30 },
      title: "🚽 Síndrome da bexiga solta",
      text: "Heráclito avisa: o rio flui e o tempo da aula também! Você demorou mais de 30 segundos. Foco na physis!"
    }
  ],

  // ─── Baseados em troca de aba ─────────────────────────────
  tabswitch: [
    {
      id: "parmenides_tab",
      title: "🚪 O Ser é, o Não-Ser não é",
      text: "O Ser é, o Não-Ser não é, e a porta da sala fechou. Parmênides não aprova trocar de aba durante o jogo!",
      hpPenalty: 5
    }
  ]
};
