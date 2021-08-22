import { FC } from "react";

export interface UsePwaInterface {
  isInstalled?: "web" | "standalone";
  install(evt?: Event): void;
  supports: boolean;
};

export interface ConfigProps {
  swUrl: string;
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onError?: () => void;
  onOffline?: () => void;
}

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
