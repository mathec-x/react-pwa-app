"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactPwa = void 0;
var react_1 = __importStar(require("react"));
var context_1 = require("./context");
var serviceWorker = __importStar(require("./sw.config"));
var CreatePWA = function (registration) {
    var _a = react_1.useState(), promptInstall = _a[0], setPromptInstall = _a[1];
    var _b = react_1.useState(), isInstalled = _b[0], setIsInstalled = _b[1];
    var _c = react_1.useState(false), supportsPWA = _c[0], setSupportsPWA = _c[1];
    var onClickInstall = function (evt) {
        try {
            if (evt && evt.preventDefault) {
                evt.preventDefault();
            }
            promptInstall === null || promptInstall === void 0 ? void 0 : promptInstall.prompt();
        }
        catch (error) {
            console.error("[catch promptInstall]", { error: error });
        }
    };
    react_1.default.useEffect(function () {
        if ("serviceWorker" in navigator && registration) {
            setSupportsPWA(true);
            window.addEventListener("beforeinstallprompt", function (e) {
                setPromptInstall(e);
            });
        }
    }, [registration]);
    react_1.default.useEffect(function () {
        if (window) {
            if (window.matchMedia("(display-mode: standalone)").matches)
                setIsInstalled("standalone");
            window.addEventListener("appinstalled", function () {
                return setIsInstalled("standalone");
            });
        }
    }, []);
    return [
        isInstalled,
        onClickInstall,
        supportsPWA
    ];
};
var ReactPwa = function (props) {
    var _a = react_1.useState(), registration = _a[0], setRegistration = _a[1];
    react_1.useEffect(function () {
        if (!serviceWorker.isLocalhost || props.test) {
            serviceWorker.register(props.config).then(function (e) { return setRegistration(e); });
        }
    }, [props]);
    return react_1.default.createElement(context_1.PwaCtx.Provider, { value: CreatePWA(registration), children: props.children });
};
exports.ReactPwa = ReactPwa;
exports.default = exports.ReactPwa;
