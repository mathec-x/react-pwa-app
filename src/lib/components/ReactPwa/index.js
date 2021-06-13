import React from 'react';
import * as serviceWorker from './sw.config';

/**
 * -------------------------------------------
 *  se for mexer use jsdocs ou migre para .ts
 * -------------------------------------------
 */

/**
 * @type {import('react').Context<[isInstalled: "web"|"standalone", promptInstall: function, supportsPwa: boolean]>}
 */
export const PwaCtx = React.createContext();

const usePWA = () => {

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
    const [promptInstall, setPromptInstall] = React.useState({});

    /**@type {[string: "web"|"standalone", React.Dispatch<React.SetStateAction<"web"|"standalone">> ]} */
    const [isInstalled, setIsInstalled] = React.useState("web");

    const [supportsPWA, setSupportsPWA] = React.useState(false);

    React.useEffect(() => {

        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then((reg) => {
                setSupportsPWA(true);

                if (window.matchMedia('(display-mode: standalone)').matches) {
                    setIsInstalled('standalone');
                }
            });
        }
        
        window.addEventListener("beforeinstallprompt", handler);
        window.addEventListener('appinstalled', checker);
        
        return () => {
            window.removeEventListener("transitionend", handler);   
            window.removeEventListener("beforeinstallprompt", handler);
        }        

    }, []);

    function handler(e) {
        e.preventDefault();

        console.log('handler', e);
        setSupportsPWA(true);
        setPromptInstall(e);
    };

    function checker(e) {
        setIsInstalled('standalone');
    }

    /**
     * 
     * @param {Event} evt 
     */
    async function onClickInstall(evt) {
        evt.preventDefault();

        try {

            await promptInstall.prompt();

        } catch (error) {

            console.error('[catch promptInstall]', {error});

        }
    };


    return [isInstalled, onClickInstall, supportsPWA];
};

/**
 * @description Default Function Component
 * @type {import('react').FC<{
 *      test: boolean,
 *      config: {
 *          swUrl: string,
 *          onUpdate: (registration: ServiceWorkerRegistration) => void,
 *          onSuccess: (registration: ServiceWorkerRegistration) => void
 *      }
 * }>}  
 */
const ReactPwa = (props) => {

    React.useEffect(() => {

        if (!serviceWorker.isLocalhost || props.test) {
            serviceWorker.register(props.config);
        }

    }, [props]);

    const value = usePWA();

    return (
        <PwaCtx.Provider value={value} children={props.children} />
    )
}

export default ReactPwa;