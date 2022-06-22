const gameBoard = (() => {
  //An array that store the  state of the game
  //1 for player mark
  //-1 for computer mark
  let _board = new Array(9);
  let isGameOver = false;
  const resultDisplay = document.querySelector("#gameResult");
  const resetBtn = document.querySelector(".reset-btn");
  let intervalId;
  let turns = 0;
  let rotateValue = 0;
  const resultspanDisplay = document.querySelector(".result");

  //SETUP PLAYBOARD add buttons
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
    // _board.map((el) => (el = 0));
    _board = new Array(9);
    isGameOver = false;
    playerTurn = true;

    turns = 0;
    setTimeout(() => {
      resultspanDisplay.classList.remove(`clicked`);
    }, 1000);
    setTimeout(() => {
      //   resultDisplay.textContent = ` `;
      resultDisplay.innerHTML = "";
    }, 1900);
  }
  resetBtn.addEventListener("click", resetGame);

  function gameOver(whoWon) {
    resultspanDisplay.classList.add("clicked");
    clearInterval(intervalId);
    isGameOver = true;
    playerTurn = false;
    whoWon == 0
      ? (resultDisplay.textContent = "Draw!")
      : whoWon > 0
      ? (resultDisplay.textContent = "You Won!")
      : (resultDisplay.textContent = "You Lose!");
    buttons.map((button) => {
      button.disabled = true;
    });
  }
  function checkWin() {
    if (!isGameOver) {
      let colSum = 0;
      let rowSum = 0;
      let diagonalSum = 0;

      //checking rows
      // ╔═══╦═══╦═══╗
      // ║ 0 ║ 1 ║ 2 ║
      // ╠═══╬═══╬═══╣
      // ║ 3 ║ 4 ║ 5 ║
      // ╠═══╬═══╬═══╣
      // ║ 6 ║ 7 ║ 8 ║
      // ╚═══╩═══╩═══╝
      //each iteration checks a single row sum
      for (let i = 0; i < _board.length; i += 3) {
        for (let j = i; j < i + 3; j++) {
          //
          rowSum += _board[j];
          if (rowSum == 3) {
            console.log("player win");
            gameOver(1);
          } else if (rowSum == -3) {
            console.log("computer win");
            gameOver(-1);
          }
        }
        rowSum = 0;
      }
      //checking columns
      //each iteration checks a signel collumn sum
      for (let i = 0; i < 3; i++) {
        for (let j = i; j < i + 7; j += 3) {
          colSum += _board[j];
          if (colSum == 3) {
            console.log("player win");
            gameOver(1);
          } else if (colSum == -3) {
            console.log("computer win");
            gameOver(-1);
          }
        }
        colSum = 0;
      }
      //checking diagonals
      // ╔═══╦═══╦═══╗
      // ║ 0 ║ - ║ 2 ║
      // ╠═══╬═══╬═══╣
      // ║ - ║ 4 ║ - ║
      // ╠═══╬═══╬═══╣
      // ║ 6 ║ - ║ 8 ║
      // ╚═══╩═══╩═══╝
      if (
        _board[0] + _board[4] + _board[8] == 3 ||
        _board[2] + _board[4] + _board[6] == 3
      ) {
        console.log("player win");
        gameOver(1);
      } else if (
        _board[0] + _board[4] + _board[8] == -3 ||
        _board[2] + _board[4] + _board[6] == -3
      ) {
        console.log("computer win");
        gameOver(-1);
      }
      //checking for draw
      if (turns == 9 && !isGameOver) {
        gameOver(0);
      }
      console.log(turns, " turns");
    }
  }
  let playerTurn = true;

  //if playerTurn is true then player can put his mark by click the button
  function playerPlay(e) {
    const tile = e.currentTarget;
    if (playerTurn) {
      turns++;
      playerTurn = false;
      tile.textContent = "x";
      tile.disabled = true;
      _board[tile.id] = 1;
      checkWin();
      intervalId = setInterval(computerPlay, 1000);
    }
  }
  function computerPlay() {
    clearInterval(intervalId);
    turns++;
    if (!playerTurn && !isGameOver) {
      playerTurn = true;

      let computerChose = Math.floor(Math.random() * _board.length);
      while (_board[computerChose] !== undefined) {
        computerChose = Math.floor(Math.random() * _board.length);
      }
      buttons[computerChose].textContent = "o";
      buttons[computerChose].disabled = true;
      _board[computerChose] = -1;
      checkWin();
    }
  }
})();
