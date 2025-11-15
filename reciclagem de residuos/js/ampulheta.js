/* ================================
   VARIÁVEIS DA AMPULHETA
===================================*/
const sandCanvas = document.getElementById("sandcanvas");
const sctx = sandCanvas.getContext("2d");

const WIDTH = 80;
const HEIGHT = 160;
const BOTTOM_HEIGHT = 80;
const grainCountTotal = 4800;

let grains = 0;
let grainsAdded = 0;
let timerRunning = false;
let timerInterval = null;

// estrutura dos grãos do fundo
let bottomGrains = Array.from({ length: WIDTH }, () =>
  new Array(HEIGHT / 2).fill(0)
);


/* ================================
   FUNÇÕES DE GEOMETRIA DA AMPULHETA
===================================*/
function getLeftBorder(y) {
  if (y < 40) return 0;
  else if (y < 80) return y - 40;
  else if (y < 120) return 120 - y;
  else return 0;
}

function getRightBorder(y) {
  return WIDTH - getLeftBorder(y);
}

function grainsInRow(y) {
  return WIDTH - getLeftBorder(y) * 2;
}

function getGrainStyle() {
  return "#C2B280";
}


/* ================================
   DESENHO
===================================*/

function drawBorders(ctx) {
  ctx.fillStyle = "#DCEAF7";
  for (let y = 0; y < HEIGHT; y++) {
    let l = getLeftBorder(y);
    let r = getRightBorder(y);
    ctx.fillRect(l, y, r - l, 1);
  }
}

function drawGrainsTop(ctx, grainCount) {
  ctx.fillStyle = getGrainStyle();
  let current = 0;

  for (let y = 79; y >= 0; y--) {
    const rowGrains = grainsInRow(y);
    let l = getLeftBorder(y);
    let r = getRightBorder(y);

    if (current + rowGrains < grainCount) {
      ctx.fillRect(l, y, r - l, 1);
      current += rowGrains;
    } else {
      let remain = grainCount - current;
      let half = remain / 2;
      ctx.fillRect(l, y, half, 1);
      ctx.fillRect(r - half, y, half, 1);
      return;
    }
  }
}

function drawGrainsBottom(ctx) {
  ctx.fillStyle = getGrainStyle();
  for (let y = BOTTOM_HEIGHT - 1; y >= 0; y--) {
    for (let x = 0; x < WIDTH; x++) {
      if (bottomGrains[y][x] === 1)
        ctx.fillRect(x, y + BOTTOM_HEIGHT, 1, 1);
    }
  }
}


function drawHourglass() {
  sctx.clearRect(0, 0, WIDTH, HEIGHT);
  drawBorders(sctx);

  const topGrains = grainCountTotal - grains;
  drawGrainsTop(sctx, topGrains);
  drawGrainsBottom(sctx);
}


/* ================================
   FÍSICA DA AREIA
===================================*/

function spawn() {
  bottomGrains[0][Math.floor(WIDTH / 2)] = 1;
}

function dropGrains() {
  for (let y = BOTTOM_HEIGHT - 2; y >= 0; y--) {
    for (let x = 0; x < WIDTH; x++) {

      if (bottomGrains[y][x] === 0) continue;

      if (bottomGrains[y + 1][x] === 0) {
        bottomGrains[y + 1][x] = 1;
        bottomGrains[y][x] = 0;

      } else if (y < BOTTOM_HEIGHT - 2) {

        if (x > 0 && bottomGrains[y + 1][x - 1] === 0) {
          bottomGrains[y + 1][x - 1] = 1;
          bottomGrains[y][x] = 0;

        } else if (x < WIDTH - 2 && bottomGrains[y + 1][x + 1] === 0) {
          bottomGrains[y + 1][x + 1] = 1;
          bottomGrains[y][x] = 0;
        }
      }

    }
  }
}


/* ================================
   TICK DO TIMER
===================================*/

function manualTick() {
  const grainsPerTick = grainCountTotal / (60 * 60); // 1 minuto
  grainsAdded += grainsPerTick;

  while (grainsAdded >= 1) {
    grains++;
    spawn();
    dropGrains();
    grainsAdded -= 1;

    // TIMER TERMINOU
    if (grains >= grainCountTotal) {
      endGame(); // <- chama popup do jogo
      return;
    }
  }

  drawHourglass();
}


/* ================================
   CONTROLO DO TIMER
===================================*/

function startTimer() {
  if (timerRunning) return; // evita múltiplos intervalos

  timerRunning = true;

  timerInterval = setInterval(() => {
    if (!gameOver) manualTick();
  }, 1000 / 60);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerRunning = false;
}

function resetTimer() {
  stopTimer();

  // reset total
  grains = 0;
  grainsAdded = 0;
  bottomGrains = Array.from({ length: WIDTH }, () =>
    new Array(HEIGHT / 2).fill(0)
  );

  drawHourglass();
}
