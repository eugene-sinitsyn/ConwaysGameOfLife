import { Point } from './point';

export class Generation {
  public constructor(source: string | Generation) {
    switch (typeof source) {
      case 'string': this.initFromString(source as string); break;
      case 'object': this.initFromPrevious(source as Generation); break;
      default: throw new Error(`Couldn't create next generation`);
    }
  }

  private cells: boolean[][];

  public get size(): Point {
    return new Point(this.cells.length, this.cells[0].length);
  }

  public cell(point: Point): boolean {
    return this.cells[point.x] ? !!this.cells[point.x][point.y] : false;
  }

  private initFromString(config: string): void {
    this.cells = new Array(config.indexOf('\n'));
    const rows = config.split('\n');
    const size = new Point(rows[0].length, rows.length);

    for (let x = 0; x < size.x; x++) {
      this.cells[x] = new Array(size.y);
      for (let y = 0; y < size.y; y++)
        this.cells[x][y] = !!rows[y][x] && rows[y][x] !== ' ';
    }
  }

  private initFromPrevious(previous: Generation): void {
    this.cells = new Array(previous.size.x);
    for(let x = 0; x < previous.size.x; x++) {    // +-----X
      this.cells[x] = new Array(previous.size.y); // |
      for (let y = 0; y < previous.size.y; y++) { // |
        const cellsAliveNearby: number = [        // Y
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