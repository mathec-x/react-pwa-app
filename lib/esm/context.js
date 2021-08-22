import React from "react";
var PwaInstance = [undefined, function () { return void 0; }, false];
export var PwaCtx = React.createContext(PwaInstance);
export var usePwa = function () { return React.useContext(PwaCtx); };
