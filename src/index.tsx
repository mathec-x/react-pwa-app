import React, { createContext, useContext } from "react";
import { ReactPwaProps, UsePwaInterface } from "./types";
import useRegistration from "./provider";

export { register, unregister } from "./sw.config";
export const PwaContext = createContext<UsePwaInterface>({});
export const usePwa = () => useContext(PwaContext);

const ReactPwa: React.FC<ReactPwaProps> = (props) => {
  const { done, ...registration } = useRegistration(props);

  return (
    <PwaContext.Provider value={registration}>
      {!done && props.suspense ? props.suspense : props.children}
    </PwaContext.Provider>
  );
};

export default React.memo(ReactPwa);
