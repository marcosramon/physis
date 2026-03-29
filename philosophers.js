// ============================================================
// PHYSIS — FILÓSOFOS, INIMIGOS E FASES
// ============================================================
// Este arquivo define os personagens jogáveis (filósofos),
// os inimigos de cada fase e a estrutura das fases do jogo.
//
// PARA ADAPTAR:
// - Mude os filósofos para personagens do seu conteúdo
// - Ajuste os inimigos e suas stats (HP, ataque)
// - Modifique as fases e seus textos de lore
// ============================================================

// ─── FILÓSOFOS (cartas do jogador) ──────────────────────────
// O jogador recebe 5 cartas aleatórias como "mão" de batalha.
// Cada filósofo tem questões associadas pelo philosopherId.

const PHILOSOPHERS = [
  { id: "tales",       name: "Tales",       emoji: "💧", color: "#4fc3f7", attack: 18, power: "Dilúvio Primordial",     fragment: "Tudo é água.",                               explanation: "Fundador da filosofia, buscou a arché na água." },
  { id: "heraclito",   name: "Heráclito",   emoji: "🔥", color: "#ff7043", attack: 22, power: "Fluxo Eterno",           fragment: "Tudo flui, nada permanece.",                  explanation: "O fogo e a mudança constante governam a realidade." },
  { id: "pitagoras",   name: "Pitágoras",   emoji: "🔢", color: "#ab47bc", attack: 20, power: "Harmonia Numérica",      fragment: "Tudo é número.",                              explanation: "Os números são a estrutura invisível do cosmos." },
  { id: "parmenides",  name: "Parmênides",  emoji: "🗿", color: "#78909c", attack: 24, power: "Imobilidade do Ser",     fragment: "O Ser é, o Não-Ser não é.",                   explanation: "A realidade é una, eterna e imutável." },
  { id: "democrito",   name: "Demócrito",   emoji: "⚛️", color: "#66bb6a", attack: 21, power: "Chuva Atômica",          fragment: "Nada existe exceto átomos e vazio.",           explanation: "Tudo se explica por átomos indivisíveis no vazio." },
  { id: "anaximandro", name: "Anaximandro", emoji: "♾️", color: "#7e57c2", attack: 19, power: "Vórtice do Ápeiron",     fragment: "O ilimitado é o princípio de tudo.",           explanation: "O ápeiron — infinito e indeterminado — origina todas as coisas." },
  { id: "anaximenes",  name: "Anaxímenes",  emoji: "💨", color: "#4dd0e1", attack: 17, power: "Sopro Vital",            fragment: "O ar é a arché de tudo.",                     explanation: "O ar, ao condensar e rarefazer, gera toda a matéria." },
  { id: "empedocles",  name: "Empédocles",  emoji: "🌋", color: "#ef5350", attack: 23, power: "Quatro Raízes",          fragment: "Amor une, Discórdia separa.",                 explanation: "Quatro elementos movidos por Amor e Discórdia." },
  { id: "anaxagoras",  name: "Anaxágoras",  emoji: "🧠", color: "#ffa726", attack: 20, power: "Nous Cósmico",           fragment: "Em tudo há parte de tudo.",                   explanation: "O Noûs (Mente) ordena a mistura infinita de sementes." },
  { id: "zenao",       name: "Zenão",       emoji: "🐢", color: "#8d6e63", attack: 16, power: "Paradoxo Paralisante",   fragment: "O movimento é impossível.",                   explanation: "Usou paradoxos para defender a imobilidade do Ser." }
];

// ─── FASES DO JOGO ──────────────────────────────────────────
// O jogo tem 3 fases + 1 chefão final.
// Cada fase tem inimigos com HP e ataque crescentes.

const PHASES = [
  {
    name: "Jônia",
    emoji: "⛵",
    lore: "Nas costas da Jônia, os primeiros pensadores ousaram questionar os mitos. Aqui começa a jornada pela physis!"
  },
  {
    name: "Magna Grécia",
    emoji: "🏛️",
    lore: "No sul da Itália, as escolas eleática e pitagórica florescem. A batalha entre Ser e devir se intensifica!"
  },
  {
    name: "Atenas",
    emoji: "⚔️",
    lore: "No coração da Grécia, as ideias convergem. Apenas os mais sábios sobreviverão ao desafio final!"
  }
];

// ─── INIMIGOS ───────────────────────────────────────────────
// Cada fase tem 2 inimigos regulares.
// A fase 3 tem um chefão final que é imbatível (o jogador apenas sobrevive).

const ENEMIES = [
  // Fase 1
  { phase: 0, name: "Ignorância Mítica",  emoji: "👁️",  hp: 80,  attack: 8,  isBoss: false },
  { phase: 0, name: "Dogma Homérico",     emoji: "📜",  hp: 100, attack: 10, isBoss: false },
  // Fase 2
  { phase: 1, name: "Sofisma Enganador",  emoji: "🎭",  hp: 120, attack: 12, isBoss: false },
  { phase: 1, name: "Ceticismo Radical",   emoji: "🌀",  hp: 140, attack: 14, isBoss: false },
  // Fase 3 — chefão
  { phase: 2, name: "Aporia Absoluta",     emoji: "🕳️",  hp: 300, attack: 18, isBoss: false },
  { phase: 2, name: "Caos Primordial",     emoji: "💀",  hp: 9999, attack: 20, isBoss: true }
];

// ─── MENSAGENS DE DERROTA ───────────────────────────────────
const DEFEAT_MESSAGES = [
  "Tales de Mileto, enquanto olhava para as estrelas, caiu num poço e virou motivo de riso. O fracasso faz parte da jornada filosófica!",
  "Anaxágoras foi exilado de Atenas por afirmar que o Sol era uma pedra incandescente. A verdade nem sempre vence na primeira tentativa.",
  "Empédocles saltou no Etna para provar que era um deus — só a sandália voltou. Repense a estratégia!",
  "Zenão criou paradoxos geniais, mas foi torturado por um tirano. A vida real cobra seu preço.",
  "Sócrates bebeu cicuta, Platão foi vendido como escravo, Aristóteles fugiu para não morrer. A filosofia é para os fortes!"
];

// ─── MENSAGENS DE VITÓRIA ───────────────────────────────────
const VICTORY_MESSAGES = [
  "Aristóteles diria que você alcançou a eudaimonia — a plenitude da excelência humana!",
  "Como Prometeu, você trouxe a luz do conhecimento para a humanidade!",
  "Pitágoras enxergaria harmonia perfeita na sua jornada!",
  "Você percorreu o caminho da Verdade de Parmênides sem se desviar pela Opinião!"
];
