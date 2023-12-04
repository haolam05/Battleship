import Board from "./board.js";
import ComputerPlayer from "./computerPlayer.js";
import HumanPlayer from "./humanPlayer.js";
import initializeEvents from './events.js';

function initializeGame() {
  createWinMsg();
  createLoseMsg();
  createResetButton();
  createSetupButton();
  createBoardContainer();
  createBoard(81, 'user-board', ' ');
  createBoard(81, 'computer-board', '-');
  createShips();
  initializeEvents(new HumanPlayer(new Board()), new ComputerPlayer(new Board()));
}

function createBoardContainer() {
  const div = document.createElement('div');
  div.setAttribute('id', 'board-container');
  document.body.appendChild(div);
}

function createBoard(numSquares, id, separator) {
  const div = document.createElement('div');
  div.setAttribute('id', id);
  for (let i = 0; i < numSquares; i++) {
    const [row, col] = [Math.floor(i / 9), i % 9];
    const square = document.createElement('div');
    square.classList.add('square');
    square.setAttribute('id', `${row}${separator}${col}`);
    div.appendChild(square);
  }
  const h2 = document.createElement('h2');
  h2.innerText = id.split('-').join(' ');
  div.appendChild(h2);
  document.querySelector('#board-container').appendChild(div);
}

function createWinMsg() {
  const p = document.createElement('p');
  p.setAttribute('id', 'userWinMsg');
  p.classList.add('hidden');
  p.innerText = 'YOU WIN!';
  document.body.appendChild(p);
}

function createLoseMsg() {
  const p = document.createElement('p');
  p.setAttribute('id', 'userLoseMsg');
  p.classList.add('hidden');
  p.innerText = 'YOU LOSE!';
  document.body.appendChild(p);
}

function createResetButton() {
  const btn = document.createElement('button');
  btn.innerText = 'Reset Game';
  btn.setAttribute('id', 'reset-btn');
  btn.classList.add('hidden');
  document.body.appendChild(btn);
}

function createSetupButton() {
  const btn = document.createElement('button');
  btn.innerText = 'Arrange your ships';
  btn.setAttribute('id', 'setup-btn');
  document.body.appendChild(btn);
}

export default function createShips() {
  const ships = document.createElement('div');
  ships.setAttribute('id', 'ships-container');
  let shipNo = 1;
  [2, 3, 3, 4, 5].forEach((shipLength, i) => {
    const container = document.createElement('div');
    container.classList.add('container');
    container.setAttribute('draggable', 'true');
    container.setAttribute('id', `container-${i}`);
    container.setAttribute('data-direction', i % 2 ? 'row' : 'col');
    container.setAttribute('data-length', shipLength);
    for (let j = 1; j <= shipLength; j++) {
      const ship = document.createElement('div');
      ship.innerText = '🛳️';
      ship.setAttribute('id', shipNo);
      container.appendChild(ship);
      shipNo++;
    }
    ships.appendChild(container);
  })
  document.body.appendChild(ships);
}

window.onload = initializeGame;
