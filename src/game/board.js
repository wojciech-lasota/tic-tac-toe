export default class Board {
  constructor(board = [...Array(9).fill("")]) {
    this.board = board;
  }
  //Function for displaying the board in the console
  printFormattedBoard() {
    let formattedString = "";
    this.board.forEach((cell, index) => {
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
  //lists the indexes of available spots in the board
  availableSpots() {
    const freeSpace = [];
    return this.board.forEach((value, index) => {
      if (!value) {
        freeSpace.push(index);
      }
    });
  }
  isEmpty() {
    return this.board.every((tiles) => !tiles);
  }
  isFull() {
    return this.board.every((tiles) => tiles);
  }
  //checking the state of the board
  winsChecking() {
    if (this.isEmpty()) {
      return false;
    }
    //checking winner in rows
    if (
      this.board[0] &&
      this.board[0] === this.board[1] &&
      this.board[0] === this.board[2]
    ) {
      return { winner: this.board[0] };
    }
    if (
      this.board[3] &&
      this.board[3] === this.board[4] &&
      this.board[3] === this.board[5]
    ) {
      return { winner: this.board[3] };
    }
    if (
      this.board[6] &&
      this.board[6] === this.board[7] &&
      this.board[6] === this.board[7]
    ) {
      return { winner: this.board[6] };
    }
    //checking winner in columns
    if (
      this.board[0] &&
      this.board[0] === this.board[3] &&
      this.board[0] === this.board[6]
    ) {
      return { winner: this.board[0] };
    }
    if (
      this.board[1] &&
      this.board[1] === this.board[4] &&
      this.board[1] === this.board[7]
    ) {
      return { winner: this.board[1] };
    }
    if (
      this.board[2] &&
      this.board[2] === this.board[5] &&
      this.board[2] === this.board[8]
    ) {
      return { winner: this.board[2] };
    }
    //checking winner in diagonals
    if (
      this.board[0] &&
      this.board[0] === this.board[4] &&
      this.board[0] === this.board[8]
    ) {
      return { winner: this.board[0] };
    }
    if (
      this.board[2] &&
      this.board[2] === this.board[5] &&
      this.board[2] === this.board[6]
    ) {
      return { winner: this.board[2] };
    }
    //checking for a draw
    if (this.board.isFull()) {
      return { winner: "draw" };
    }
    return false;
  }
  insert(symbol, index) {
    if (this.board[index]) {
      return false;
    }
    this.board[index] = symbol;
  }
  //End of the class
}
