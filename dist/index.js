"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PwaCtx = exports.usePwa = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var serviceWorker = _interopRequireWildcard(require("./sw.config"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**@type {React.FC<{test: boolean;config: {  swUrl: string;  onUpdate: (registration: ServiceWorkerRegistration) => void;  onSuccess: (registration: ServiceWorkerRegistration) => void;  onError: () => void;  onOffline: () => void; }}>} --*/
const ReactPwa = props => {
  const [reg, setReg] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    if (!serviceWorker.isLocalhost || props.test) {
      serviceWorker.register(props.config).then(e => setReg(e));
    }
  }, [props]);
  return /*#__PURE__*/_react.default.createElement(PwaCtx.Provider, {
    value: CreatePWA(reg),
    children: props.children
  });
};
/**@returns {{isInstalled: "web" | "standalone";installApp(): void;supportsPWA: boolean}} --*/


const usePwa = () => {
  const [isInstalled, installApp, supportsPWA] = _react.default.useContext(PwaCtx);

  return {
    isInstalled,
    installApp,
    supportsPWA
  };
};
/**@type {React.Context<[isInstalled: "web"|"standalone", promptInstall: function, supportsPwa: boolean]>} --*/


exports.usePwa = usePwa;
const PwaCtx = /*#__PURE__*/(0, _react.createContext)();
exports.PwaCtx = PwaCtx;

const CreatePWA = () => {
  /**
   * @type {[string: "web"|"standalone", React.Dispatch<React.SetStateAction<"web"|"standalone">> ]} 
   */
  const [isInstalled, setIsInstalled] = (0, _react.useState)("web");
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

  const [promptInstall, setPromptInstall] = (0, _react.useState)(null);
  const [supportsPWA, setSupportsPWA] = (0, _react.useState)(false);
  /**@param {Event} evt */

  function onClickInstall(evt) {
    try {
      if (evt && evt.preventDefault) {
        evt.preventDefault();
      }

      return promptInstall.prompt();
    } catch (error) {
      console.error('[catch promptInstall]', {
        error
      });
    }
  }

  ;

  _react.default.useEffect(() => {
    if ('serviceWorker' in navigator) {
      setSupportsPWA(true);
      window.addEventListener("beforeinstallprompt", setPromptInstall);
      return () => {
        window.removeEventListener("beforeinstallprompt");
      };
    }

    ;
  }, []);

  _react.default.useEffect(() => {
    if (window) {
      if (window.matchMedia('(display-mode: standalone)').matches) setIsInstalled('standalone');
      window.addEventListener('appinstalled', () => setIsInstalled('standalone'));
      return () => {
        window.removeEventListener("appinstalled");
      };
    }
  }, []);

  return [isInstalled, onClickInstall, supportsPWA];
};

var _default = ReactPwa;
exports.default = _default;