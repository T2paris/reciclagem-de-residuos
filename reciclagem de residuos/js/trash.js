let trashList = [];
let groundTrash = [];
let types = ["Paper","Plastic","Glass","Metal"];
let nextTrashType = types[Math.floor(Math.random()*types.length)];

function dropTrash(){
  trashList.push({
    x: W/2 + Math.cos(angle)*80,
    y: 80 + Math.sin(angle)*80,
    size: IMG_SIZES.trash.w,
    vx: Math.cos(angle)*5,
    vy: Math.sin(angle)*5,
    gravity: 0.14,
    type: nextTrashType
  });
  nextTrashType = types[Math.floor(Math.random()*types.length)];
}

function updateTrash(t){
  t.vy += t.gravity;
  t.x += t.vx;
  t.y += t.vy;
  const groundY = H - BIN_H - 40;

  if(t.y >= groundY){
    const hit = bins.find(b=>t.x>=b.x && t.x<=b.x+BIN_W);
    if(hit){
      score += (hit.type===t.type) ? 100 : -50;
      updateScore();
      return false;
    }
    score -= 100;
    updateScore();
    const pile = groundTrash.filter(g => Math.abs(g.x - t.x) < t.size);
    t.y = pile.length===0 ? (H-25) : Math.min(...pile.map(p=>p.y))-t.size;
    t.vx=t.vy=0;
    groundTrash.push(t);
    return false;
  }
  return true;
}

function drawTrash(t){
  ctx.drawImage(trashImgs[t.type], t.x-t.size/2, t.y-t.size/2, t.size, t.size);
}
