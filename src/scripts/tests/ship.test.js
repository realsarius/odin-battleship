const Ship = require('../ship');

describe('Ship functions', () => {
  test('Ship length to be 4', () => {
    const newShip = new Ship(4);
    expect(newShip.length).toBe(4);
  });

  test('Ship to take hits', () => {
    const newShip = new Ship(4);
    newShip.hit();
    newShip.hit();
    expect(newShip.hitTimes).toBe(2);
  });

  test('Ship to be able to sunk', () => {
    const length = 4;
    const newShip = new Ship(length);
    for (let i = 1; i <= length; i += 1) {
      newShip.hit();
    }
    expect(newShip.isSunk()).toBe(true);
    expect(newShip.isSunk()).toBeTruthy();
  });
});
