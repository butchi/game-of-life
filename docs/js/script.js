(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Canvas = function () {
  function Canvas() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Canvas);

    this.initialize(opts);
  }

  _createClass(Canvas, [{
    key: 'initialize',
    value: function initialize() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var elm = this.elm = opts.elm;

      this.width = elm.width = opts.width;
      this.height = elm.height = opts.height;

      var ctx = this.ctx = elm.getContext('2d');
    }
  }]);

  return Canvas;
}();

exports.default = Canvas;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Neighbor = require('./Neighbor');

var _Neighbor2 = _interopRequireDefault(_Neighbor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cell = function () {
  function Cell() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Cell);

    this.initialize(opts);
  }

  _createClass(Cell, [{
    key: 'initialize',
    value: function initialize() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.value = Math.floor(Math.random() * 2);
      this.prev = null;

      this.neighbor = new _Neighbor2.default();
    }
  }, {
    key: 'next',
    value: function next() {
      var neighbor = this.neighbor;
      var count = 0;

      [-4, -3, -2, -1, 1, 2, 3, 4].forEach(function (i) {
        count += neighbor[i].prev;
      });

      if (this.prev === 0) {
        if (count === 3) {
          this.value = 1;
        }
      } else {
        if (count === 2 || count === 3) {
          this.value = this.prev;
        } else {
          this.value = 0;
        }
      }
    }
  }]);

  return Cell;
}();

exports.default = Cell;

},{"./Neighbor":5}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Cell = require('../module/Cell');

var _Cell2 = _interopRequireDefault(_Cell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CellArr = function () {
  function CellArr() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, CellArr);

    this.initialize(opts);
  }

  _createClass(CellArr, [{
    key: 'initialize',
    value: function initialize() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var width = this.width = opts.width;
      var height = this.height = opts.height;

      for (var y = 0; y < height; y++) {
        this[y] = new Array(width);
        for (var x = 0; x < width; x++) {
          this[y][x] = new _Cell2.default();
        }
      }

      this.setNeighbor();
    }
  }, {
    key: 'setNeighbor',
    value: function setNeighbor() {
      var width = this.width;
      var height = this.height;

      for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
          var cell = this[y][x];

          cell.neighbor[-4] = this[(y + height - 1) % height][(x + width - 1) % width];
          cell.neighbor[-3] = this[(y + height - 1) % height][(x + width) % width];
          cell.neighbor[-2] = this[(y + height - 1) % height][(x + width + 1) % width];
          cell.neighbor[-1] = this[(y + height) % height][(x + width - 1) % width];
          cell.neighbor[0] = this[(y + height) % height][(x + width) % width];
          cell.neighbor[1] = this[(y + height) % height][(x + width + 1) % width];
          cell.neighbor[2] = this[(y + height + 1) % height][(x + width - 1) % width];
          cell.neighbor[3] = this[(y + height + 1) % height][(x + width) % width];
          cell.neighbor[4] = this[(y + height + 1) % height][(x + width + 1) % width];
        }
      }
    }
  }, {
    key: 'next',
    value: function next() {
      var width = this.width;
      var height = this.height;

      for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
          var cell = this[y][x];

          cell.prev = cell.value;
        }
      }

      for (var _y = 0; _y < height; _y++) {
        for (var _x3 = 0; _x3 < width; _x3++) {
          var _cell = this[_y][_x3];

          _cell.next();
        }
      }
    }
  }]);

  return CellArr;
}();

exports.default = CellArr;

},{"../module/Cell":2}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Router = require('./Router');

var _Router2 = _interopRequireDefault(_Router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Main = function () {
  function Main() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Main);

    console.log('Hello, world!');

    this.initialize();

    console.log('Thanks, world!');
  }

  _createClass(Main, [{
    key: 'initialize',
    value: function initialize() {
      var _this = this;

      $(function () {
        _this.router = new _Router2.default();
      });
    }
  }]);

  return Main;
}();

exports.default = Main;

},{"./Router":6}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Neighbor = function () {
  function Neighbor() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Neighbor);

    this.initialize(opts);
  }

  _createClass(Neighbor, [{
    key: "initialize",
    value: function initialize() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    }
  }]);

  return Neighbor;
}();

exports.default = Neighbor;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ns = require('./ns');

var _ns2 = _interopRequireDefault(_ns);

