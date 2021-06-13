"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = register;
exports.unregister = unregister;
exports.isLocalhost = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/web.url.js");

require("core-js/modules/es.promise.js");

const isLocalhost = Boolean(!process.env.NODE_ENV || process.env.NODE_ENV === 'development');
/**
 * @param {{swUrl: string, onUpdate: function, onSuccess: function}} config 
 */

exports.isLocalhost = isLocalhost;

function register(config) {
  if ('serviceWorker' in navigator) {
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);

    if (publicUrl.origin !== window.location.origin) {
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebook/create-react-app/issues/2374
      return;
    }

    if (isLocalhost) {
      // This is running on localhost. Let's check if a service worker still exists or not.
      checkValidServiceWorker(config); // Add some additional logging to localhost, pointing developers to the
      // service worker/PWA documentation.

      navigator.serviceWorker.ready.then(registration => {// console.info('This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA');
      });
    } else {
      // Is not localhost. Just register service worker
      registerValidSW(config);
    }
  }
}

function registerValidSW(config) {
  if (!config.swUrl) console.log('[<ReactPwa config={{ swUrl: "your public folder must have the file service.worker.js" }} />]');
  navigator.serviceWorker.register(config.swUrl).then(registration => {
    registration.onupdatefound = () => {
      const installingWorker = registration.installing;

      if (installingWorker == null) {
        return;
      }

      installingWorker.onstatechange = () => {
        if (installingWorker.state === 'installed') {
          if (navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage('installed'); // Execute callback
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
    };
  }).catch(error => {
    console.error('Error during service worker registration:', error);
  });
}

function checkValidServiceWorker(config) {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(config.swUrl, {
    headers: {
      'Service-Worker': 'script'
    }
  }).then(response => {
    // Ensure service worker exists, and that we really are getting a JS file.
    const contentType = response.headers.get('content-type');

    if (response.status === 404 || contentType != null && contentType.indexOf('javascript') === -1) {
      // No service worker found. Probably a different app. Reload the page.
      navigator.serviceWorker.ready.then(registration => {
        registration.unregister().then(() => {
          window.location.reload();
        });
      });
    } else {
      // Service worker found. Proceed as normal.
      registerValidSW(config);
    }
  }).catch(() => {
    console.log('No internet connection found. App is running in offline mode.');
  });
}

function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    }).catch(error => {
      console.error(error.message);
    });
  }
}