const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const W = canvas.width, H = canvas.height;

const IMG_SIZES = {
  cannon: { w: 200, h: 130 },
  trash:  { w: 45,  h: 45 },
  bin:    { w: 120, h: 150 }
};

const bg = new Image(); bg.src = "../image/background.png";
const cannonImg = new Image(); cannonImg.src = "../image/cannon.png";

const trashImgs = {
  Paper: new Image(), Plastic: new Image(), Glass: new Image(), Metal: new Image()
};
trashImgs.Paper.src = "../image/papel.png";
trashImgs.Plastic.src = "../image/plastico.png";
trashImgs.Glass.src = "../image/vidro.png";
trashImgs.Metal.src = "../image/metal.png";

const binImgs = {
  Paper: new Image(), Plastic: new Image(), Glass: new Image(), Metal: new Image()
};
binImgs.Paper.src = "../image/blue bin.png";
binImgs.Plastic.src = "../image/yellow bin.png";
binImgs.Glass.src = "../image/green bin.png";
binImgs.Metal.src = "../image/red bin.png";

const BIN_W = IMG_SIZES.bin.w;
const BIN_H = IMG_SIZES.bin.h;
const bins = [
  {type:"Plastic", x:100},
  {type:"Paper",   x:320},
  {type:"Glass",   x:540},
  {type:"Metal",   x:760}
];
