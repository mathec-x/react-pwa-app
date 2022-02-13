import { useCallback, useEffect, useState } from "react";
import { isLocalhost, register } from "./sw.config";
import { PromptInstallInterface, ReactPwaProps } from "./types";

export default function useRegistration(props: ReactPwaProps): any {
  const [registration, setRegistration] = useState<ServiceWorkerRegistration>();
  const [promptInstall, setPromptInstall] = useState<PromptInstallInterface>();
  const [isInstalled, setIsInstalled] = useState<"web" | "standalone" | "none">();
  const [supports, setSupports] = useState<Boolean>();
  const [done, setDone] = useState(false);

  useEffect(() => {
    const handler = () => {
      let debounce: any;
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
        .finally(() => {
          if (debounce) clearTimeout(debounce);
          debounce = setTimeout(() => {
            setDone(true);
          }, 355);
        })
    }
    if (window && (!isLocalhost() || props.test)) {
      handler();
    }
  }, []);

  useEffect(() => {

    const checkSupport = (e: PromptInstallInterface) => {
      setPromptInstall(e);

      // if(e?.prompt){
      //   setPromptInstall(e);
      // } else {
      //   setSupports(false);
      // }
    }

    const appInstalled = () => {
      setDone(true);
      setSupports(true);
      setIsInstalled("standalone");
    }

    if (typeof window !== undefined && registration) {
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
