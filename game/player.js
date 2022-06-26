import Board from "./board.js";

export default class Player {
  constructor(maxDepth = -1) {
    this.maxDepth = maxDepth;
    this.nodeMap = new Map();
  }
  /**
   *if (maximizing == true) then player looking for nodes with the maximum value
   if maximizing == false then player is looking for nodes with the minimum value
   * @param {Board} board
   * @param {Boolean} maximizing - to decide if the player is maximizing or minimizing
   * @param {CallableFunction} callback
   * @param {Number} depth - current node depth
   * maximizing player looking for the best move (which the highes value)
   * while minimizing player looking for move which the lovest value
   *  to minimize the value for the maximizing player
   */
  getBestMove(board, maximizing = true, callback = () => {}, depth = 0) {
    //if we are on the very top level, we'd like to clear the nodeMap from previous calculations
    if (depth == 0) {
      this.nodeMap.clear();
    }
    //base point of recursive is when some won or function reach the maxDepth
    if (board.winsChecking() || depth === this.maxDepth) {
      if (board.winsChecking().winner === "x") {
        return 100 - depth;
      } else if (board.winsChecking().winner === "o") {
        return -100 + depth;
      }
      return 0;
    }
    //if maximizing player turn
    if (maximizing) {
      let best = -100;
      board.availableSpots().forEach((availableSpot) => {
        //child in the sense of the tree's data structure
        const child = new Board([...board.boardState]);
        //on every interation insert the symbol in the availableSpot
        child.insert("x", availableSpot);
        //and then recursively call getBestMove with the child
        //minimizing player and incremented depth
        const nodeValue = this.getBestMove(child, false, callback, depth + 1);
        //compare nodeValue with the current best
        best = Math.max(best, nodeValue);
        //store nodeValue and moves if we are on the top level
        if (depth == 0) {
          //Comma separated indices if multiple moves have the same heuristic value
          const moves = this.nodeMap.has(nodeValue)
            ? //in this case it is String
              `${this.nodeMap.get(nodeValue)},${availableSpot}` //if multiple moves have te same value
            : availableSpot;
          this.nodeMap.set(nodeValue, moves);
        }
      });
      //main call case
      if (depth == 0) {
        let returnValue;
        if (typeof this.nodesMap.get(best) == "string") {
          const arr = this.nodesMap.get(best).split(",");
          //indices have the same value so we are going to random index
          const rand = Math.floor(Math.random() * arr.length);
          returnValue = arr[rand];
        } else {
          returnValue = this.nodesMap.get(best);
        }
        //run a callback after calculation and return the index
        callback(returnValue);
        return returnValue;
      }

      return best;
    }

    //if minimizing player turn
    if (!maximizing) {
      let best = 100;
      board.availableSpots().forEach((availableSpot) => {
        //child in the sense of the tree's data structure
        const child = new Board([...board.boardState]);
        //on every interation insert the symbol in the availableSpot
        child.insert("o", availableSpot);
        //and then recursively call getBestMove with the child
        //maximizing player and incremented depth
        const nodeValue = this.getBestMove(child, true, callback, depth + 1);
        //compare nodeValue with the current best
        best = Math.min(best, nodeValue);
        //store nodeValue and moves if we are on the top level
        if (depth == 0) {
          //Comma separated indices if multiple moves have the same heuristic value
          const moves = this.nodeMap.has(nodeValue)
            ? //in this case it is String
              `${this.nodeMap.get(nodeValue)},${availableSpot}` //if multiple moves have te same value
            : availableSpot;
          this.nodeMap.set(nodeValue, moves);
        }
      });
      //main call case
      if (depth == 0) {
        let randomIndex;
        //indices have the same value so we are going to random index
        if (typeof this.nodeMap.get(best) == "string") {
          const array = this.nodeMap.get(best).split(",");
          const randomChose = Math.floor(Math.random() * array.length);
          randomIndex = array[randomChose];
        } else {
          randomIndex = this.nodeMap.get(best);
        }
        callback(randomIndex);
        return randomIndex;
      }
      return best;
    }
  }
  //end of the class
}
