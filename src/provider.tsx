import React, { useState, useEffect, FC } from "react";
import { PwaCtx } from "./context";
import * as serviceWorker from "./sw.config";
import { PromptInstallInterface, ReactPwaProps, UsePwaInterface } from "./types";

const CreatePWA = (registration : ServiceWorkerRegistration|undefined) : UsePwaInterface => {
    const [promptInstall, setPromptInstall] = useState<PromptInstallInterface>();

    const [isInstalled, setIsInstalled] = useState<"web" | "standalone" | undefined>();
    const [supports, setSupports] = useState(false);
  
    const onClickInstall = (evt?: Event) : void => {
      try {
        if (evt && evt.preventDefault) {
          evt.preventDefault();
        }  
        promptInstall?.prompt();
      } catch (error) {
        console.error("[catch promptInstall]", { error });
      }
    }
  
    React.useEffect(() => {
      if ("serviceWorker" in navigator && registration ) {

        setSupports(true);

        window.addEventListener("beforeinstallprompt", (e: PromptInstallInterface) => {
            setPromptInstall(e)
        });

        }

    }, [registration]);
  
    React.useEffect(() => {
      if (window) {
        if (window.matchMedia("(display-mode: standalone)").matches)
          setIsInstalled("standalone");
        window.addEventListener("appinstalled", () =>
          setIsInstalled("standalone")
        );
      }
    }, []);
  
    return {
      install: onClickInstall, 
      supports,
      isInstalled 
    };
  };


export const ReactPwa : FC<ReactPwaProps> = (props) => {
  const [registration, setRegistration] = useState<ServiceWorkerRegistration|undefined>();

  useEffect(() => {
    if (!serviceWorker.isLocalhost || props.test) {
      serviceWorker.register(props.config).then((e: ServiceWorkerRegistration) => setRegistration(e));
    }
  }, [props]);

  return <PwaCtx.Provider value={CreatePWA(registration)} children={props.children} />;
};


export default ReactPwa;
