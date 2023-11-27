import Board from "./board.js";

export default function initializeEvents(board) {
  const boardEl = document.querySelector('#board');
  boardEl.addEventListener('click', squareClickHanlder);

  const resetBtnEl = document.querySelector('#reset-btn');
  resetBtnEl.addEventListener('click', resetGame);

  function squareClickHanlder(e) {
    if (e.target.classList.contains('square')) {
      const [row, col] = e.target.id.split(' ').map(n => Number(n));
      const val = board.makeHit(row, col);
      if (val) {
        e.target.style.backgroundColor = 'green';
        e.target.innerText = val;
      } else {
        e.target.style.backgroundColor = 'red';
      }
      if (board.isGameOver()) {
        document.querySelector('#gameOverMsg').classList.remove('hidden');
        boardEl.removeEventListener('click', squareClickHanlder);
      }
    }
  }

  function resetGame() {
    for (let i = 0; i < board.grid.length; i++) {
      for (let j = 0; j < board.grid[0].length; j++) {
        const square = document.getElementById(`${i} ${j}`);
        square.style.backgroundColor = 'transparent';
        square.innerText = '';
      }
    }
    document.querySelector('#gameOverMsg').classList.add('hidden');
    board = new Board();
    boardEl.addEventListener('click', squareClickHanlder);
  }
}
