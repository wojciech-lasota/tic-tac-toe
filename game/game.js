const resetBtn = document.querySelector(".reset-btn");
let rotateValue = 0;
let playerTurn = true;
let intervalId;
let _board = new Array(9);
function addButtons() {
  const playground = document.querySelector(".playground");
  for (let i = 0; i < _board.length; i++) {
    const button = document.createElement("button");
    button.type = "button";
    button.classList.add("btn", "btn-primary", "tiles");
    button.setAttribute("id", i);
    playground.appendChild(button);
  }
}
addButtons();
const buttons = [...document.querySelectorAll(".tiles")];
buttons.map((button) => {
  button.addEventListener("click", playerPlay);
});

function resetGame() {
  rotateValue += 360;
  resetBtn.style["transition-duration"] = "1s";
  resetBtn.style.transform = `rotate(` + rotateValue + `deg)`;

  buttons.map((button) => {
    button.innerHTML = "";
    button.disabled = false;
  });
  _board = new Array(9);
  setTimeout(() => {
    resultspanDisplay.classList.remove(`clicked`);
  }, 1000);
}
resetBtn.addEventListener("click", resetGame);

function playerPlay(e) {
  if (playerTurn) {
    playerTurn = false;
    const tile = e.currentTarget;
    tile.textContent = "x";
    tile.disabled = true;
    _board[tile.id] = 1;
    intervalId = setInterval(computerPlay, 1000);
  }
}
function freeSpace() {
  const moves = [];
  _board.forEach((value, index) => {
    if (!value) moves.push(index);
  });
  return moves;
}
function computerPlay() {
  if (!playerTurn) {
    clearInterval(intervalId);
    playerTurn = true;

    _board;
    tile.textContent = "0";
    tile.disabled = true;
    _board[tile.id] = -1;
  }
}
