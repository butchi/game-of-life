'use strict';

export default class Main {
  constructor(opts = {}) {
    console.log('Hello, world!');

    this.initialize();

    console.log('Thanks, world!');
  }

  initialize() {
    $(() => {

      const wrapperElm = document.querySelector('.wrapper');

      const canvasElm = document.createElement('canvas');
      canvasElm.width = 256;
      canvasElm.height = 256;

      console.log(wrapperElm);

      wrapperElm.appendChild(canvasElm);

      let ctx = canvasElm.getContext('2d');

      ctx.beginPath();
      ctx.moveTo(20, 20);
      ctx.lineTo(120, 20);
      ctx.lineTo(120, 120);
      ctx.lineTo(20, 120);
      ctx.closePath();
      ctx.stroke();

    });
  }
}
