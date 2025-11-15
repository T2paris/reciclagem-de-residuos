let lastDrop = 0;
let dropInterval = 4000;

function loop(ts) {
  if(gameOver) return;

  ctx.clearRect(0,0,W,H);

  if(bg.complete) ctx.drawImage(bg,0,0,W,H);

  drawCannon();
  drawNext();
  drawBins();

  groundTrash.forEach(drawTrash);

  trashList = trashList.filter(t => (drawTrash(t), updateTrash(t)));

  if(ts - lastDrop > dropInterval){
    dropTrash();
    lastDrop = ts;
  }

  // === MOSCAS ===
  updateFlies();
  drawFlies();

  requestAnimationFrame(loop);
}

