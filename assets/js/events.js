import Board from "./board.js";
import ComputerPlayer from "./computerPlayer.js";
import HumanPlayer from "./humanPlayer.js";
import createShips from "./index.js";
import initializeElements from "./elements.js";

export default function initializeEvents(humanPlayer, computerPlayer, currentState = 'setup') {
  let { userBoardEl, computerBoardEl, setupBtnEl, resetBtnEl, shipContainerEl, winMsgEl, loseMsgEl } = initializeElements();
  addEventListeners();
  _emptyHumanPlayerBoard();

  function addEventListeners() {
    resetBtnEl.addEventListener('click', resetGame);
    computerBoardEl.addEventListener('click', squareClickHanlder);
    shipContainerEl.addEventListener('dragstart', dragStartHandler);
    userBoardEl.addEventListener('dragover', dragoverHandler);
    userBoardEl.addEventListener('drop', dropHandler);
  }

  function resetGame() {
    if (currentState == 'playing') {
      createShips();
      shipContainerEl = document.querySelector('#ships-container');
      _resetBoard(computerPlayer, ' ');
      _resetBoard(humanPlayer, '-');
      _hideGameOverMsg();
      humanPlayer = new HumanPlayer(new Board());
      computerPlayer = new ComputerPlayer(new Board());
      computerBoardEl.addEventListener('click', squareClickHanlder);
      computerBoardEl.addEventListener('drop', dropHandler);
      computerBoardEl.addEventListener('dragover', dragoverHandler);
      shipContainerEl.addEventListener('dragstart', dragStartHandler);
      _emptyHumanPlayerBoard();
      currentState = 'setup';
    }
  }

  function squareClickHanlder(e) {
    if (currentState == 'playing' && _validSquare(e)) {
      const gameOver = (_setComputerMoveUI(e))
      if (gameOver) return;
      _setUserMoveUI();
    }
  }

  function dragStartHandler(e) {
    if (currentState == 'setup') {
      const container = e.target.closest('.container');
      if (container) e.dataTransfer.setData("text/plain", container.id);
    }
  }

  function dragoverHandler(e) {
    if (currentState == 'setup') e.preventDefault();
  }

  function dropHandler(e) {
    e.preventDefault();
    if (currentState == 'setup') {
      const containerId = e.dataTransfer.getData('text');
      const container = document.getElementById(containerId);
      if (!container || !container.classList.contains('container') || !e.target.classList.contains('square')) return;
      const shipLength = container.dataset.length;
      const direction = container.dataset.direction;
      const square = e.target;
      const [row, col] = square.id.split(' ').map(n => +n);
      const valid = _placeable(row, col, direction, Number(shipLength));

      if (valid) {
        container.remove();
        _placeShip(row, col, direction, Number(shipLength));
        if (shipContainerEl.children.length == 0) {
          shipContainerEl.remove();
          computerBoardEl.removeEventListener('drop', dropHandler);
          computerBoardEl.removeEventListener('dragover', dragoverHandler);
          shipContainerEl.removeEventListener('dragstart', dragStartHandler);
          setupBtnEl.classList.add('hidden');
          resetBtnEl.classList.remove('hidden');
          currentState = 'playing';
          console.log(humanPlayer.board.grid);
          _resetBoard(humanPlayer, ' ');
        }
      }
    }
  }


  // HELPER FUNCTIONS
  function _placeShip(row, col, direction, shipLength) {
    if (direction == 'col') {
      for (let i = row; i < row + shipLength; i++) {
        document.getElementById(`${i} ${col}`).innerText = '⛴️';
        humanPlayer.board.grid[i][col] = shipLength;
      }
    } else if (direction == 'row') {
      for (let j = col; j < col + shipLength; j++) {
        document.getElementById(`${row} ${j}`).innerText = '⛴️';
        humanPlayer.board.grid[row][j] = shipLength;
      }
    }
  }

  function _placeable(row, col, direction, shipLength) {
    if (direction == 'col') {
      for (let i = row; i < row + shipLength; i++) {
        const sq = document.getElementById(`${i} ${col}`);
        if (!sq?.classList.contains('square') || sq.innerText != '') return false;
      }
      return true;
    } else if (direction == 'row') {
      for (let j = col; j < col + shipLength; j++) {
        const sq = document.getElementById(`${row} ${j}`);
        if (!sq?.classList.contains('square') || sq.innerText != '') return false;
      }
      return true;
    }
  }

  function _emptyHumanPlayerBoard() {
    for (let i = 0; i < humanPlayer.board.grid.length; i++) {
      for (let j = 0; j < humanPlayer.board.grid[i].length; j++) {
        humanPlayer.board.grid[i][j] = null;
      }
    }
  }

  function _validSquare(e) {
    return e.target.classList.contains('square') && !e.target.style.backgroundColor;
  }

  function _setComputerMoveUI(e) {
    const [row, col] = e.target.id.split('-').map(n => Number(n));
    const val = computerPlayer.board.makeHit(row, col);
    if (val) {
      e.target.style.backgroundColor = 'green';
      e.target.innerText = val;
    } else {
      e.target.style.backgroundColor = 'red';
    }
    if (computerPlayer.board.isGameOver()) {
      winMsgEl.classList.remove('hidden');
      computerBoardEl.removeEventListener('click', squareClickHanlder);
      return true;
    }
    return false;
  }

  function _setUserMoveUI() {
    const [row, col] = computerPlayer.generateRandomMove();
    const val = humanPlayer.board.makeHit(row, col);
    const squareEl = document.getElementById(`${row} ${col}`);
    if (val) {
      computerPlayer.updateUserBoard(row, col, val);
      squareEl.style.backgroundColor = 'green';
      squareEl.innerText = val;
    } else {
      squareEl.style.backgroundColor = 'red';
      computerPlayer.updateUserBoard(row, col, 0);
    }
    if (humanPlayer.board.isGameOver()) {
      loseMsgEl.classList.remove('hidden');
      computerBoardEl.removeEventListener('click', squareClickHanlder);
    }
  }

  function _resetBoard(player, separator) {
    for (let i = 0; i < player.board.grid.length; i++) {
      for (let j = 0; j < player.board.grid[0].length; j++) {
        const square = document.getElementById(`${i}${separator}${j}`);
        square.style.backgroundColor = '';
        square.innerText = '';
      }
    }
  }

  function _hideGameOverMsg() {
    winMsgEl.classList.add('hidden');
    loseMsgEl.classList.add('hidden');
  }
}
