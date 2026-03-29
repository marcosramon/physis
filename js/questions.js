// ============================================================
// PHYSIS — BANCO DE QUESTÕES
// ============================================================
// Este arquivo contém todas as questões do jogo.
// Para adaptar o jogo ao seu conteúdo, edite este arquivo.
//
// ESTRUTURA DE CADA QUESTÃO:
// {
//   philosopherId: "id_do_filosofo",  → deve corresponder a um id em philosophers.js
//   q: "Texto da pergunta",
//   opts: ["Opção A", "Opção B", "Opção C", "Opção D"],
//   correct: 0,                       → índice da resposta correta (0 a 3)
//   tip: "Explicação exibida após responder"
// }
//
// DICAS PARA CRIAR BOAS QUESTÕES:
// - Varie a dificuldade (fácil, média, difícil)
// - Faça os distratores (respostas erradas) parecerem plausíveis
// - Use a "tip" para ensinar, não apenas corrigir
// - Tenha pelo menos 5 questões por filósofo para boa variedade
// ============================================================

const QUESTIONS = [

  // ======================== TALES DE MILETO ========================
  {
    philosopherId: "tales",
    q: "Qual elemento Tales considerava como princípio (arché) de todas as coisas?",
    opts: ["Fogo", "Terra", "Água", "Ar"],
    correct: 2,
    tip: "Para Tales, a água é o fundamento de tudo que existe — o primeiro princípio da filosofia ocidental."
  },
  {
    philosopherId: "tales",
    q: "Tales é considerado o primeiro filósofo porque:",
    opts: [
      "Escreveu o maior número de livros na Antiguidade",
      "Buscou explicações racionais para a natureza, sem recorrer aos mitos",
      "Foi o primeiro a negar os deuses, propondo teorias científicas",
      "Inventou a democracia ateniense, consolidando a filosofia como política"
    ],
    correct: 1,
    tip: "A novidade de Tales foi substituir narrativas míticas por explicações baseadas na observação racional."
  },
  {
    philosopherId: "tales",
    q: "Em qual cidade da Jônia nasceu Tales?",
    opts: ["Atenas", "Éfeso", "Mileto", "Esparta"],
    correct: 2,
    tip: "Mileto era um importante centro comercial e intelectual na costa da atual Turquia."
  },
  {
    philosopherId: "tales",
    q: "Segundo a tradição, Tales demonstrou utilidade prática da filosofia ao:",
    opts: [
      "Construir o Parthenon",
      "Prever uma boa colheita de azeitonas e lucrar com isso",
      "Vencer uma batalha usando estratégia lógica, argumentativa",
      "Criar a primeira escola pública de Atenas"
    ],
    correct: 1,
    tip: "Tales alugou prensas de azeitona antecipadamente e lucrou com a safra, provando que filósofos podem ser práticos."
  },
  {
    philosopherId: "tales",
    q: "A afirmação de Tales 'tudo está cheio de deuses' significa que:",
    opts: [
      "Ele era politeísta como todos os gregos",
      "Toda matéria possui uma força vital ou animação",
      "Os deuses do Olimpo controlam cada objeto que existe",
      "A religião é mais importante que a filosofia"
    ],
    correct: 1,
    tip: "Essa visão, chamada hilozoísmo, sugere que a matéria tem vida ou alma em si mesma."
  },

  // ======================== HERÁCLITO ========================
  {
    philosopherId: "heraclito",
    q: "Qual é o princípio fundamental (arché) para Heráclito?",
    opts: ["Água", "Ar", "Fogo", "Terra"],
    correct: 2,
    tip: "O fogo simboliza a transformação constante — tudo muda, nada permanece igual."
  },
  {
    philosopherId: "heraclito",
    q: "A famosa imagem do rio em Heráclito ilustra a ideia de que:",
    opts: [
      "A água é o princípio de tudo",
      "Devemos aprender a nadar para sobreviver",
      "Tudo está em constante fluxo e transformação",
      "Os rios são sagrados para os gregos, como deuses"
    ],
    correct: 2,
    tip: "Não se pode banhar-se duas vezes no mesmo rio — as águas e nós mesmos já mudamos."
  },
  {
    philosopherId: "heraclito",
    q: "O conceito de Lógos em Heráclito refere-se a:",
    opts: [
      "A palavra escrita dos poetas",
      "Uma lei racional que governa o cosmos",
      "O discurso político na ágora, a praça pública",
      "A linguagem secreta dos sacerdotes"
    ],
    correct: 1,
    tip: "O Lógos é a razão universal que ordena a realidade através da harmonia dos opostos."
  },
  {
    philosopherId: "heraclito",
    q: "Para Heráclito, os opostos (dia/noite, vida/morte) são:",
    opts: [
      "Forças que se destroem mutuamente",
      "Ilusões criadas pelos sentidos",
      "Complementares e interdependentes",
      "Prova da imperfeição do mundo"
    ],
    correct: 2,
    tip: "A harmonia nasce da tensão entre contrários — sem noite, não haveria conceito de dia."
  },
  {
    philosopherId: "heraclito",
    q: "Heráclito ficou conhecido como 'o Obscuro' porque:",
    opts: [
      "Vivia em cavernas escuras, isolado, como um eremita",
      "Escrevia de forma enigmática e com aforismos difíceis",
      "Era cego desde o nascimento, prevendo o futuro",
      "Usava tinta invisível em seus textos"
    ],
    correct: 1,
    tip: "Seu estilo deliberadamente enigmático exigia reflexão profunda do leitor."
  },

  // ======================== PITÁGORAS ========================
  {
    philosopherId: "pitagoras",
    q: "Qual é o princípio de tudo para Pitágoras?",
    opts: ["O fogo eterno", "Os números", "A água primordial", "O átomo indivisível"],
    correct: 1,
    tip: "Para Pitágoras, os números são a estrutura invisível de toda a realidade."
  },
  {
    philosopherId: "pitagoras",
    q: "A escola pitagórica também funcionava como:",
    opts: [
      "Um tribunal de justiça focado na lógica",
      "Uma comunidade com regras religiosas e filosóficas",
      "Um exército de mercenários que lutava pela Grécia",
      "Um centro de comércio marítimo"
    ],
    correct: 1,
    tip: "Os pitagóricos viviam em comunidade com regras de conduta, alimentação e silêncio."
  },
  {
    philosopherId: "pitagoras",
    q: "A relação entre música e matemática foi descoberta por Pitágoras ao observar:",
    opts: [
      "O canto dos pássaros, que ele via como representação da beleza natural",
      "As proporções entre os sons produzidos por martelos de pesos diferentes",
      "As ondas do mar na praia, com movimento constante",
      "O eco nas montanhas, com suas estruturas de sons"
    ],
    correct: 1,
    tip: "Pitágoras percebeu que intervalos musicais harmônicos correspondiam a razões numéricas simples."
  },
  {
    philosopherId: "pitagoras",
    q: "O conceito pitagórico de 'harmonia das esferas' propõe que:",
    opts: [
      "A Terra é plana e cercada por esferas de cristal, que se movem constantemente",
      "Os corpos celestes produzem sons ao se mover, formando uma música cósmica",
      "Os deuses vivem em esferas acima do céu",
      "A geometria só funciona com formas esféricas"
    ],
    correct: 1,
    tip: "Os pitagóricos acreditavam que os planetas, ao girar, produziam frequências proporcionais."
  },
  {
    philosopherId: "pitagoras",
    q: "Os pitagóricos acreditavam na metempsicose, que é:",
    opts: [
      "A transformação de metais em ouro",
      "A transmigração da alma entre diferentes corpos",
      "Uma doença mental causada por excesso de estudo",
      "O poder de levitar através da meditação"
    ],
    correct: 1,
    tip: "A alma, para os pitagóricos, era imortal e reencarnava em diferentes seres até se purificar."
  },

  // ======================== PARMÊNIDES ========================
  {
    philosopherId: "parmenides",
    q: "Qual é a tese central de Parmênides sobre a realidade?",
    opts: [
      "Tudo flui como um rio",
      "O Ser é, e o Não-Ser não é",
      "Tudo é feito de átomos e vazio",
      "O mundo é governado pelo acaso"
    ],
    correct: 1,
    tip: "Parmênides defende que a realidade é una, imóvel, eterna e imutável."
  },
  {
    philosopherId: "parmenides",
    q: "Para Parmênides, a mudança que percebemos no mundo é:",
    opts: [
      "A prova de que tudo é fogo",
      "O resultado da vontade dos deuses",
      "Uma ilusão dos sentidos",
      "Causada pelo movimento dos átomos"
    ],
    correct: 2,
    tip: "Os sentidos nos enganam — a razão revela que o Ser verdadeiro é imutável."
  },
  {
    philosopherId: "parmenides",
    q: "Parmênides apresentou sua filosofia na forma de:",
    opts: [
      "Cartas a outros filósofos, em que defendia suas teses",
      "Um poema épico chamado 'Sobre a Natureza'",
      "Anotações em tábuas de argila",
      "Discursos na ágora de Atenas"
    ],
    correct: 1,
    tip: "O poema descreve uma viagem mística até uma deusa que revela os caminhos da Verdade e da Opinião."
  },
  {
    philosopherId: "parmenides",
    q: "Parmênides fundou qual escola filosófica?",
    opts: ["Escola Jônica", "Escola Atomista", "Escola Eleática", "Escola Cínica"],
    correct: 2,
    tip: "A Escola Eleática, na Magna Grécia, teve como membros Zenão e Melisso."
  },
  {
    philosopherId: "parmenides",
    q: "A distinção entre 'via da verdade' e 'via da opinião' em Parmênides separa:",
    opts: [
      "Conhecimento racional e percepção sensível",
      "Filosofia grega e filosofia oriental",
      "Ciência e religião",
      "Democracia e tirania"
    ],
    correct: 0,
    tip: "A via da verdade revela o Ser pela razão; a via da opinião mostra o mundo enganoso dos sentidos."
  },

  // ======================== DEMÓCRITO ========================
  {
    philosopherId: "democrito",
    q: "Demócrito propôs que toda a realidade é composta de:",
    opts: [
      "Fogo e água",
      "Quatro elementos e dois princípios",
      "Átomos e vazio",
      "Números e formas geométricas"
    ],
    correct: 2,
    tip: "Os átomos são partículas indivisíveis que se combinam de diferentes formas no vazio."
  },
  {
    philosopherId: "democrito",
    q: "A palavra 'átomo' em grego significa:",
    opts: [
      "Muito pequeno",
      "Indivisível",
      "Invisível",
      "Eterno"
    ],
    correct: 1,
    tip: "Á-tomo = 'não-cortável'. Para Demócrito, existe um limite mínimo de divisão da matéria."
  },
  {
    philosopherId: "democrito",
    q: "Para Demócrito, as diferenças entre os objetos se devem a:",
    opts: [
      "A vontade dos deuses",
      "A proporção dos quatro elementos",
      "A forma, ordem e posição dos átomos",
      "O equilíbrio entre Amor e Discórdia"
    ],
    correct: 2,
    tip: "Átomos idênticos em diferentes arranjos criam substâncias completamente diferentes."
  },
  {
    philosopherId: "democrito",
    q: "Demócrito ficou conhecido como 'o filósofo que ri' porque:",
    opts: [
      "Era palhaço antes de ser filósofo",
      "Ria das preocupações humanas, valorizando a serenidade do espírito",
      "Descobriu que rir aumenta a imunidade, sendo considerado também médico",
      "Contava piadas nos seus livros filosóficos"
    ],
    correct: 1,
    tip: "Demócrito valorizava a euthymía (boa disposição do ânimo) como ideal de vida."
  },
  {
    philosopherId: "democrito",
    q: "A filosofia de Demócrito é considerada materialista porque:",
    opts: [
      "Ele era rico e ganancioso",
      "Reduz toda realidade a elementos materiais (átomos e vazio)",
      "Acreditava que dinheiro traz felicidade",
      "Rejeitava qualquer forma de espiritualidade ou crendice"
    ],
    correct: 1,
    tip: "Até a alma, para Demócrito, era feita de átomos especiais — esféricos e muito móveis."
  },

  // ======================== ANAXIMANDRO ========================
  {
    philosopherId: "anaximandro",
    q: "Qual princípio Anaximandro propôs como origem de todas as coisas?",
    opts: [
      "A água",
      "O fogo, elemento do movimento",
      "O ápeiron (o ilimitado)",
      "O ar"
    ],
    correct: 2,
    tip: "O ápeiron é infinito, indeterminado e eterno — dele surgem e a ele retornam todas as coisas."
  },
  {
    philosopherId: "anaximandro",
    q: "Por que Anaximandro rejeitou a água como princípio, divergindo de Tales?",
    opts: [
      "Porque a água é rara na Grécia",
      "Porque um elemento determinado não pode gerar seus opostos",
      "Porque Tales era seu inimigo pessoal",
      "Porque a água não tem forma definida, sendo encontrada em três estados"
    ],
    correct: 1,
    tip: "Se a água fosse o princípio, como explicar o fogo? O ápeiron resolve isso por ser indeterminado."
  },
  {
    philosopherId: "anaximandro",
    q: "Anaximandro foi pioneiro ao criar:",
    opts: [
      "A primeira receita de vinho grego",
      "Um dos primeiros mapas do mundo conhecido",
      "O primeiro sistema de irrigação",
      "A primeira moeda grega"
    ],
    correct: 1,
    tip: "Seu mapa representava as terras conhecidas cercadas pelo oceano — um feito cartográfico."
  },
  {
    philosopherId: "anaximandro",
    q: "Para Anaximandro, os seres surgem e perecem segundo:",
    opts: [
      "O capricho dos deuses olímpicos",
      "Uma necessidade e justiça cósmica",
      "A vontade dos mais fortes",
      "Ciclos de 1000 anos"
    ],
    correct: 1,
    tip: "As coisas 'pagam umas às outras reparação pela injustiça, conforme a ordem do tempo.'"
  },
  {
    philosopherId: "anaximandro",
    q: "Anaximandro tinha uma ideia surpreendentemente moderna sobre a origem dos seres humanos. Ele sugeriu que:",
    opts: [
      "Humanos foram criados pelos deuses a partir de barro",
      "Os primeiros humanos se desenvolveram a partir de criaturas marinhas",
      "Os humanos sempre existiram, desde a eternidade",
      "Humanos surgiram de sementes plantadas pelos titãs"
    ],
    correct: 1,
    tip: "Ele argumentou que humanos nasceram de peixes ou criaturas semelhantes — uma proto-teoria evolutiva!"
  },

  // ======================== ANAXÍMENES ========================
  {
    philosopherId: "anaximenes",
    q: "Qual é o princípio (arché) para Anaxímenes?",
    opts: ["Água", "Fogo", "Ar", "Terra"],
    correct: 2,
    tip: "O ar infinito, ao se condensar e rarefazer, origina todas as coisas."
  },
  {
    philosopherId: "anaximenes",
    q: "O processo pelo qual o ar se transforma em outras substâncias é:",
    opts: [
      "Evaporação e precipitação",
      "Condensação e rarefação",
      "Fusão e fissão",
      "Criação e destruição"
    ],
    correct: 1,
    tip: "Ar rarefeito → fogo. Ar condensado → vento → nuvem → água → terra → pedra."
  },
  {
    philosopherId: "anaximenes",
    q: "Anaxímenes associava o ar à vida porque:",
    opts: [
      "Os deuses viviam no ar",
      "O sopro (pneuma) é o que nos mantém vivos",
      "Sem ar não há fogo",
      "O ar é invisível como a alma"
    ],
    correct: 1,
    tip: "Assim como a alma-ar nos mantém vivos, o ar cósmico sustenta o universo inteiro."
  },
  {
    philosopherId: "anaximenes",
    q: "Em relação a Tales e Anaximandro, Anaxímenes representa:",
    opts: [
      "Uma ruptura total com a tradição jônica",
      "Uma síntese: princípio determinado (como Tales) mas com mecanismo de transformação",
      "Um retorno à explicação mitológica",
      "O abandono completo da ideia de arché"
    ],
    correct: 1,
    tip: "Anaxímenes mantém um elemento específico (ar) mas explica como ele se transforma em tudo."
  },
  {
    philosopherId: "anaximenes",
    q: "Anaxímenes pertence a qual grupo de filósofos?",
    opts: [
      "Os sofistas de Atenas",
      "Os filósofos de Mileto (jônicos)",
      "Os eleatas",
      "Os atomistas"
    ],
    correct: 1,
    tip: "Com Tales e Anaximandro, forma a tríade dos pensadores de Mileto."
  },

  // ======================== EMPÉDOCLES ========================
  {
    philosopherId: "empedocles",
    q: "Empédocles propôs que a realidade é formada por quantos elementos?",
    opts: ["Um único", "Dois", "Quatro", "Infinitos"],
    correct: 2,
    tip: "Terra, água, ar e fogo — as quatro 'raízes' (rhizomata) eternas."
  },
  {
    philosopherId: "empedocles",
    q: "As duas forças cósmicas que movem os elementos em Empédocles são:",
    opts: [
      "Bem e Mal",
      "Amor (Philía) e Discórdia (Neîkos)",
      "Razão e Emoção",
      "Criação e Destruição"
    ],
    correct: 1,
    tip: "O Amor une os elementos; a Discórdia os separa. O cosmos oscila entre esses polos."
  },
  {
    philosopherId: "empedocles",
    q: "A teoria dos quatro elementos de Empédocles influenciou diretamente:",
    opts: [
      "A física nuclear moderna",
      "A medicina hipocrática e a teoria dos humores",
      "A matemática de Euclides",
      "A astronomia de Copérnico"
    ],
    correct: 1,
    tip: "Os quatro humores corporais (sangue, fleuma, bile amarela e bile negra) derivam dos quatro elementos."
  },
  {
    philosopherId: "empedocles",
    q: "Empédocles explicava a percepção sensorial pela teoria de:",
    opts: [
      "Reflexos condicionados",
      "Eflúvios — emanações que saem dos objetos e entram nos poros dos sentidos",
      "Ondas sonoras e luminosas",
      "Conexão direta entre alma e objeto"
    ],
    correct: 1,
    tip: "Os objetos emitem partículas que encaixam nos poros dos nossos órgãos sensoriais."
  },
  {
    philosopherId: "empedocles",
    q: "A lenda sobre a morte de Empédocles diz que ele:",
    opts: [
      "Morreu pacificamente de velhice",
      "Foi assassinado por rivais políticos",
      "Saltou no vulcão Etna para provar sua divindade",
      "Desapareceu no mar durante uma tempestade"
    ],
    correct: 2,
    tip: "Segundo a lenda, apenas sua sandália de bronze foi devolvida pelo vulcão."
  },

  // ======================== ANAXÁGORAS ========================
  {
    philosopherId: "anaxagoras",
    q: "O princípio organizador do cosmos em Anaxágoras é chamado de:",
    opts: ["Lógos", "Ápeiron", "Noûs (Mente/Intelecto)", "Arché"],
    correct: 2,
    tip: "O Noûs é uma inteligência pura que inicia e ordena o movimento cósmico."
  },
  {
    philosopherId: "anaxagoras",
    q: "Para Anaxágoras, 'em tudo há parte de tudo' significa que:",
    opts: [
      "Todas as culturas são iguais",
      "Cada porção de matéria contém sementes de todas as substâncias",
      "Todos os filósofos concordam entre si",
      "A Terra contém todos os minerais possíveis"
    ],
    correct: 1,
    tip: "As homeomerias (sementes) de todas as coisas estão misturadas em tudo — o Noûs as organiza."
  },
  {
    philosopherId: "anaxagoras",
    q: "Anaxágoras foi processado em Atenas por afirmar que:",
    opts: [
      "Os deuses não existem",
      "A democracia é injusta",
      "O Sol é uma massa de rocha incandescente",
      "A Terra é plana"
    ],
    correct: 2,
    tip: "Afirmar que o Sol era uma pedra em brasa, e não o deus Hélios, era impiedade para os atenienses."
  },
  {
    philosopherId: "anaxagoras",
    q: "Anaxágoras era amigo e protegido de qual líder ateniense?",
    opts: ["Sócrates", "Alexandre", "Péricles", "Sólon"],
    correct: 2,
    tip: "A amizade com Péricles lhe trouxe proteção, mas também inimigos políticos."
  },
  {
    philosopherId: "anaxagoras",
    q: "O Noûs de Anaxágoras se diferencia da matéria porque é:",
    opts: [
      "Feito de átomos especiais",
      "Totalmente puro e sem mistura com outras substâncias",
      "Uma divindade do Olimpo",
      "Criado pelo fogo primordial"
    ],
    correct: 1,
    tip: "O Noûs é a única coisa que não se mistura — por isso pode conhecer e organizar tudo."
  },

  // ======================== ZENÃO DE ELEIA ========================
  {
    philosopherId: "zenao",
    q: "Os paradoxos de Zenão foram criados para defender as ideias de:",
    opts: ["Heráclito", "Tales", "Parmênides", "Pitágoras"],
    correct: 2,
    tip: "Zenão usou a lógica para mostrar que o movimento e a pluralidade são ilusórios, apoiando Parmênides."
  },
  {
    philosopherId: "zenao",
    q: "No paradoxo de Aquiles e a Tartaruga, Zenão argumenta que:",
    opts: [
      "Tartarugas são mais rápidas do que parecem",
      "Aquiles nunca alcançaria a tartaruga porque sempre haveria uma distância restante",
      "A velocidade depende do tamanho do animal",
      "Somente os deuses podem correr infinitamente"
    ],
    correct: 1,
    tip: "Se a tartaruga sai na frente, quando Aquiles chega onde ela estava, ela já avançou — ao infinito."
  },
  {
    philosopherId: "zenao",
    q: "O paradoxo da Flecha argumenta que uma flecha em voo:",
    opts: [
      "Nunca atinge o alvo porque muda de direção",
      "Está, na verdade, parada em cada instante do tempo",
      "Viaja mais rápido que a luz",
      "É guiada pelos deuses"
    ],
    correct: 1,
    tip: "Em cada instante, a flecha ocupa um espaço igual ao seu tamanho — logo, está imóvel naquele instante."
  },
  {
    philosopherId: "zenao",
    q: "O método argumentativo de Zenão é chamado de:",
    opts: [
      "Maiêutica",
      "Silogismo",
      "Redução ao absurdo (reductio ad absurdum)",
      "Método experimental"
    ],
    correct: 2,
    tip: "Zenão assume a posição do adversário e mostra que ela leva a contradições — logo, é falsa."
  },
  {
    philosopherId: "zenao",
    q: "Aristóteles considerou Zenão o inventor de qual disciplina?",
    opts: [
      "A metafísica",
      "A retórica",
      "A dialética",
      "A ética"
    ],
    correct: 2,
    tip: "A dialética como arte da argumentação por contradições tem em Zenão seu precursor."
  }
];
