export default class Canvas {
  constructor(opts = {}) {
    this.initialize(opts);
  }

  initialize(opts = {}) {
    let elm = this.elm = opts.elm;

    this.width = elm.width = opts.width;
    this.height = elm.height = opts.height;

    let ctx = this.ctx = elm.getContext('2d');
  }
}
