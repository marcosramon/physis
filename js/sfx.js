// ============================================================
// PHYSIS — EFEITOS SONOROS (Web Audio API)
// ============================================================
// Sons procedurais gerados no navegador — sem arquivos externos.
// Cada função cria um som curto usando osciladores.
//
// PARA ADAPTAR:
// - Ajuste frequências e durações para mudar os sons
// - Adicione novos sons seguindo o padrão existente
// ============================================================

const SFX = (() => {
  let audioCtx = null;

  function getCtx() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    return audioCtx;
  }

  function playSound(type, freq, duration, volume = 0.15) {
    try {
      const ctx = getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) { /* silently fail if audio not supported */ }
  }

  return {
    correct: () => {
      playSound('sine', 523.25, 0.15, 0.12);
      setTimeout(() => playSound('sine', 659.25, 0.2, 0.12), 100);
    },

    wrong: () => {
      playSound('sawtooth', 200, 0.3, 0.1);
      setTimeout(() => playSound('sawtooth', 150, 0.4, 0.1), 150);
    },

    attack: () => {
      playSound('square', 220, 0.08, 0.1);
      setTimeout(() => playSound('square', 440, 0.12, 0.1), 60);
    },

    enemyAttack: () => {
      playSound('sawtooth', 120, 0.2, 0.12);
      setTimeout(() => playSound('sawtooth', 80, 0.3, 0.12), 100);
    },

    victory: () => {
      const notes = [523.25, 587.33, 659.25, 783.99, 1046.50];
      notes.forEach((freq, i) => setTimeout(() => playSound('sine', freq, i === 4 ? 0.6 : 0.15, 0.1), i * 150));
    },

    epicVictory: () => {
      const notes = [440, 554.37, 659.25, 880, 1108.73, 1318.51];
      notes.forEach((freq, i) => setTimeout(() => playSound('square', freq, i === 5 ? 0.8 : 0.12, 0.12), i * 120));
    },

    defeat: () => {
      const notes = [311.13, 293.66, 277.18, 261.63];
      notes.forEach((freq, i) => setTimeout(() => playSound('sawtooth', freq, i === 3 ? 0.8 : 0.2, 0.15), i * 250));
    },

    easterEgg: () => {
      playSound('sine', 880, 0.1, 0.1);
      setTimeout(() => playSound('sine', 1760, 0.2, 0.1), 100);
    },

    phaseTransition: () => {
      const notes = [261.63, 329.63, 392.00, 523.25];
      notes.forEach((freq, i) => setTimeout(() => playSound('triangle', freq, 0.3, 0.1), i * 200));
    },

    select: () => {
      playSound('sine', 660, 0.08, 0.08);
    }
  };
})();
