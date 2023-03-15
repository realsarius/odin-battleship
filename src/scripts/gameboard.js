const Ship = require('./ship');

class Gameboard {
  constructor(_x = 10, _y = 10) {
    this.x = _x;
    this.y = _y;
    this.ui = [];
  }

  createUI() {
    for (let i = 0; i < this.x; i += 1) {
      this.ui[i] = [];
      for (let j = 0; j < this.y; j += 1) {
        this.ui[i][j] = j + 1 + i * this.y;
      }
    }
  }

  placeShipHorizontal(ship, x, y) {
    const checkBoard = this.checkBoardHorizontal(ship.length, x, y);
    if (checkBoard) {
      for (let i = y; i < ship.length + y; i += 1) {
        this.ui[x][i] = ship;
      }
    }
  }

  placeShipVertical(ship, x, y) {
    const checkBoard = this.checkBoardVertical(ship.length, x, y);
    if (checkBoard) {
      for (let i = x; i < ship.length + x; i += 1) {
        this.ui[i][y] = ship;
      }
    }
  }

  checkBoardVertical(shipLength, x, y) {
    try {
      for (let i = x; i < shipLength + x; i += 1) {
        if (typeof this.ui[i][y] !== 'number') {
          return false;
        }
      }
      return true;
    } catch {
      console.log('array overload or ship exist');
      return false;
    }
  }

  checkBoardHorizontal(shipLength, x, y) {
    try {
      for (let i = y; i < shipLength + y; i += 1) {
        if (typeof this.ui[x][i] !== 'number') {
          return false;
        }
      }
      return true;
    } catch {
      console.log('array overload or ship exist');
      return false;
    }
  }
}

const gb = new Gameboard();
gb.createUI();
console.log(gb);

const ship = new Ship(4);
gb.placeShipVertical(ship, 7, 5);
const ship2 = new Ship(4);
gb.placeShipHorizontal(ship2, 0, 9);

// const ship2 = new Ship(3);
// gb.placeShipVertical(ship2, 3, 1);

console.log(gb);

module.exports = Gameboard;
