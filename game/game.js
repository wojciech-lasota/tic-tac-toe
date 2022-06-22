const gameBoard = (() => {
  //An array that store the  state of the game
  //1 for player mark
  //-1 for computer mark
  let _board = new Array(9);

  //********** SETUP PLAYBOARD **********/
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
  //when its playerPl
  buttons.map((button) => {
    button.addEventListener("click", playerPlay);
  });

  //variable that stores the setInterval method, after playerPlay its interrupt computerPlay
  let intervalId;
  //   const winning_patern = [
  //     [0, 1, 2],
  //     [3, 4, 5],
  //     // [6, 7, 8],
  //     // [0, 3, 6],
  //     // [1, 4, 7],
  //     // [2, 5, 8],
  //     // [0, 4, 8],
  //     // [2, 4, 6],
  //   ];
  let gameOver = false;
  function checkWin() {
    if (!gameOver) {
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
            gameOver = true;
            playerTurn = false;
          } else if (rowSum == -3) {
            console.log("computer win");
            gameOver = true;
            playerTurn = false;
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
            gameOver = true;
            playerTurn = false;
          } else if (colSum == -3) {
            console.log("computer win");
            gameOver = true;
            playerTurn = false;
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
        gameOver = true;
        playerTurn = false;
      } else if (
        _board[0] + _board[4] + _board[8] == -3 ||
        _board[2] + _board[4] + _board[6] == -3
      ) {
        console.log("computer win");
        gameOver = true;
        playerTurn = false;
      }
    }
  }
  let playerTurn = true;

  //if playerTurn is true then player can put his mark by click the button
  function playerPlay(e) {
    const tile = e.currentTarget;
    if (playerTurn) {
      tile.textContent = "x";
      tile.disabled = true;
      playerTurn = false;
      _board[tile.id] = 1;
      checkWin();
      intervalId = setInterval(computerPlay, 1000);
    }
  }
  function computerPlay() {
    clearInterval(intervalId);
    if (!playerTurn && !gameOver) {
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
