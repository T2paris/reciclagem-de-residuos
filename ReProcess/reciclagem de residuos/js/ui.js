const scoreBox = document.getElementById("score-box");
const levelBox = document.getElementById("level-box");
const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popup-title");
const popupButtons = document.getElementById("popup-buttons");

let score = 0;
let level = 1;
let gameOver = false;

function updateScore() {
  scoreBox.textContent = "Score: " + score;
}

function showPopup(title, buttons) {
  popup.style.display = "flex";
  popupTitle.textContent = title;
  popupButtons.innerHTML = "";
  buttons.forEach(btn => {
    const b = document.createElement("button");
    b.textContent = btn.text;
    b.onclick = btn.action;
    popupButtons.appendChild(b);
  });
}

function endGame() {
  gameOver = true;
  if(score >= 1000){
    showPopup("🎉 Parabéns!", [
      { text: "Continuar", action: nextLevel },
      { text: "Menu", action: () => window.location.href = "../index.html" }
    ]);
  } else {
    showPopup("💀 Fim de jogo!", [
      { text: "Tentar novamente", action: restartGame },
      { text: "Menu", action: () => window.location.href = "../index.html" }
    ]);
  }
}
