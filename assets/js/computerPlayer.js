import Player from "./player.js";

export default class ComputerPlayer extends Player {
  generateRandomMove() {
    const [numRows, numCols] = [this.board.grid.length, this.board.grid[0].length];
    while (true) {
      const [row, col] = [Math.floor(Math.random() * numRows), Math.floor(Math.random() * numCols)];
      if (this.availableSquares[row][col] == null) return [row, col];
    }
  }

  updateUserBoard(row, col, val) {
    this.availableSquares[row][col] = val;
  }
}
