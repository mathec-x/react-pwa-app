"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePwa = exports.PwaCtx = void 0;
var react_1 = __importDefault(require("react"));
var PwaInstance = {
    isInstalled: undefined,
    install: function () {
        window.location.reload();
    },
    supports: false,
};
exports.PwaCtx = react_1.default.createContext(PwaInstance);
var usePwa = function () { return react_1.default.useContext(exports.PwaCtx); };
exports.usePwa = usePwa;
