import React from 'react';
import ReactDOM from 'react-dom';
import ReactPwa, { usePwa } from './lib';

const App = () => {
  const pwa = usePwa()

  return (<>
    <p>pwa.isInstalled: <b>{pwa.isInstalled}</b></p>
    <p>pwa.supportsPWA: <b>{pwa.supportsPWA ? "Sim" : "Não"}</b></p>

    <button onClick={pwa.installApp}>install app</button>
  </>
  )
}

ReactDOM.render(
  <ReactPwa test config={{
    swUrl: "/service-worker.js",
    onUpdate: (reg) => {
      alert('sw updated');
      console.log(reg);
    },
    onSuccess: (reg) => {
      alert('sw success installed');
      console.log(reg);
    }
  }}>
    <App />
  </ReactPwa>, document.getElementById('root'));