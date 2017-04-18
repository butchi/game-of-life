import Cell from '../module/Cell';

export default class CellArr {
  constructor(opts = {}) {
    this.initialize(opts);
  }

  initialize(opts  = {}) {
    let width = this.width = opts.width;
    let height = this.height = opts.height;

    for(let y = 0; y < height; y++) {
      this[y] = new Array(width);
      for(let x = 0; x < width; x++) {
        this[y][x] = new Cell();
      }
    }

    this.setNeighbor();
  }

  setNeighbor() {
    let width = this.width;
    let height = this.height;

    for(let y = 0; y < height; y++) {
      for(let x = 0; x < width; x++) {
        let cell = this[y][x];

        cell.neighbor[-4] = this[(y + height - 1) % height][(x + width - 1) % width]
        cell.neighbor[-3] = this[(y + height - 1) % height][(x + width) % width]
        cell.neighbor[-2] = this[(y + height - 1) % height][(x + width + 1) % width]
        cell.neighbor[-1] = this[(y + height) % height][(x + width - 1) % width]
        cell.neighbor[ 0] = this[(y + height) % height][(x + width) % width]
        cell.neighbor[ 1] = this[(y + height) % height][(x + width + 1) % width]
        cell.neighbor[ 2] = this[(y + height + 1) % height][(x + width - 1) % width]
        cell.neighbor[ 3] = this[(y + height + 1) % height][(x + width) % width]
        cell.neighbor[ 4] = this[(y + height + 1) % height][(x + width + 1) % width]
      }
    }
  }

  next() {
    let width = this.width;
    let height = this.height;

    for(let y = 0; y < height; y++) {
      for(let x = 0; x < width; x++) {
        let cell = this[y][x];

        cell.prev = cell.value;
      }
    }

    for(let y = 0; y < height; y++) {
      for(let x = 0; x < width; x++) {
        let cell = this[y][x];

        cell.next();
      }
    }
  }
}
