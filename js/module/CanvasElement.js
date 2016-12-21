export default class CanvasElement {
  constructor(opts = {}) {
    this.initialize(opts);
  }

  initialize(opts = {}) {
    this.elm = opts.elm;
  }
}
