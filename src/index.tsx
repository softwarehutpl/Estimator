import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "reduxjs-toolkit-persist/integration/react";
import { persistor } from "./store/store";

import ReduxProvider from "./store/ReduxProvider";

import App from "./App";

import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primeflex/primeflex.css";
import "./index.scss";

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
