import '../styles/output.scss';

const Ship = require('./ship');
const Gameboard = require('./gameboard');
const Player = require('./player');

const gameboardX = 10;
const gameboardY = 10;

const playerGB = new Gameboard(gameboardX, gameboardY);
playerGB.createUI();

const player = new Player('Player', true);

const aiGB = new Gameboard();
aiGB.createUI();

const ai = new Player('AI', false);

const createBoard = () => {
  const playerBoard = document.querySelector('.playerBoard');
  playerBoard.style.gridTemplateColumns = `repeat(${gameboardY}, 1fr)`;
  playerBoard.style.gridTemplateRows = `repeat(${gameboardX}), 1fr`;

  for (let i = 0; i < gameboardX * gameboardY; i += 1) {
    const div = document.createElement('div');
    div.className = 'cell';
    playerBoard.insertAdjacentElement('beforeend', div);
  }

  const aiBoard = document.querySelector('.aiBoard');
  aiBoard.style.gridTemplateColumns = `repeat(${gameboardY}, 1fr)`;
  aiBoard.style.gridTemplateRows = `repeat(${gameboardX}), 1fr`;

  for (let i = 0; i < gameboardX * gameboardY; i += 1) {
    const div = document.createElement('div');
    div.className = 'cell';
    aiBoard.insertAdjacentElement('beforeend', div);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const playerCells = document.querySelectorAll('.playerBoard .cell');

  playerCells.forEach((cell, index) => {
    const row = Math.floor(index / 10);
    const col = index % 10;
    cell.dataset.row = row;
    cell.dataset.col = col;
  });

  playerCells.forEach((cell) => {
    cell.addEventListener('click', () => {
      const row = parseInt(cell.dataset.row, 10);
      const col = parseInt(cell.dataset.col, 10);

      console.log(cell);

      const ship = new Ship(3);
      playerGB.placeShipHorizontal(ship, row, col);

      for (let i = col; i < col + ship.length; i += 1) {
        const cell2 = document.querySelector(
          `.playerBoard .cell[data-row="${row}"][data-col="${i}"]`
        );
        cell2.classList.add('ship');
      }
      console.log(playerGB.ui);
    });
  });
});

createBoard();

console.log(playerGB);
console.log(aiGB);
