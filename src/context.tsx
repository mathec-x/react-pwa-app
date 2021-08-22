import React from "react";
import { UsePwaInterface } from "./types";

const PwaInstance: UsePwaInterface =  {
    isInstalled: undefined,
    install: () => {
        window.location.reload()
    },
    supports: false,
};

export const PwaCtx = React.createContext<UsePwaInterface>(PwaInstance);
export const usePwa = () => React.useContext(PwaCtx);