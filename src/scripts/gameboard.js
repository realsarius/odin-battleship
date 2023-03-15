class Gameboard {
  constructor(_x = 10, _y = 10) {
    this.x = _x;
    this.y = _y;
    this.ui = [];
    this.missedShots = [];
  }

  createUI() {
    for (let i = 0; i < this.x; i += 1) {
      this.ui[i] = [];
      this.missedShots[i] = [];
      for (let j = 0; j < this.y; j += 1) {
        this.ui[i][j] = j + 1 + i * this.y;
        this.missedShots[i][j] = j + 1 + i * this.y;
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

  recieveAttack(x, y) {
    if (x <= this.x && y <= this.y) {
      if (typeof this.ui[x][y] === 'object') {
        console.log(`Hit: x: ${x} y: ${y}`);
        this.ui[x][y].hit();
        if (this.ui[x][y].isSunk()) {
          console.log('Ship has sunk');
        }
      } else {
        this.missedShots[x][y] = 'missed';
        console.log(this.missedShots);
        console.log('missed');
      }
    } else {
      console.log('out of boundaries');
    }
  }

  report() {
    for (let i = 0; i < this.x; i += 1) {
      for (let j = 0; j < this.y; j += 1) {
        console.log(`${i}, ${j}`);
        if (typeof this.ui[i][j] === 'object') {
          if (this.ui[i][j].isSunk()) {
            console.log('The ship has sunk');
          }
        }
      }
    }
  }
}

module.exports = Gameboard;
