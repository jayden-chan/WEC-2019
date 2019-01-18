class Board {

  /**
   * @param {Integer} size The size of the board
   */
  constructor(size) {
    this.size = size;
    this.basins = Math.sqrt(size);
    this.board = [][];

    for (let i = 0; i < this.size; i++) {
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
    for (let i = 0; i < this.basins; i++) {
      let x = Math.floor((Math.random() * 10));
      let y = Math.floor((Math.random() * 10));

      if (this.board[x][y] === 1) {
        i--;
        continue;
      } else {
        this.board[x][y] = 1;
      }
    }
  }
}
