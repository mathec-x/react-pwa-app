import React, { createContext, useState, useEffect } from 'react';
import * as serviceWorker from './sw.config';
/**
 * -------------------------------------------
 *  se for mexer use jsdocs ou migre para .ts
 * -------------------------------------------
 */

//#region internal
/**@type {React.FC<>} */
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

    function handler(event) {
        event.preventDefault();
        console.log('handler');
        setPromptInstall(event);
    };


    React.useEffect(() => {

        if ('serviceWorker' in navigator) {
            setSupportsPWA(true);
            window.addEventListener("beforeinstallprompt", setPromptInstall);
            return () => { window.removeEventListener("beforeinstallprompt", handler); }
        };

    }, []);

    React.useEffect(() => {
        if (window) {
            if (window.matchMedia('(display-mode: standalone)').matches) setIsInstalled('standalone');
            window.addEventListener('appinstalled', () => setIsInstalled('standalone'));
            return () => { window.removeEventListener("appinstalled", handler); }
        }
    }, []);

    return [isInstalled, onClickInstall, supportsPWA];
};
//#endregion internal

//#region hook
/**
 * @type {() => {
 *  isInstalled: "web" | "standalone";
 *  installApp(): void;
 *  supportsPWA: boolean;
 * }} 
*/
export const usePwa = () => {
    const [isInstalled, installApp, supportsPWA] = React.useContext(PwaCtx);

    return { isInstalled, installApp, supportsPWA };
}

/**
 * @type {React.Context<[isInstalled: "web"|"standalone", promptInstall: function, supportsPwa: boolean]>}
 */
export const PwaCtx = createContext();
//#endregion hook

//#region Component
/**
 * @type {React.FC<{
    * test: boolean;
    * config: {
    *   swUrl: string;
    *   onUpdate: (registration: ServiceWorkerRegistration) => void;
    *   onSuccess: (registration: ServiceWorkerRegistration) => void;
    *   onError: () => void;
    *   onOffline: () => void;
    *  };
 * }>}
 */
const ReactPwa = (props) => {
    const [reg, setReg] = useState(false);

    useEffect(() => {
        console.log('ReactPwa');

        if (!serviceWorker.isLocalhost || props.test) {
            serviceWorker.register(props.config).then(e => setReg(e));
        }

    }, [props]);

    return <PwaCtx.Provider value={CreatePWA(reg)} children={props.children} />
}
//#endregion Component

export default ReactPwa;