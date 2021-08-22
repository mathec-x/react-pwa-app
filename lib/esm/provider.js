import React, { useState, useEffect } from "react";
import { PwaCtx } from "./context";
import * as serviceWorker from "./sw.config";
var CreatePWA = function (registration) {
    var _a = useState(), promptInstall = _a[0], setPromptInstall = _a[1];
    var _b = useState(), isInstalled = _b[0], setIsInstalled = _b[1];
    var _c = useState(false), supports = _c[0], setSupports = _c[1];
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
    React.useEffect(function () {
        if ("serviceWorker" in navigator && registration) {
            setSupports(true);
            window.addEventListener("beforeinstallprompt", function (e) {
                setPromptInstall(e);
            });
        }
    }, [registration]);
    React.useEffect(function () {
        if (window) {
            if (window.matchMedia("(display-mode: standalone)").matches)
                setIsInstalled("standalone");
            window.addEventListener("appinstalled", function () {
                return setIsInstalled("standalone");
            });
        }
    }, []);
    return {
        install: onClickInstall,
        supports: supports,
        isInstalled: isInstalled
    };
};
export var ReactPwa = function (props) {
    var _a = useState(), registration = _a[0], setRegistration = _a[1];
    useEffect(function () {
        if (!serviceWorker.isLocalhost || props.test) {
            serviceWorker.register(props.config).then(function (e) { return setRegistration(e); });
        }
    }, [props]);
    return React.createElement(PwaCtx.Provider, { value: CreatePWA(registration), children: props.children });
};
export default ReactPwa;
