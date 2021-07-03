import { Context, FC } from "react";

export const usePwa: () => {
    isInstalled: "web" | "standalone";
    installApp(): void;
    supportsPWA: boolean
}

export const PwaCtx: Context<[isInstalled: "web" | "standalone", promptInstall: Function, supportsPwa: boolean]>;

export interface ReactPwaProps {
    test: boolean;
    config: {
        swUrl: string;
        onUpdate: (registration: ServiceWorkerRegistration) => void
        onSuccess: (registration: ServiceWorkerRegistration) => void;
        onError: () => void;
        onOffline: () => void;
    }
}

declare const ReactPwa: FC<ReactPwaProps>


export default ReactPwa;