class Board {

  /**
   * @param {Integer} size The size of the board
   */
  constructor(size) {
    this.size = (size < 3) ? 3 : size;
    this.numBasins = Math.floor(Math.sqrt(size));
    this.board = [];
    this.basins = [];

    for (let i = 0; i < this.size; i++) {
      this.board[i] = [];
      this.basins[i] = [];
      for (let j = 0; j < this.size; j++) {
        this.board[i][j] = 0;
      }
    }
  }

  /**
   * @return {Integer} The size of the board
   */
  getSize() {
    return this.size;
  }

  /**
   * Randomly distributes the basins around the board
   */
  genBasins() {
    for (let i = 0; i < this.numBasins; i++) {
      let x = Math.floor((Math.random() * 10));
      let y = Math.floor((Math.random() * 10));

      if (this.board[x][y] === 1) {
        i--;
        continue;
      } else {
        this.board[x][y] = 1;
      }
    }

    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        this.basins[i][j] = this.adjacentBasins(i, j);
      }
    }
  }

  /**
   * @return {Integer} The number of adjacent basins to the given point
   */
  adjacentBasins(x, y) {
    const up = (y === 0) ? 0 : this.board[x][y-1];
    const down = (y === this.size-1) ? 0 : this.board[x][y+1];
    const left = (x === 0) ? 0 : this.board[x-1][y];
    const right = (x === this.size-1) ? 0 : this.board[x+1][y];

    return up + down + left + right;
  }

  /**
   * @return {Boolean} Whether or not a point is a basin
   */
  click(x, y) {
    return this.board[x][y] === 0;
  }
}

module.exports = Board;
