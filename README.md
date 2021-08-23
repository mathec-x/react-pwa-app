# ReactPwa light e simple
## install
```bash
npm install react-pwa-app
``` 
or

```bash
yarn add react-pwa-app
``` 

- add in root index.html this line

```html
    <link rel="manifest" href="%PUBLIC_URL%/manifest.webmanifest" />
```

## manifest

- put all your icons inside /public/icons and enter them with their respective sizes in public/manifest.webmanifest

### usage:

```js
import React from "react";
import ReactDOM from "react-dom";
import { ReactPwa } from "react-pwa-app";

ReactDOM.render(
  <ReactPwa
    test //is to install in localhost, not required
    config={{
      swUrl: "/service-worker.js", // sw file in public
      onUpdate: (reg) => {
        alert("sw updated");
        console.log(reg);
      },
      onSuccess: (reg) => {
        alert("sw success installed");
        console.log(reg);
      },
    }}
  >
    <App />
  </ReactPwa>,
  document.getElementById("root")
);
```

## in your component

```js
import { usePwa } from "react-pwa-app";

const App = () => {
  const pwa = usePwa();

  return (
    <>
      <p>
        pwa.isInstalled: <b>{pwa.isInstalled}</b>
      </p>
      <p>
        pwa.supportsPWA: <b>{pwa.supports ? "Sim" : "Não"}</b>
      </p>
      <button onClick={pwa.install}>install app</button>
    </>
  );
};
```

## Some tips

1.  service worker will be generated in the public folder

2.  manifest.webmanifest will be generated in the public folder

3.  service-worker.js needs at least 3 simple configurations. addEventListener('install' | 'activate' | 'fetch' )

4.  you can add pushnotifications support using addEventListener('push' )

5.  to get started use my service-worker.js inside /public

6.  post-install.js will be generated on root folder, you can use on create-react-app

## postbuild

add script postbuild,

```json
"scripts": {
  "postbuild": "node post-build.js"
}
```

this will help you auto-generate the application build routes, and also a new cachename to update the front whenever you update the app to a new version.

```bash
yarn add -D glob
```

you need to install glob to auto generate or customize this file