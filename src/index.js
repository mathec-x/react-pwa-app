import React, { createContext, useState, useEffect } from 'react';
import * as serviceWorker from './sw.config';

/**
 * @type {import('react').FC<{
 *    test?: boolean;
 *    config: {
 *        swUrl: string;
 *        onUpdate?: (registration: ServiceWorkerRegistration) => void
 *        onSuccess?: (registration: ServiceWorkerRegistration) => void;
 *        onError?: () => void;
 *        onOffline?: () => void;
 *    }
 * }>} 
 */
const ReactPwa = (props) => {
    const [reg, setReg] = useState(false);

    useEffect(() => {
        if (!serviceWorker.isLocalhost || props.test) {
            serviceWorker.register(props.config).then(e => setReg(e));
        }
    }, [props]);

    return <PwaCtx.Provider value={CreatePWA(reg)} children={props.children} />
};

/**@returns {{isInstalled: "web" | "standalone";installApp(): void;supportsPWA: boolean}} --*/
export const usePwa = () => {
    const [isInstalled, installApp, supportsPWA] = React.useContext(PwaCtx);

    return {
        isInstalled,
        installApp,
        supportsPWA
    };
};

/**@type {React.Context<[isInstalled: "web"|"standalone", promptInstall: function, supportsPwa: boolean]>} --*/ 
export const PwaCtx = createContext();

const CreatePWA = () => {

    /**
     * @type {[string: "web"|"standalone", React.Dispatch<React.SetStateAction<"web"|"standalone">> ]} 
     */
    const [isInstalled, setIsInstalled] = useState("web");

    /**
     * @type {[ Event & { 
     *      prompt(): Promise<void> ,
     *      readonly userChoice: Promise<{
     *          outcome: 'accepted' | 'dismissed',
     *          platform: string
     *      }>;
     *  }, React.Dispatch<React.SetStateAction<{}>>],
     * } 
     */
    const [promptInstall, setPromptInstall] = useState(null);
    const [supportsPWA, setSupportsPWA] = useState(false);

    /**@param {Event} evt */
    function onClickInstall(evt) {
        try {
            if (evt && evt.preventDefault) { evt.preventDefault(); }
            return promptInstall.prompt();
        } catch (error) { console.error('[catch promptInstall]', { error }); }
    };

    React.useEffect(() => {

        if ('serviceWorker' in navigator) {
            setSupportsPWA(true);
            window.addEventListener("beforeinstallprompt", setPromptInstall);

        };

    }, []);

    React.useEffect(() => {
        if (window) {
            if (window.matchMedia('(display-mode: standalone)').matches) setIsInstalled('standalone');
            window.addEventListener('appinstalled', () => setIsInstalled('standalone'));

        }
    }, []);

    return [isInstalled, onClickInstall, supportsPWA];
};

export default ReactPwa;