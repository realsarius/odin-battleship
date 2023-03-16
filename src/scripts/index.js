import '../styles/output.scss';

const Ship = require('./ship');
const Gameboard = require('./gameboard');
const Player = require('./player');

const gameboardX = 10;
const gameboardY = 10;

const playerGB = new Gameboard(gameboardX, gameboardY);
playerGB.createUI();

const player = new Player('Player', true);

const aiGB = new Gameboard(gameboardX, gameboardY);
aiGB.createUI();

const ai = new Player('AI', false);

const createBoard = () => {
  const playerBoard = document.querySelector('.playerBoard');
  playerBoard.style.gridTemplateColumns = `repeat(${gameboardY}, 1fr)`;
  playerBoard.style.gridTemplateRows = `repeat(${gameboardX}), 1fr`;

  for (let i = 0; i < gameboardX * gameboardY; i += 1) {
    const div = document.createElement('div');
    div.className = 'playerCell';
    playerBoard.insertAdjacentElement('beforeend', div);
  }

  const aiBoard = document.querySelector('.aiBoard');
  aiBoard.style.gridTemplateColumns = `repeat(${gameboardY}, 1fr)`;
  aiBoard.style.gridTemplateRows = `repeat(${gameboardX}), 1fr`;

  for (let i = 0; i < gameboardX * gameboardY; i += 1) {
    const div = document.createElement('div');
    div.className = 'aiCell';
    aiBoard.insertAdjacentElement('beforeend', div);
  }
};

let fourLengthShipCount = 0;
let threeLengthShipCount = 0;
let twoLengthShipCount = 0;

document.addEventListener('DOMContentLoaded', () => {
  const playerCells = document.querySelectorAll('.playerBoard .playerCell');
  const aiCells = document.querySelectorAll('.aiBoard .aiCell');

  playerCells.forEach((playerCell, index) => {
    const row = Math.floor(index / 10);
    const col = index % 10;
    playerCell.dataset.row = row;
    playerCell.dataset.col = col;
  });

  aiCells.forEach((aiCell, index) => {
    const row = Math.floor(index / 10);
    const col = index % 10;
    aiCell.dataset.row = row;
    aiCell.dataset.col = col;
  });

  playerCells.forEach((playerCell) => {
    playerCell.addEventListener('click', () => {
      const row = parseInt(playerCell.dataset.row, 10);
      const col = parseInt(playerCell.dataset.col, 10);

      if (fourLengthShipCount < 2) {
        const ship = new Ship(4);
        playerGB.placeShipHorizontal(ship, row, col);
        for (let i = col; i < col + ship.length; i += 1) {
          const cell2 = document.querySelector(
            `.playerBoard .playerCell[data-row="${row}"][data-col="${i}"]`
          );
          cell2.classList.add('ship');
        }
        fourLengthShipCount += 1;
      } else if (threeLengthShipCount < 1) {
        const ship = new Ship(3);
        playerGB.placeShipHorizontal(ship, row, col);
        for (let i = col; i < col + ship.length; i += 1) {
          const cell2 = document.querySelector(
            `.playerBoard .playerCell[data-row="${row}"][data-col="${i}"]`
          );
          cell2.classList.add('ship');
        }
        threeLengthShipCount += 1;
      } else if (twoLengthShipCount < 1) {
        const ship = new Ship(2);
        playerGB.placeShipHorizontal(ship, row, col);
        for (let i = col; i < col + ship.length; i += 1) {
          const cell2 = document.querySelector(
            `.playerBoard .playerCell[data-row="${row}"][data-col="${i}"]`
          );
          cell2.classList.add('ship');
        }
        twoLengthShipCount += 1;
      }
    });
  });

  const placeRandomShips = () => {
    const ship1 = new Ship(4);
    const ship2 = new Ship(4);
    const ship3 = new Ship(3);
    const ship4 = new Ship(2);
    const ships = [ship1, ship2, ship3, ship4];

    ships.forEach((ship) => {
      let isShipPlaced = false;
      while (!isShipPlaced) {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        const direction = Math.floor(Math.random() * 2);

        if (direction === 0) {
          isShipPlaced = aiGB.checkBoardHorizontal(ship.length, x, y);
          if (isShipPlaced) {
            aiGB.placeShipHorizontal(ship, x, y);
            for (let i = y; i < y + ship.length; i += 1) {
              const cell = document.querySelector(
                `.aiBoard .aiCell[data-row="${x}"][data-col="${i}"]`
              );
              cell.classList.add('ship');
            }
          }
        } else {
          isShipPlaced = aiGB.checkBoardVertical(ship.length, x, y);
          if (isShipPlaced) {
            aiGB.placeShipVertical(ship, x, y);
            for (let i = x; i < x + ship.length; i += 1) {
              const cell = document.querySelector(
                `.aiBoard .aiCell[data-row="${i}"][data-col="${y}"]`
              );
              cell.classList.add('ship');
            }
          }
        }
      }
    });
  };
  placeRandomShips();
});

createBoard();

console.log(playerGB);
console.log(aiGB);
