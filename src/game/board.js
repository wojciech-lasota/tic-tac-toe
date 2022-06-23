export default class Board {
  constructor(boardState = [...Array(9).fill("")]) {
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
  //checking the state of the boardState
  winsChecking() {
    if (this.isEmpty()) {
      return false;
    }
    //checking winner in rows
    if (
      this.boardState[0] &&
      this.boardState[0] === this.boardState[1] &&
      this.boardState[0] === this.boardState[2]
    ) {
      return { winner: this.boardState[0] };
    }
    if (
      this.boardState[3] &&
      this.boardState[3] === this.boardState[4] &&
      this.boardState[3] === this.boardState[5]
    ) {
      return { winner: this.boardState[3] };
    }
    if (
      this.boardState[6] &&
      this.boardState[6] === this.boardState[7] &&
      this.boardState[6] === this.boardState[7]
    ) {
      return { winner: this.boardState[6] };
    }
    //checking winner in columns
    if (
      this.boardState[0] &&
      this.boardState[0] === this.boardState[3] &&
      this.boardState[0] === this.boardState[6]
    ) {
      return { winner: this.boardState[0] };
    }
    if (
      this.boardState[1] &&
      this.boardState[1] === this.boardState[4] &&
      this.boardState[1] === this.boardState[7]
    ) {
      return { winner: this.boardState[1] };
    }
    if (
      this.boardState[2] &&
      this.boardState[2] === this.boardState[5] &&
      this.boardState[2] === this.boardState[8]
    ) {
      return { winner: this.boardState[2] };
    }
    //checking winner in diagonals
    if (
      this.boardState[0] &&
      this.boardState[0] === this.boardState[4] &&
      this.boardState[0] === this.boardState[8]
    ) {
      return { winner: this.boardState[0] };
    }
    if (
      this.boardState[2] &&
      this.boardState[2] === this.boardState[5] &&
      this.boardState[2] === this.boardState[6]
    ) {
      return { winner: this.boardState[2] };
    }
    //checking for a draw
    if (this.isFull()) {
      return { winner: "draw" };
    }
    return false;
  }
  insert(symbol, index) {
    if (this.boardState[index]) {
      return false;
    }
    this.boardState[index] = symbol;
  }
  //End of the class
}
