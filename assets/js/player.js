export default class Player {
  constructor(board) {
    this.board = board;
    this.availableSquares = Array.from(new Array(9), () => new Array(9).fill(null));
  }
}
