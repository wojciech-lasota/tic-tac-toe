class Board {
  //initializing the board
  constructor(state = [...Array(3)].map((row) => Array(3).fill(null))) {
    this.state = state;
  }
  /**
   * Put a new sign [x,o]
   * @param {String} sign
   * @param {Number} index
   * @returns {Boolean}
   */
  isEmpty() {
    return this.state.every((element) => !element);
  }
  isFull() {
    return this.state.every((cell) => {
      cell;
    });
  }
  putASing(sign, index) {
    //if the space is already used
    if (this.state[index]) {
      return false;
    }
    this.state[index] = sign;
    return true;
  }
  //return an array with available moves
  availableMoves() {
    const availableMoves = [];
    this.state.filter((value, index) => {
      if (!value) {
        availableMoves.push(index);
      }
    });
  }
  /**
   * check if anyone won
   * @returns {Object} with the winner
   */
  gameState() {
    if (this.isEmpty()) return false;
    // checking rows
    if (
      this.state[0] === this.state[1] &&
      this.state[1] === this.state[2] &&
      this.state[0]
    ) {
      return { winner: this.state[0], direction: "H", row: 1 };
    }
    if (
      this.state[3] === this.state[4] &&
      this.state[3] === this.state[5] &&
      this.state[3]
    ) {
      return { winner: this.state[3], direction: "H", row: 2 };
    }
    if (
      this.state[6] === this.state[7] &&
      this.state[6] === this.state[8] &&
      this.state[6]
    ) {
      return { winner: this.state[6], direction: "H", row: 3 };
    }
    // checking columns
    if (
      this.state[0] === this.state[3] &&
      this.state[0] === this.state[6] &&
      this.state[0]
    ) {
      return { winner: this.state[0], direction: "V", column: 1 };
    }
    if (
      this.state[1] === this.state[4] &&
      this.state[1] === this.state[7] &&
      this.state[1]
    ) {
      return { winner: this.state[1], direction: "V", column: 2 };
    }
    if (
      this.state[2] === this.state[5] &&
      this.state[2] === this.state[8] &&
      this.state[2]
    ) {
      return { winner: this.state[2], direction: "V", column: 3 };
    }
    //checking diagonals
    if (
      this.state[0] === this.state[4] &&
      this.state[0] === this.state[8] &&
      this.state[0]
    ) {
      return { winner: this.state[0], direction: "D", diagonal: "main" };
    }
    if (
      this.state[2] === this.state[4] &&
      this.state[2] === this.state[6] &&
      this.state[2]
    ) {
      return { winner: this.state[2], direction: "D", diagonal: "counter" };
    }
    //checking for draw
    if (this.isFull()) {
      return { winner: "draw" };
    }
    return false;
  }
}
export default Board;
