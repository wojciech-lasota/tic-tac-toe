// const tiles = document.querySelectorAll(".tiles");
// const resetBtn = document.querySelector(".reset-btn");

// let player = true;
// tiles.forEach((tiles) => {
//   tiles.addEventListener("click", () => {
//     if (player) {
//       tiles.innerText = "x";
//       player = false;
//       tiles.disabled = true;
//     } else {
//       tiles.innerText = "o";
//       player = true;
//       tiles.disabled = true;
//     }
//   });
// });
// resetBtn.addEventListener("click", () => {
//   tiles.forEach((tiles) => {
//     tiles.innerText = "";
//     tiles.disabled = false;
//   });
// });

//module pattern for gameboard
// const gameBoard = (() => {})();
const gameBoard = (() => {
  let _board = new Array(9);
  let intervalId;
  const winning_patern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let playerTurn = true;
  //add playgrounds buttons
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
  const buttons = [...document.querySelectorAll(".tiles")]; //convert StaticNodeList to array
  //add eventListener to buttons
  buttons.map((button) => {
    button.addEventListener("click", putPlayerMark);
  });
  //if playerTurn is true then player can put his mark by click the button
  function putPlayerMark(e) {
    const tile = e.currentTarget;
    if (playerTurn) {
      tile.textContent = "x";
      tile.disabled = true;
      playerTurn = false;
      _board[tile.id] = 1;
      intervalId = setInterval(computerPlay, 1000);
    }
  }
  function computerPlay() {
    if (!playerTurn) {
      clearInterval(intervalId);

      let computerChose = Math.floor(Math.random() * _board.length);
      while (_board[computerChose] !== undefined) {
        computerChose = Math.floor(Math.random() * _board.length);
      }
      buttons[computerChose].textContent = "o";
      buttons[computerChose].disabled = true;
      _board[computerChose] = "0";
      playerTurn = true;
    }
  }
  function checkWin() {
    console.log(_board);
  }
  checkWin();
})();
