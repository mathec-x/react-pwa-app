import { ConfigProps } from "./types";

export const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === "[::1]" ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export const register = (
  config: ConfigProps = { swUrl: "/service-worker.js" }
) =>
  new Promise((resolve, reject) => {
    if ("serviceWorker" in navigator) {
      if (isLocalhost) {
        // This is running on localhost. Let's check if a service worker still exists or not.
        checkValidServiceWorker(config).then(() => {
          navigator.serviceWorker.ready.then((registration) => {
            resolve(registration);
          });
        });
      } else {
        registerValidSW(config).then((registration) => {
          return resolve(registration);
        });
      }
    }

    return reject();
  });

const registerValidSW = async (config: ConfigProps) => {
  try {
    const registration = await navigator.serviceWorker.register(config.swUrl);

    registration.onupdatefound = () => {
      const installingWorker = registration.installing;

      if (installingWorker == null) {
        return false;
      }

      installingWorker.onstatechange = () => {
        if (installingWorker.state === "installed") {
          if (navigator.serviceWorker.controller) {
            // Execute callback
            // sw will only work if the user closes the tab and opens it again
            // my sugestion: redirect to a url with loading animation and timeout, then come back here again
            if (config && config.onUpdate) {
              config.onUpdate(registration);
            }
          } else {
            // At this point, everything has been precached.
            // It's the perfect time to display a
            // "Content is cached for offline use." message.
            // configure your callback
            if (config && config.onSuccess) {
              config.onSuccess(registration);
            }
          }
        }
      };

      return registration;
    };
  } catch (error) {
    if (config && config.onError) config.onError();
  }
  ///promisse end
};

const checkValidServiceWorker = async (config: ConfigProps) => {
  // Check if the service worker can be found. If it can't reload the page.
  try {
    const response = await fetch(config.swUrl, {
      headers: { "Service-Worker": "script" },
    });
    // Ensure service worker exists, and that we really are getting a JS file.
    const contentType = response.headers.get("content-type");
    if (
      response.status === 404 ||
      (contentType != null && contentType.indexOf("javascript") === -1)
    ) {
      // No service worker found. Probably a different app. Reload the page.
      navigator.serviceWorker.ready.then((registration) => {
        registration.unregister().then(() => {
          window.location.reload();
          return false;
        });
      });
    } else {
      // Service worker found. Proceed as normal.
      registerValidSW(config).then(() => {
        return true;
      });
    }
  } catch (e) {
    // Page is offline.
    if (config && config.onOffline) config.onOffline();
  }
};

export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}
