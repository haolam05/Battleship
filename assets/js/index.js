import Board from "./board.js";
import initializeEvents from './events.js';

function initializeGame() {
  let board = new Board();
  createGameOverMsg();
  createResetButton();
  createBoard(board.grid.length * board.grid[0].length);
  initializeEvents(board);
}

function createBoard(numSquares) {
  const div = document.createElement('div');
  div.setAttribute('id', 'board');
  for (let i = 0; i < numSquares; i++) {
    const [row, col] = [Math.floor(i / 9), i % 9];
    const square = document.createElement('div');
    square.classList.add('square');
    square.setAttribute('id', `${row} ${col}`)
    div.appendChild(square);
  }
  document.body.appendChild(div);
}

function createGameOverMsg() {
  const p = document.createElement('p');
  p.setAttribute('id', 'gameOverMsg');
  p.classList.add('hidden');
  p.innerText = 'YOU WIN!';
  document.body.appendChild(p);
}

function createResetButton() {
  const btn = document.createElement('button');
  btn.innerText = 'Reset Game';
  btn.setAttribute('id', 'reset-btn');
  document.body.appendChild(btn);
}

window.onload = initializeGame;
