# 🏛️ PHYSIS — Quiz-Battle dos Pré-Socráticos

**Jogo educativo de batalha por turnos** para uso em sala de aula. Os estudantes enfrentam inimigos respondendo questões sobre os filósofos pré-socráticos, utilizando cartas de filósofos com poderes e ataques únicos.

🎮 **[Jogar a versão demo](https://marcosramon.github.io/physis)** *(ou abra `index.html` localmente)*

---

## Sobre o jogo

PHYSIS é um jogo de quiz em formato de RPG por turnos, projetado para tornar o estudo de filosofia mais engajante. O jogador:

1. Recebe **5 cartas** de filósofos aleatórios
2. Escolhe um filósofo para **atacar** o inimigo
3. Responde uma **questão** sobre os pré-socráticos
4. Se acertar, causa **dano** ao inimigo; se errar, o dano é zero
5. O inimigo **sempre contra-ataca** — mas o dano é menor se o jogador acertou
6. Atravessa **3 fases** com inimigos cada vez mais fortes até enfrentar o **chefão final**

O jogo inclui **easter eggs** escondidos que recompensam (ou punem!) comportamentos específicos, como sequências de acertos, respostas rápidas demais, ou trocar de aba durante o jogo.

---

## Estrutura do projeto

```
physis/
├── index.html              ← Página principal (ponto de entrada)
├── css/
│   └── style.css           ← Estilos e temas (dark/light)
├── js/
│   ├── philosophers.js     ← Filósofos, inimigos, fases e mensagens
│   ├── questions.js        ← Banco de questões
│   ├── easter-eggs.js      ← Easter eggs e eventos surpresa
│   ├── sfx.js              ← Efeitos sonoros (Web Audio API)
│   ├── game.js             ← Motor do jogo (lógica e estado)
│   └── ui.js               ← Interface (renderização no DOM)
├── README.md               ← Este arquivo
└── LICENSE                 ← Licença MIT
```

### Descrição de cada arquivo

| Arquivo | Função | Editar para... |
|---------|--------|----------------|
| `philosophers.js` | Define as cartas dos filósofos, os inimigos e as fases | Trocar personagens, ajustar atributos |
| `questions.js` | Banco de perguntas e respostas | **Trocar o conteúdo das questões** |
| `easter-eggs.js` | Eventos surpresa durante o jogo | Criar novos easter eggs |
| `sfx.js` | Sons procedurais via Web Audio API | Ajustar sons ou silenciar |
| `game.js` | Toda a lógica: HP, dano, fases, ranking | Mudar regras do jogo |
| `ui.js` | Renderização da interface | Alterar layout e textos |
| `style.css` | Visual e temas (dark/light) | Mudar cores, fontes, animações |

---

## Como usar

### Opção 1: Abrir localmente

1. Baixe ou clone o repositório
2. Abra `index.html` no navegador
3. Pronto! O jogo funciona 100% offline, sem servidor

```bash
git clone https://github.com/marcosramon/physis.git
cd physis
# Abra index.html no navegador
```

### Opção 2: Publicar no GitHub Pages (gratuito)

1. Faça fork deste repositório
2. Vá em **Settings → Pages**
3. Em **Source**, selecione a branch `main` e clique em **Save**
4. Em alguns minutos, seu jogo estará disponível em `https://SEU_USUARIO.github.io/physis`

### Opção 3: Qualquer hospedagem estática

O jogo é composto apenas de HTML, CSS e JS — funciona em qualquer servidor web (Netlify, Vercel, etc.) sem necessidade de backend.

---

## Como adaptar para seu conteúdo

O principal ponto de adaptação são as **questões** e os **personagens**. Veja como:

### Trocar as questões

Edite o arquivo `js/questions.js`. Cada questão segue este formato:

```javascript
{
  philosopherId: "tales",     // ID que liga a questão ao filósofo
  q: "Texto da pergunta?",
  opts: ["Opção A", "Opção B", "Opção C", "Opção D"],
  correct: 2,                 // Índice da resposta certa (0 a 3)
  tip: "Explicação exibida após a resposta"
}
```

**Dicas para boas questões:**
- Tenha pelo menos **5 questões por personagem** para boa variedade
- Varie a dificuldade (fácil, média, difícil)
- Faça os **distratores** (respostas erradas) parecerem plausíveis
- Use a **tip** para ensinar, não apenas corrigir

### Trocar os personagens

Edite `js/philosophers.js`. Cada filósofo/carta:

```javascript
{
  id: "tales",                  // ID único (usado nas questões)
  name: "Tales",                // Nome exibido
  emoji: "💧",                  // Emoji da carta
  color: "#4fc3f7",             // Cor temática
  attack: 18,                   // Dano base ao acertar
  power: "Dilúvio Primordial",  // Nome do ataque
  fragment: "Tudo é água.",     // Citação do filósofo
  explanation: "Fundador da filosofia..." // Explicação curta
}
```

### Trocar os inimigos

No mesmo arquivo, edite o array `ENEMIES`:

```javascript
{
  phase: 0,                    // Fase (0, 1 ou 2)
  name: "Ignorância Mítica",   // Nome do inimigo
  emoji: "👁️",                 // Emoji
  hp: 80,                      // Pontos de vida
  attack: 8,                   // Dano por contra-ataque
  isBoss: false                // true = chefão imbatível
}
```

### Exemplos de adaptação

O jogo pode ser adaptado para **qualquer conteúdo**:

- **História:** Personagens históricos vs. eventos
- **Biologia:** Cientistas vs. conceitos errados
- **Literatura:** Autores vs. vilões literários
- **Matemática:** Matemáticos vs. problemas
- **Química:** Elementos da tabela periódica como cartas

---

## Easter eggs

O jogo tem um sistema de easter eggs que torna a experiência mais rica. Eles estão em `js/easter-eggs.js` e são de 5 tipos:

| Tipo | Quando dispara | Exemplo |
|------|---------------|---------|
| `streak` | Acertos ou erros consecutivos | 8 acertos seguidos = bônus de HP |
| `speed` | Resposta muito rápida | Responder em <2.5s e errar = dano extra |
| `devotion` | Usar muito o mesmo filósofo | 8 acertos com o mesmo = recompensa |
| `idle` | Ficar sem responder | 30s parado = alerta |
| `tabswitch` | Trocar de aba | Sair do jogo = perda de HP |

Para criar novos easter eggs, adicione objetos ao tipo correspondente em `easter-eggs.js`.

---

## Ranking

O ranking é salvo no **localStorage** do navegador. Isso significa:
- Cada dispositivo tem seu próprio ranking
- Os dados persistem entre sessões
- Não há servidor ou banco de dados necessário
- O ranking armazena os top 50 melhores scores

Para uma versão com ranking compartilhado (múltiplos jogadores vendo o mesmo placar), é necessário adicionar um backend (Firebase, Supabase etc.).

---

## Mecânicas de jogo

### Sistema de dano

- **Acerto:** dano = ataque do filósofo + valor aleatório (0-5)
- **Erro:** dano = 0
- **Contra-ataque (acerto):** dano do inimigo × 0.5
- **Contra-ataque (erro):** dano do inimigo × 1.0
- O inimigo **sempre** contra-ataca

### Fases

1. **Jônia** (2 inimigos) — HP e ataques baixos
2. **Magna Grécia** (2 inimigos) — HP e ataques médios
3. **Atenas** (1 inimigo + 1 chefão) — o chefão tem 9999 HP (imbatível)

O chefão final dá **5x mais pontos** por acerto, incentivando o jogador a sobreviver o máximo possível.

### Mão de filósofos

- O jogador recebe **5 cartas** aleatórias
- Cada filósofo só pode ser usado **uma vez** por batalha (contra cada inimigo)
- Quando todos são usados, uma **nova mão** é sorteada
- As questões não se repetem até que todas sejam usadas

---

## Tecnologias

- **HTML5 + CSS3 + JavaScript vanilla** — sem frameworks ou dependências
- **Web Audio API** — sons procedurais gerados no navegador
- **localStorage** — ranking local sem backend
- **Responsivo** — funciona em celular, tablet e desktop
- **Temas** — dark mode e light mode

---

## Licença

Este projeto está sob a licença MIT. Você pode usar, modificar e distribuir livremente.

---

## Créditos

- **Concepção e design:** [Marcos Ramon](https://marcosramon.net)
- **Conteúdo:** Questões sobre filosofia pré-socrática

Se você usar este projeto em sala de aula, me conte! <a href="mailto:marcosramon@gmail.com">Entre em contato</a> ou abra uma issue. 🏛️
