"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unregister = exports.register = exports.isLocalhost = void 0;
exports.isLocalhost = Boolean(window.location.hostname === "localhost" ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === "[::1]" ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));
var register = function (config) {
    if (config === void 0) { config = { swUrl: "/service-worker.js" }; }
    return new Promise(function (resolve, reject) {
        if ("serviceWorker" in navigator) {
            if (exports.isLocalhost) {
                // This is running on localhost. Let's check if a service worker still exists or not.
                checkValidServiceWorker(config).then(function () {
                    navigator.serviceWorker.ready.then(function (registration) {
                        resolve(registration);
                    });
                });
            }
            else {
                registerValidSW(config).then(function (registration) {
                    return resolve(registration);
                });
            }
        }
        return reject();
    });
};
exports.register = register;
var registerValidSW = function (config) { return __awaiter(void 0, void 0, void 0, function () {
    var registration_1, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, navigator.serviceWorker.register(config.swUrl)];
            case 1:
                registration_1 = _a.sent();
                registration_1.onupdatefound = function () {
                    var installingWorker = registration_1.installing;
                    if (installingWorker == null) {
                        return false;
                    }
                    installingWorker.onstatechange = function () {
                        if (installingWorker.state === "installed") {
                            if (navigator.serviceWorker.controller) {
                                // Execute callback
                                // sw will only work if the user closes the tab and opens it again
                                // my sugestion: redirect to a url with loading animation and timeout, then come back here again
                                if (config && config.onUpdate) {
                                    config.onUpdate(registration_1);
                                }
                            }
                            else {
                                // At this point, everything has been precached.
                                // It's the perfect time to display a
                                // "Content is cached for offline use." message.
                                // configure your callback
                                if (config && config.onSuccess) {
                                    config.onSuccess(registration_1);
                                }
                            }
                        }
                    };
                    return registration_1;
                };
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                if (config && config.onError)
                    config.onError();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var checkValidServiceWorker = function (config) { return __awaiter(void 0, void 0, void 0, function () {
    var response, contentType, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, fetch(config.swUrl, {
                        headers: { "Service-Worker": "script" },
                    })];
            case 1:
                response = _a.sent();
                contentType = response.headers.get("content-type");
                if (response.status === 404 ||
                    (contentType != null && contentType.indexOf("javascript") === -1)) {
                    // No service worker found. Probably a different app. Reload the page.
                    navigator.serviceWorker.ready.then(function (registration) {
                        registration.unregister().then(function () {
                            window.location.reload();
                            return false;
                        });
                    });
                }
                else {
                    // Service worker found. Proceed as normal.
                    registerValidSW(config).then(function () {
                        return true;
                    });
                }
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                // Page is offline.
                if (config && config.onOffline)
                    config.onOffline();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
function unregister() {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.ready
            .then(function (registration) {
            registration.unregister();
        })
            .catch(function (error) {
            console.error(error.message);
        });
    }
}
exports.unregister = unregister;
