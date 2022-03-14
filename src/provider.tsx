import { useCallback, useEffect, useState } from "react";
import { register } from "./sw.config";
import { PromptInstallInterface, ReactPwaProps } from "./types";

export default function useRegistration(props: ReactPwaProps): any {
  const [registration, setRegistration] = useState<ServiceWorkerRegistration>();
  const [promptInstall, setPromptInstall] = useState<PromptInstallInterface>();
  const [isInstalled, setIsInstalled] = useState<"web" | "standalone" | "none">();
  const [supports, setSupports] = useState<Boolean>();
  const [done, setDone] = useState(false);

  let debounce: any;
  useEffect(() => {
  
    const handleFinally = () => {
      if (debounce) clearTimeout(debounce);
      debounce = setTimeout(() => {
        setDone(true);
      }, 355);
    }
    
    const handler = () => {
      register(props.config)
        .then((regis) => {
          setRegistration(regis as ServiceWorkerRegistration);
        })
        .catch((err) => {
          if (props?.config?.onError) {
            setSupports(false);
            return props.config.onError(err);
          }
        })
        .finally(handleFinally)
    }
    if (typeof window !== 'undefined') {
      handler();
    }
  }, [props]);

  useEffect(() => {

    const checkSupport = (e: PromptInstallInterface) => {
      setPromptInstall(e);
    }

    const appInstalled = () => {
      setDone(true);
      setSupports(true);
      setIsInstalled("standalone");
    }

    if (typeof window !== undefined) {
      if ("serviceWorker" in navigator) {
        setIsInstalled("none");
        setSupports(true);
        window.addEventListener("beforeinstallprompt", checkSupport);
      }

      if (window.matchMedia("(display-mode: standalone)").matches) {
        appInstalled();
      }

      window.addEventListener("appinstalled", appInstalled);
    }

    return () => {
      if (typeof window !== undefined) {
        window.removeEventListener("beforeinstallprompt", checkSupport);
        window.removeEventListener("appinstalled", appInstalled);
      }
    }
  }, [registration]);

  const onClickInstall = useCallback((evt?: Event) => {
    if (evt && evt.preventDefault) {
      evt.preventDefault();
    }

    promptInstall?.prompt()
      .then((e: any) => {
        if (props?.config?.onPrompt) {
          return props.config.onPrompt(e);
        }
      })
      .catch((e: any) => {
        if (props?.config?.onPrompt) {
          return props.config.onPrompt(e);
        }
      })

  }, [promptInstall])

  return {
    install: onClickInstall,
    supports,
    isInstalled,
    registration,
    done
  };
};
