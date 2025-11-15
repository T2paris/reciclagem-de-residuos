function drawBins() {
  bins.forEach(b => {
    ctx.drawImage(binImgs[b.type], b.x, H - BIN_H - 20, BIN_W, BIN_H);
  });
}

// ======================================
// PASSAR DE NÍVEL
// ======================================
function nextLevel() {
  popup.style.display = "none";
  gameOver = false;

  level++;
  levelBox.textContent = "Nível: " + level;

  // Reset do score e do timer
  score = 0;
  updateScore();
  lastDrop = 0;

  // Aumenta dificuldade — lixos caem 2x mais rápido
  dropInterval = dropInterval / 2;

  // Limpa lixos da tela
  trashList = [];
  groundTrash = [];

  start(); // reinicia timer e loop
}


// ======================================
// RECOMEÇAR O JOGO
// ======================================
function restartGame() {
  popup.style.display = "none";
  gameOver = false;

  // Reset do score, nível e velocidade
  score = 0;
  level = 1;
  levelBox.textContent = "Nível: " + level;
  updateScore();

  // Reset do drop
  dropInterval = 4000; // velocidade inicial
  lastDrop = 0;

  // Limpa listas
  trashList = [];
  groundTrash = [];

  start();  // reinicia o loop e o timer
}


// ======================================
// RESET BASE
// ======================================
function resetGame(resetScore) {
  trashList = [];
  groundTrash = [];

  angle = 0;
  lastDrop = 0;

  if (resetScore) score = 0;

  updateScore();

  resetTimer();      // <- TEM DE EXISTIR EM ampulheta.js
  gameOver = false;

  start();           // reinicia tudo
}

// ======================================
// INICIAR
// ======================================
function start() {
  requestAnimationFrame(loop);
  startTimer();  // <- timer recomeça
}

start();
