# ReactPwa light e simple

### usage:
```
import  React  from  'react';
import  ReactDOM  from  'react-dom';
import  ReactPwa from  'react-pwa';

ReactDOM.render(
	<ReactPwa 
		test //is to install in localhost, not required
		config={{
			swUrl: "/service-worker.js", // sw file in public
			onUpdate: (reg) => {
				alert('sw updated');
				console.log(reg);
			},
			onSuccess: (reg) => {
				alert('sw success installed');
				console.log(reg);
			}
		}}>
	<App  />

</ReactPwa>, document.getElementById('root'));
```

## in your component 
```
import { usePwa } from  'react-pwa';

const App = () => {
	const  pwa = usePwa()

	return (
	<>
		<p>pwa.isInstalled: <b>{pwa.isInstalled}</b></p>
		<p>pwa.supportsPWA: <b>{pwa.supportsPWA ? "Sim" : "Não"}</b></p>
		<button  onClick={pwa.installApp}>install app</button>
	</>
	)
}
```

## Some tips

 1. you need a service worker in the public folder
 2. you need a manifest.webmanifest in the public folder
 3. service-worker.js needs at least 3 simple configurations. addEventListener('install' | 'activate' | 'fetch' )
 4. you can add pushnotifications support using addEventListener('push' )
 5. to get started use my service-worker.js inside /public



