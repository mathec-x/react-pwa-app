import React from "react";
import { PwaCtx } from "..";

const usePwa = () => {
    const [isInstalled, installApp, supportsPWA] = React.useContext(PwaCtx);

    return { isInstalled, installApp, supportsPWA};
}

export default usePwa;