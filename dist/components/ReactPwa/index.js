"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PwaCtx = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.promise.js");

var _react = _interopRequireDefault(require("react"));

var serviceWorker = _interopRequireWildcard(require("./sw.config"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * -------------------------------------------
 *  se for mexer use jsdocs ou migre para .ts
 * -------------------------------------------
 */

/**
 * @type {import('react').Context<[isInstalled: "web"|"standalone", promptInstall: function, supportsPwa: boolean]>}
 */
const PwaCtx = /*#__PURE__*/_react.default.createContext();

exports.PwaCtx = PwaCtx;

const usePWA = () => {
  /**
   * @type {[ Event & { 
   *      prompt(): Promise<void> ,
   *      readonly userChoice: Promise<{
   *          outcome: 'accepted' | 'dismissed',
   *          platform: string
   *      }>;
   *  }, React.Dispatch<React.SetStateAction<{}>>],
   * } 
   */
  const [promptInstall, setPromptInstall] = _react.default.useState({});
  /**@type {[string: "web"|"standalone", React.Dispatch<React.SetStateAction<"web"|"standalone">> ]} */


  const [isInstalled, setIsInstalled] = _react.default.useState("web");

  const [supportsPWA, setSupportsPWA] = _react.default.useState(false);

  _react.default.useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(reg => {
        setSupportsPWA(true);

        if (window.matchMedia('(display-mode: standalone)').matches) {
          setIsInstalled('standalone');
        }
      });
    }

    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener('appinstalled', checker);
    return () => {
      window.removeEventListener("transitionend", handler);
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  function handler(e) {
    e.preventDefault();
    console.log('handler', e);
    setSupportsPWA(true);
    setPromptInstall(e);
  }

  ;

  function checker(e) {
    setIsInstalled('standalone');
  }
  /**
   * 
   * @param {Event} evt 
   */


  async function onClickInstall(evt) {
    evt.preventDefault();

    try {
      await promptInstall.prompt();
    } catch (error) {
      console.error('[catch promptInstall]', {
        error
      });
    }
  }

  ;
  return [isInstalled, onClickInstall, supportsPWA];
};
/**
 * @description Default Function Component
 * @type {import('react').FC<{
 *      test: boolean,
 *      config: {
 *          swUrl: string,
 *          onUpdate: (registration: ServiceWorkerRegistration) => void,
 *          onSuccess: (registration: ServiceWorkerRegistration) => void
 *      }
 * }>}  
 */


const ReactPwa = props => {
  _react.default.useEffect(() => {
    if (!serviceWorker.isLocalhost || props.test) {
      serviceWorker.register(props.config);
    }
  }, [props]);

  const value = usePWA();
  return /*#__PURE__*/_react.default.createElement(PwaCtx.Provider, {
    value: value,
    children: props.children
  });
};

var _default = ReactPwa;
exports.default = _default;