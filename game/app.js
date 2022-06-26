import Board from "./board.js";
import Player from "./player.js";
import { drawWinningLine, hasClass, addClass } from "./helpers.js";

// const board = new Board(["", "", "", "", "x", "", "", "", ""]);
// board.printFormattedBoard();
// const p = new Player();
// console.log(p.getBestMove(board));
// console.log(p.getBestMove(board, false));
// console.log(p.nodeMap);
// board.insert("x", 7);
// board.printFormattedBoard();
// console.log(p.getBestMove(board, false));
// console.log(p.nodeMap);
// board.insert("o", 4);
// board.printFormattedBo("newGame");ard();
// console.log(p.getBestMove(board));
// console.log(p.nodeMap);
// board.insert("x", 2);
// board.printFormattedBoard();
// console.log(p.getBestMove(board, false));
// console.log(p.nodeMap);

function newGame(depth = -1, startingPlayer = 1) {
  const player = new Player(parseInt(depth));
  const board = new Board(["", "", "", "", "", "", "", "", ""]);

  const boardDIV = document.getElementById("board");

  boardDIV.className = "";
  boardDIV.innerHTML = `
  <div class="winnerdisplay"></div>
  <div class="cells-wrap">
  <button type="button" class="btn btn-outline-dark"></button>
    <button type="button" class="btn btn-outline-dark cell-0"></button>
    <button type="button" class="btn btn-outline-dark cell-1"></button>
    <button type="button" class="btn btn-outline-dark cell-2"></button>
    <button type="button" class="btn btn-outline-dark cell-3"></button>
    <button type="button" class="btn btn-outline-dark cell-4"></button>
    <button type="button" class="btn btn-outline-dark cell-5"></button>
    <button type="button" class="btn btn-outline-dark cell-6"></button>
    <button type="button" class="btn btn-outline-dark cell-7"></button>
    </div>
    
  `;
  const htmlCells = [...boardDIV.querySelector(".cells-wrap").children];
  console.log(boardDIV.firstElementChild);
  const alertDisplay = boardDIV.firstElementChild;

  const starting = parseInt(startingPlayer),
    maximizing = starting;
  let playerTurn = starting;
  if (!starting) {
    const centerAndCorners = [0, 2, 4, 6, 8];
    const firstChoice =
      centerAndCorners[Math.floor(Math.random() * centerAndCorners.length)];
    const symbol = !maximizing ? "x" : "o";
    board.insert(symbol, firstChoice);
    htmlCells[firstChoice].textContent = symbol;
    // addClass(htmlCells[firstChoice], symbol);
    playerTurn = 1; //Switch turns
  }

  board.boardState.forEach((cell, index) => {
    htmlCells[index].addEventListener(
      "click",
      () => {
        //If cell is already occupied or the board is in a terminal state or it's not humans turn, return false
        if (
          htmlCells[index].textContent == "x" ||
          htmlCells[index].textContent == "o" ||
          board.winsChecking() ||
          !playerTurn
        )
          return false;
        const symbol = maximizing ? "x" : "o"; //Maximizing player is always 'x'
        //Update the Board class instance as well as the Board UI
        board.insert(symbol, index);
        htmlCells[index].textContent = symbol;

        // addClass(htmlCells[index], symbol);
        //If it's a terminal move and it's not a draw, then human won

        if (board.winsChecking()) {
          console.log(board.boardState);
          console.log(board.winsChecking().winner);
          if (board.winsChecking().winner == "x") {
            alertDisplay.classList.add("alert-success");
            alertDisplay.textContent = "You Won!";
            setTimeout(() => {
              alertDisplay.classList.remove(`alert-success`);
              alertDisplay.textContent = ".";
            }, 1200);
          }
          if (board.winsChecking().winner == "draw") {
            alertDisplay.classList.add("alert-success");
            alertDisplay.textContent = "Its Draw!";
            setTimeout(() => {
              alertDisplay.classList.remove(`alert-success`);
              alertDisplay.textContent = ".";
            }, 1200);
          }
          board.printFormattedBoard();
        }
        playerTurn = 0; //Switch turns
        //Get computer's best move and update the UI
        player.getBestMove(board, !maximizing, (best) => {
          const symbol = !maximizing ? "x" : "o";
          board.insert(symbol, parseInt(best));

          htmlCells[best].textContent = symbol;

          //   addClass(htmlCells[best], symbol);
          //   console.log(board.winsChecking());
          //   console.log(Array.from(board.boardState));
          if (board.winsChecking()) {
            console.log(board.boardState);
            console.log(board.winsChecking().winner);
            board.printFormattedBoard();
            if (board.winsChecking().winner == "o") {
              alertDisplay.classList.add("alert-failure");
              alertDisplay.textContent = "You Lose!";
              setTimeout(() => {
                alertDisplay.classList.remove(`alert-failure`);
                alertDisplay.textContent = ".";
              }, 1200);
              if (board.winsChecking().winner == "draw") {
                alertDisplay.classList.add("alert-failure");
                alertDisplay.textContent = "Its Draw!";
                setTimeout(() => {
                  alertDisplay.classList.remove(`alert-success`);
                  alertDisplay.textContent = ".";
                }, 1200);
              }
            }
          }
          playerTurn = 1; //Switch turns
        });
      },
      false
    );
    if (cell) {
      htmlCells[index].textContent = cell;
      //   addClass(htmlCells[index], cell);
    }
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const depth = -1;
  const startingPlayer = 1;
  newGame(depth, startingPlayer);
  document.getElementById("newGame").addEventListener("click", () => {
    const startingDIV = document.getElementById("starting");
    const starting = startingDIV.options[startingDIV.selectedIndex].value;
    const depthDIV = document.getElementById("depth");
    const depth = depthDIV.options[depthDIV.selectedIndex].value;
    newGame(depth, starting);
  });
  let deg = 0;
});
