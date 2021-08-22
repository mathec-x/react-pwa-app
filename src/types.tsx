import { FC } from "react";

export declare const usePwa: () => {
  isInstalled: "web" | "standalone";
  installApp(): void;
  supportsPWA: boolean;
};

export interface ConfigProps {
  swUrl: string;
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onError?: () => void;
  onOffline?: () => void;
}

export type PwaContextInterface = [
  isInstalled: "web" | "standalone" | undefined,
  promptInstall: (evt?: Event) => void,
  supportsPwa: boolean
];

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: String[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: String;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}
export type PromptInstallInterface = BeforeInstallPromptEvent | undefined;

export interface ReactPwaProps {
  test?: boolean;
  config: ConfigProps;
}

export declare const ReactPwa: FC<ReactPwaProps>;
