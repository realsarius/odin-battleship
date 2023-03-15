// import '../styles/output.scss';

const Ship = require('./ship');
const Gameboard = require('./gameboard');

const gb = new Gameboard();
gb.createUI();

const ship = new Ship(4);
gb.placeShipVertical(ship, 2, 3);
const ship2 = new Ship(4);
gb.placeShipHorizontal(ship2, 0, 2);

gb.recieveAttack(0, 0);
gb.recieveAttack(0, 2);
gb.recieveAttack(0, 3);
gb.recieveAttack(0, 4);
gb.recieveAttack(0, 5);

// const ship2 = new Ship(3);
// gb.placeShipVertical(ship2, 3, 1);

console.log(gb);
gb.report();

console.log('Hello, World!');
