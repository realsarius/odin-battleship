class Player {
  constructor(name = 'Player', turn = true) {
    this.name = name;
    this.turn = turn;
  }

  computerMove(board, x, y) {
    console.log(x);
    console.log(y);
    console.log(board.ui[x][y]);
    board.ui[x][y] = 'missed';
    this.turn = false;
  }

  isTurn() {
    return this.turn;
  }
}

module.exports = Player;
