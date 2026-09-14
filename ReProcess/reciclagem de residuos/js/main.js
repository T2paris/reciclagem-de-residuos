

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

  // zera score
  score = 0;
  updateScore();

  // Aumenta dificuldade (2x mais rápido)
  dropInterval = dropInterval / 2;

  lastDrop = 0;
  trashList = [];
  groundTrash = [];

  resetTimer();  // timer volta ao início
  start();       // reinicia o loop
}



// ======================================
// RECOMEÇAR O JOGO
// ======================================
function restartGame() {
  popup.style.display = "none";
  gameOver = false;

  // Reset total
  level = 1;
  levelBox.textContent = "Nível: " + level;

  score = 0;
  updateScore();

  dropInterval = 4000; // velocidade inicial
  lastDrop = 0;

  trashList = [];
  groundTrash = [];

  resetTimer(); // reinicia o timer (vem do ampulheta.js)
  start();      // reinicia o loop do jogo
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
