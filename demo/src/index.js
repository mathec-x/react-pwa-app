import React from 'react'
import {render} from 'react-dom'

import ReactPwa, { usePwa } from '../../lib';

const App = () => {
  const pwa = usePwa();

  return (<>
    <p>pwa.isInstalled: <b>{pwa.isInstalled}</b></p>
    <p>pwa.supportsPWA: <b>{pwa.supportsPWA ? "Sim" : "Não"}</b></p>

    <button onClick={pwa.installApp}>install app</button>
  </>
  )
}

render(
  <ReactPwa test config={{
    swUrl: "/service-worker.js",
    onUpdate: (reg) => {
      alert('sw updated');
      console.log('onUpdatedCallBack', reg);
    },
    onSuccess: (reg) => {
      // console.log('onSuccessCallback', reg);
    }
  }}>
    <App />
  </ReactPwa>, document.getElementById('demo'));