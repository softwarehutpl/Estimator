import React, { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import store from "./store";

const ReduxProvider = (props: PropsWithChildren<{}>) => {
  return <Provider store={store}>{props.children}</Provider>;
};

export default ReduxProvider;
