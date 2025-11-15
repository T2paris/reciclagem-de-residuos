// ==============================
// ANIMAÇÃO DE MOSCAS (versão simples)
// ==============================

// Cada mosca é um pequeno ponto animado
class Fly {
    constructor() {
      this.reset();
    }
  
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
  
      const speed = Math.random() * 2 + 1;
      const angle = Math.random() * Math.PI * 2;
  
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
  
      this.size = Math.random() * 3 + 2;
    }
  
    update() {
      this.x += this.vx;
      this.y += this.vy;
  
      // Se sair do ecrã, volta a aparecer do outro lado
      if (this.x < -20) this.x = W + 20;
      if (this.x > W + 20) this.x = -20;
      if (this.y < -20) this.y = H + 20;
      if (this.y > H + 20) this.y = -20;
    }
  
    draw() {
      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  // Criar várias moscas
  let flies = [];
  for (let i = 0; i < 20; i++) flies.push(new Fly());
  
  function updateFlies() {
    flies.forEach(f => f.update());
  }
  
  function drawFlies() {
    flies.forEach(f => f.draw());
  }
  