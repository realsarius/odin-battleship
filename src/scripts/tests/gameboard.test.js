/* eslint-disable @typescript-eslint/no-var-requires */
const Gameboard = require('../gameboard');
const Ship = require('../ship');

test('Should create a gameboard (default: 10 x 10)', () => {
  const gb = new Gameboard();
  gb.createUI();
  expect(gb.ui).toEqual([
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    [31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
    [41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
    [51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
    [61, 62, 63, 64, 65, 66, 67, 68, 69, 70],
    [71, 72, 73, 74, 75, 76, 77, 78, 79, 80],
    [81, 82, 83, 84, 85, 86, 87, 88, 89, 90],
    [91, 92, 93, 94, 95, 96, 97, 98, 99, 100],
  ]);
});

describe('Can place ships', () => {
  test('Should place 2 length ship horizontally', () => {
    const gb = new Gameboard();
    gb.createUI();
    const ship = new Ship(2);
    gb.placeShipHorizontal(ship, 0, 0);
    expect(gb.ui).toEqual([
      [ship, ship, 3, 4, 5, 6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
      [31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
      [41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
      [51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
      [61, 62, 63, 64, 65, 66, 67, 68, 69, 70],
      [71, 72, 73, 74, 75, 76, 77, 78, 79, 80],
      [81, 82, 83, 84, 85, 86, 87, 88, 89, 90],
      [91, 92, 93, 94, 95, 96, 97, 98, 99, 100],
    ]);
  });

  test('Should place 4 length ship vertically', () => {
    const gb = new Gameboard();
    gb.createUI();
    const ship = new Ship(4);
    gb.placeShipVertical(ship, 3, 5);
    expect(gb.ui).toEqual([
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
      [31, 32, 33, 34, 35, ship, 37, 38, 39, 40],
      [41, 42, 43, 44, 45, ship, 47, 48, 49, 50],
      [51, 52, 53, 54, 55, ship, 57, 58, 59, 60],
      [61, 62, 63, 64, 65, ship, 67, 68, 69, 70],
      [71, 72, 73, 74, 75, 76, 77, 78, 79, 80],
      [81, 82, 83, 84, 85, 86, 87, 88, 89, 90],
      [91, 92, 93, 94, 95, 96, 97, 98, 99, 100],
    ]);
  });

  test("Shouldn't place a ship if the ship is on the outside of the borders", () => {
    const gb = new Gameboard();
    gb.createUI();
    const ship = new Ship(4);
    gb.placeShipVertical(ship, 7, 5);
    const ship2 = new Ship(4);
    gb.placeShipHorizontal(ship2, 0, 7);
    expect(gb.ui).toEqual([
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
      [31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
      [41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
      [51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
      [61, 62, 63, 64, 65, 66, 67, 68, 69, 70],
      [71, 72, 73, 74, 75, 76, 77, 78, 79, 80],
      [81, 82, 83, 84, 85, 86, 87, 88, 89, 90],
      [91, 92, 93, 94, 95, 96, 97, 98, 99, 100],
    ]);
  });
});

describe('Recieving shots', () => {
  test('Should test if the attack is missed ( 0 x 0 )', () => {
    const gb = new Gameboard(6, 6);
    gb.createUI();
    const ship = new Ship(4);
    gb.placeShipVertical(ship, 2, 2);
    gb.recieveAttack(0, 0);
    expect(gb.missedShots).toEqual([
      ['missed', 2, 3, 4, 5, 6],
      [7, 8, 9, 10, 11, 12],
      [13, 14, 15, 16, 17, 18],
      [19, 20, 21, 22, 23, 24],
      [25, 26, 27, 28, 29, 30],
      [31, 32, 33, 34, 35, 36],
    ]);
  });

  test('Should test if the attack is missed ( 5 x 5 )', () => {
    const gb = new Gameboard(6, 6);
    gb.createUI();
    const ship = new Ship(4);
    gb.placeShipVertical(ship, 2, 2);
    gb.recieveAttack(5, 5);
    expect(gb.missedShots).toEqual([
      [1, 2, 3, 4, 5, 6],
      [7, 8, 9, 10, 11, 12],
      [13, 14, 15, 16, 17, 18],
      [19, 20, 21, 22, 23, 24],
      [25, 26, 27, 28, 29, 30],
      [31, 32, 33, 34, 35, 'missed'],
    ]);
  });
});
