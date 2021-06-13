"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "usePwa", {
  enumerable: true,
  get: function get() {
    return _usePwa.default;
  }
});
exports.default = void 0;

var _ReactPwa = _interopRequireDefault(require("./components/ReactPwa"));

var _usePwa = _interopRequireDefault(require("./components/ReactPwa/usePwa"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _ReactPwa.default;
exports.default = _default;