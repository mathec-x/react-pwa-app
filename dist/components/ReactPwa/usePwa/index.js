"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireDefault(require("react"));

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const usePwa = () => {
  const [isInstalled, installApp, supportsPWA] = _react.default.useContext(_.PwaCtx);

  return {
    isInstalled,
    installApp,
    supportsPWA
  };
};

var _default = usePwa;
exports.default = _default;