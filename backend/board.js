class Board {

  /**
   * @param {Integer} size The size of the board
   */
  constructor(size) {
    this.size = size;
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

  genBasins() {
    const numBasins = Math.sqrt(this.size);
  }
}
