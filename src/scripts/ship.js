class Ship {
  constructor(_length, _hitTimes = 0, _sunk = false) {
    this.length = _length;
    this.hitTimes = _hitTimes;
    this.sunk = _sunk;
  }

  hit() {
    this.hitTimes += 1;
    if (this.hitTimes >= this.length) this.sunk = true;
    console.log(this.hitTimes);
  }

  isSunk = () => this.sunk;
}

module.exports = Ship;
