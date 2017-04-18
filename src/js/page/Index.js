import ns from '../module/ns';
import Canvas from '../module/Canvas';
import CellArr from '../module/CellArr';

const CELL_WIDTH = 256;
const CELL_HEIGHT = 256;

const INTERVAL = 50;

export default class Index {
  constructor(opts = {}) {
    console.log('Hello, world!');

    this.initialize();

    console.log('Thanks, world!');
  }

  initialize() {
    $(() => {
      const width = CELL_WIDTH;
      const height = CELL_HEIGHT;

      const stageElm = document.querySelector('[data-js-id="stage"]');

      const canvasElm = document.createElement('canvas');

      stageElm.appendChild(canvasElm);

      this.canvas = new Canvas({
        elm: canvasElm,
        width,
        height,
      });

      let cellArr = this.cellArr = new CellArr({
        width: CELL_WIDTH,
        height: CELL_HEIGHT,
      });

      setInterval(() => {
        cellArr.next();
        this.display();
      }, INTERVAL);
    });
  }

  display() {
    // let str = '';

    let cellArr = this.cellArr;

    let canvas = this.canvas;
    let ctx = canvas.ctx;
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    let data = imageData.data;

    let i = 0;

    for(let y = 0; y < cellArr.height; y++) {
      for(let x = 0; x < cellArr.width; x++) {
        let cell = cellArr[y][x];
        // str += `${cell.value} `;

        data[i] = data[i + 1] = data[i + 2]
          = 255 - cell.value * 255;

        data[i + 3] = 255;

        i += 4;
      }

      // str += '\n';
    }

    ctx.putImageData(imageData, 0, 0);

    // console.log(str);
  }
}
