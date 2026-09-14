let angle = 0;

canvas.addEventListener("mousemove", (e) => {
  const r = canvas.getBoundingClientRect();
  const mx = e.clientX - r.left;
  const my = e.clientY - r.top;
  angle = Math.atan2(my - 80, mx - (W/2));
});

function drawCannon() {
  const cannonWidth = IMG_SIZES.cannon.w;
  const cannonHeight = IMG_SIZES.cannon.h;
  const pivotOffsetY = -20;
  const cannonBaseX = W / 2;
  const cannonBaseY = 130;

  const glassPipe = new Image();
  glassPipe.src = "../image/glasspipe.png";
  const pipeWidth = 225;
  const pipeHeight = 165;
  const pipeX = cannonBaseX - pipeWidth / 2;
  const pipeY = cannonBaseY - cannonHeight / 3.8 - pipeHeight + 10;
  ctx.drawImage(glassPipe, pipeX, pipeY, pipeWidth, pipeHeight);

  ctx.save();
  ctx.translate(cannonBaseX, cannonBaseY + pivotOffsetY);
  ctx.rotate(angle);
  ctx.drawImage(
    cannonImg,
    -cannonWidth / 2.7,
    -cannonHeight /1.53 - pivotOffsetY,
    cannonWidth,
    cannonHeight
  );
  ctx.restore();
}

function drawNext() {
  const nextImg = trashImgs[nextTrashType];
  const imgW = IMG_SIZES.trash.w;
  const imgH = IMG_SIZES.trash.h;
  const cannonY = 150;
  const offsetY = 100;
  ctx.drawImage(nextImg, W / 2 - imgW / 2, cannonY - IMG_SIZES.cannon.h / 2 - offsetY, imgW, imgH);
}
