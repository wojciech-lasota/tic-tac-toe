export default class Board {
  //Initializing the board
  constructor(boardState = ["", "", "", "", "", "", "", "", ""]) {
    this.boardState = boardState;
  }
  //Function for displaying the boardState in the console
  printFormattedBoard() {
    let formattedString = "";
    this.boardState.forEach((cell, index) => {
      formattedString += cell ? ` ${cell} |` : "   |";
      if ((index + 1) % 3 === 0) {
        formattedString = formattedString.slice(0, -1);
        if (index < 8)
          formattedString +=
            "\n\u2015\u2015\u2015 \u2015\u2015\u2015 \u2015\u2015\u2015\n";
      }
    });
    console.log("%c" + formattedString, "color: #c11dd4;font-size:16px");
  }
  //lists the indexes of available spots in the boardState
  availableSpots() {
    const freeSpace = [];
    this.boardState.forEach((value, index) => {
      if (!value) {
        freeSpace.push(index);
      }
    });
    return freeSpace;
  }
  isEmpty() {
    return this.boardState.every((tiles) => !tiles);
  }
  isFull() {
    return this.boardState.every((tiles) => tiles);
  }
  //checking the boardState of the boardState
  winsChecking() {
    if (this.isEmpty()) return false;
    //Checking Horizontal Wins
    if (
      this.boardState[0] === this.boardState[1] &&
      this.boardState[0] === this.boardState[2] &&
      this.boardState[0]
    ) {
      return { winner: this.boardState[0] };
    }
    if (
      this.boardState[3] === this.boardState[4] &&
      this.boardState[3] === this.boardState[5] &&
      this.boardState[3]
    ) {
      return { winner: this.boardState[3] };
    }
    if (
      this.boardState[6] === this.boardState[7] &&
      this.boardState[6] === this.boardState[8] &&
      this.boardState[6]
    ) {
      return { winner: this.boardState[6] };
    }

    //Checking Vertical Wins
    if (
      this.boardState[0] === this.boardState[3] &&
      this.boardState[0] === this.boardState[6] &&
      this.boardState[0]
    ) {
      return { winner: this.boardState[0] };
    }
    if (
      this.boardState[1] === this.boardState[4] &&
      this.boardState[1] === this.boardState[7] &&
      this.boardState[1]
    ) {
      return { winner: this.boardState[1] };
    }
    if (
      this.boardState[2] === this.boardState[5] &&
      this.boardState[2] === this.boardState[8] &&
      this.boardState[2]
    ) {
      return { winner: this.boardState[2] };
    }

    //Checking Diagonal Wins
    if (
      this.boardState[0] === this.boardState[4] &&
      this.boardState[0] === this.boardState[8] &&
      this.boardState[0]
    ) {
      return { winner: this.boardState[0] };
    }
    if (
      this.boardState[2] === this.boardState[4] &&
      this.boardState[2] === this.boardState[6] &&
      this.boardState[2]
    ) {
      return {
        winner: this.boardState[2],
      };
    }

    //If no winner but the board is full, then it's a draw
    if (this.isFull()) {
      return { winner: "draw" };
    }

    //return false otherwise
    return false;
  }

  insert(symbol, index) {
    if (![0, 1, 2, 3, 4, 5, 6, 7, 8].includes(index)) {
      throw new Error(`Cell index ${index} does not exist!`);
    }
    if (!["x", "o"].includes(symbol)) {
      throw new Error("The symbol can only be x or o!");
    }
    if (this.boardState[index]) {
      return false;
    }
    this.boardState[index] = symbol;
    return true;
  }
  //End of the class
}
