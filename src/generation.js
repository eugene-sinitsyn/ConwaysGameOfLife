const Point = require('./point');

module.exports = class Generation {
  /** @param {(string|Generation)} source */
  constructor(source) {
    /** @private
      * @type {booleal[][]} */
    this.cells = null;

    switch (typeof source) {
      case 'string': this.initFromString(source); break;
      case 'object': this.initFromPrevious(source); break;
      default: throw new Error(`Couldn't create next generation`);
    }
  }

  /** @type {Point} size */
  get size() {
    return new Point(this.cells.length, this.cells[0].length);
  }

  /** @param {Point} point
    * @returns {boolean} */
  cell(point) {
    return this.cells[point.x] ? !!this.cells[point.x][point.y] : false;
  }

  /** @private
    * @param {string} config */
  initFromString(config) {
    this.cells = new Array(config.indexOf('\r\n'));
    const rows = config.split('\r\n');
    const size = new Point(rows[0].length, rows.length);

    for (let x = 0; x < size.x; x++) {
      this.cells[x] = new Array(size.y);
      for (let y = 0; y < size.y; y++)
        this.cells[x][y] = !!rows[y][x] && rows[y][x] !== ' ';
    }
  }

  /** @private
    * @param {Generation} previous */
  initFromPrevious(previous) {
    this.cells = new Array(previous.size.x);
    for(let x = 0; x < previous.size.x; x++) {    // +-----X
      this.cells[x] = new Array(previous.size.y); // |
      for (let y = 0; y < previous.size.y; y++) { // |
        const cellsAliveNearby = [                // Y
          new Point(x - 1, y - 1), new Point(x, y - 1), new Point(x + 1, y - 1),
          new Point(x - 1, y), /*    current cell    */ new Point(x + 1, y),
          new Point(x - 1, y + 1), new Point(x, y + 1), new Point(x + 1, y + 1)
        ].filter(p => previous.cell(p)).length;
        if (previous.cell(new Point(x, y))) {
          this.cells[x][y] = cellsAliveNearby === 2 || cellsAliveNearby === 3
        } else this.cells[x][y] = cellsAliveNearby === 3;
      }
    }
  }
}