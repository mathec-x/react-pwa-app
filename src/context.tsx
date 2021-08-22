import React from "react";
import { PwaContextInterface } from "./types";

const PwaInstance: PwaContextInterface = [undefined, () => void 0, false];

export const PwaCtx = React.createContext<PwaContextInterface>(PwaInstance);
export const usePwa = () => React.useContext(PwaCtx);