var _Common = require('../page/Common');

var _Common2 = _interopRequireDefault(_Common);

var _Index = require('../page/Index');

var _Index2 = _interopRequireDefault(_Index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Router = function () {
  function Router() {
    _classCallCheck(this, Router);

    this.initialize();
  }

  _createClass(Router, [{
    key: 'initialize',
    value: function initialize() {
      var $body = $('body');

      this.pageCommon = new _Common2.default();

      if ($body.hasClass('page-index')) {
        this.pageIndex = new _Index2.default();
      }
    }
  }]);

  return Router;
}();

exports.default = Router;

},{"../page/Common":8,"../page/Index":9,"./ns":7}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 * グローバル直下に変数を置かないよう、ネームスペースを切る。
 * ネームスペース以下の変数にアクセスしたいときは各クラスでこれをimportする
 */

window.App = window.App || {};
var ns = window.App;
exports.default = ns;

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ns = require('../module/ns');

var _ns2 = _interopRequireDefault(_ns);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Common = function () {
  function Common() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Common);

    this.initialize();
  }

  _createClass(Common, [{
    key: 'initialize',
    value: function initialize() {
      console.log('page common');

      this.setEnvClass();
    }
  }, {
    key: 'setEnvClass',
    value: function setEnvClass() {
      var $html = $('html');

      _ns2.default.isSp = false;
      _ns2.default.isPc = false;
      _ns2.default.isTab = false;

      if ($html.hasClass('is-sp')) {
        _ns2.default.isSp = true;
      }
      if ($html.hasClass('is-pc')) {
        _ns2.default.isPc = true;
      }
      if ($html.hasClass('is-tab')) {
        _ns2.default.isTab = true;
      }
    }
  }]);

  return Common;
}();

exports.default = Common;

},{"../module/ns":7}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ns = require('../module/ns');

var _ns2 = _interopRequireDefault(_ns);

var _Canvas = require('../module/Canvas');

var _Canvas2 = _interopRequireDefault(_Canvas);

var _CellArr = require('../module/CellArr');

var _CellArr2 = _interopRequireDefault(_CellArr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CELL_WIDTH = 256;
var CELL_HEIGHT = 256;

var INTERVAL = 50;

var Index = function () {
  function Index() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Index);

    console.log('Hello, world!');

    this.initialize();

    console.log('Thanks, world!');
  }

  _createClass(Index, [{
    key: 'initialize',
    value: function initialize() {
      var _this = this;

      $(function () {
        var width = CELL_WIDTH;
        var height = CELL_HEIGHT;

        var stageElm = document.querySelector('[data-js-id="stage"]');

        var canvasElm = document.createElement('canvas');

        stageElm.appendChild(canvasElm);

        _this.canvas = new _Canvas2.default({
          elm: canvasElm,
          width: width,
          height: height
        });

        var cellArr = _this.cellArr = new _CellArr2.default({
          width: CELL_WIDTH,
          height: CELL_HEIGHT
        });

        setInterval(function () {
          cellArr.next();
          _this.display();
        }, INTERVAL);
      });
    }
  }, {
    key: 'display',
    value: function display() {
      // let str = '';

      var cellArr = this.cellArr;

      var canvas = this.canvas;
      var ctx = canvas.ctx;
      var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      var data = imageData.data;

      var i = 0;

      for (var y = 0; y < cellArr.height; y++) {
        for (var x = 0; x < cellArr.width; x++) {
          var cell = cellArr[y][x];
          // str += `${cell.value} `;

          data[i] = data[i + 1] = data[i + 2] = 255 - cell.value * 255;

          data[i + 3] = 255;

          i += 4;
        }

        // str += '\n';
      }

      ctx.putImageData(imageData, 0, 0);

      // console.log(str);
    }
  }]);

  return Index;
}();

exports.default = Index;

},{"../module/Canvas":1,"../module/CellArr":3,"../module/ns":7}],10:[function(require,module,exports){
'use strict';

var _ns = require('./module/ns');

var _ns2 = _interopRequireDefault(_ns);

var _Main = require('./module/Main');

var _Main2 = _interopRequireDefault(_Main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// エントリーポイント。indexからはライブラリとこれしか呼ばない

_ns2.default.main = new _Main2.default();

},{"./module/Main":4,"./module/ns":7}]},{},[10]);
