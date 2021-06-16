export const isLocalhost = Boolean(!process.env.NODE_ENV || process.env.NODE_ENV === 'development');

/**
 * @param {{swUrl: string, onUpdate: function, onSuccess: function}} config 
 */
export const register = (config = {}) => new Promise(function (resolve, reject) {

    if ('serviceWorker' in navigator) {

        if (!config.swUrl) { config.swUrl = '/service-worker.js'; }

        // The URL constructor is available in all browsers that support SW.
        const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
        if (publicUrl.origin !== window.location.origin) {
            // Our service worker won't work if PUBLIC_URL is on a different origin
            // from what our page is served on. This might happen if a CDN is used to
            // serve assets; see https://github.com/facebook/create-react-app/issues/2374
            return reject();
        }

        if (isLocalhost) {
            // This is running on localhost. Let's check if a service worker still exists or not.
            checkValidServiceWorker(config).then(() => {
                navigator.serviceWorker.ready.then((registration) => {
                    resolve(registration);
                });
            });

        } else {
            // Is not localhost. Just register service worker
            registerValidSW(config).then(e => {

                resolve(e);
            });
        }
    }
});

const registerValidSW = async (config) => {

    try {

        const registration = await navigator.serviceWorker.register(config.swUrl);

        registration.onupdatefound = () => {

            const installingWorker = registration.installing;

            if (installingWorker == null) {
                return false;
            }

            installingWorker.onstatechange = () => {

                if (installingWorker.state === 'installed') {

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
        if(config && config.onError) config.onError();
    }
    ///promisse end
}

const checkValidServiceWorker = async (config) => {
    // Check if the service worker can be found. If it can't reload the page.
    try {
        const response = await fetch(config.swUrl, { headers: { 'Service-Worker': 'script' } });
        // Ensure service worker exists, and that we really are getting a JS file.
        const contentType = response.headers.get('content-type');
        if (response.status === 404 ||
            (contentType != null && contentType.indexOf('javascript') === -1)) {
            // No service worker found. Probably a different app. Reload the page.
            navigator.serviceWorker.ready.then(registration => {
                registration.unregister().then(() => {
                    window.location.reload();
                    return false;
                });
            });
        } else {
            // Service worker found. Proceed as normal.
            registerValidSW(config).then(e => {
                return true;
            });
        };

    } catch (e) {
        // Page is offline.
        if(config && config.onOffline) config.onOffline();
    }
}

export function unregister() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready
            .then(registration => { registration.unregister() })
            .catch(error => { console.error(error.message) });
    }
}
