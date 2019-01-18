const Board = require('./board.js');

const board = new Board(16);
console.log(board);
board.genBasins();
console.log(board);