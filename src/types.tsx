export type UsePwaInterface = {
  isInstalled?: "web" | "standalone" | "none";
  install?(evt?: Event) : void
  supports?: boolean;
  registration?: ServiceWorkerRegistration
};


export type UserChoicePrompt = {
  outcome: "accepted" | "dismissed";
  platform: String;
}
export interface ConfigProps {
  swUrl: string;
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onError?: (error: any) => any;
  onPrompt?(userChoicePrompt: UserChoicePrompt): void;
  onOffline?(): void;
}

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: String[];
  readonly userChoice: Promise<UserChoicePrompt>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}
export type PromptInstallInterface = BeforeInstallPromptEvent | undefined;

export interface ReactPwaProps {
  /**
   * - by default the manifest will not be installed in development environment
       use test to force installation in localhost
   */
  test?: boolean;
  /**
   * - a preloader to load the service worker in the application 
       is the best way to not overload with component calls.
       this ensures that the rest of the application only loads after the sw is checked
   */
  suspense?: JSX.Element;
  config: ConfigProps;
}