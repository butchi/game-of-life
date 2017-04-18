import Neighbor from './Neighbor';

export default class Cell {
  constructor(opts = {}) {
    this.initialize(opts);
  }

  initialize(opts  = {}) {
    this.value = Math.floor(Math.random() * 2);
    this.prev = null;

    this.neighbor = new Neighbor();
  }

  next() {
    let neighbor = this.neighbor;
    let count = 0;

    [
      -4, -3, -2,
      -1,      1,
       2,  3,  4
    ].forEach((i) => {
      count += neighbor[i].prev;
    });

    if(this.prev === 0) {
      if(count === 3) {
        this.value = 1;
      }
    } else {
      if(count === 2 || count === 3) {
        this.value = this.prev;
      } else {
        this.value = 0;
      }
    }
  }
}
