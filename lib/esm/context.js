import React from "react";
var PwaInstance = {
    isInstalled: undefined,
    install: function () {
        window.location.reload();
    },
    supports: false,
};
export var PwaCtx = React.createContext(PwaInstance);
export var usePwa = function () { return React.useContext(PwaCtx); };
