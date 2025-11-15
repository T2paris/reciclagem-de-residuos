// Ação do botão Start — vai para o jogo
document.getElementById('startBtn').addEventListener('click', () => {
  window.location.href = 'html/reprocess.html';
});

document.getElementById('tutorasBtn').addEventListener('click', () => {
  window.location.href = 'html/tutorial.html';
});

// Animação de itens recicláveis caindo no menu
const canvas = document.getElementById('recycleCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const imagePaths = [
  'image/metal.png',
  'image/papel.png',
  'image/plastico.png',
  'image/vidro.png'
];

const items = [];

class FallingItem {
  constructor(img) {
    this.img = img;
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * -canvas.height;
    this.size = Math.random() * 0.4 + 0.4;
    this.speed = Math.random() * 1 + 0.5;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() - 0.5) * 0.02;
  }

  update() {
    this.y += this.speed;
    this.rotation += this.rotationSpeed;
    if (this.y > canvas.height + 50) this.reset();
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    const size = 150 * this.size;
    ctx.drawImage(this.img, -size / 2, -size / 2, size, size);
    ctx.restore();
  }
}

function loadImages() {
  let loaded = 0;
  imagePaths.forEach(src => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      for (let i = 0; i < 8; i++) {
        items.push(new FallingItem(img));
      }
      loaded++;
      if (loaded === imagePaths.length) animate();
    };
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  items.forEach(item => {
    item.update();
    item.draw();
  });
  requestAnimationFrame(animate);
}

loadImages();
