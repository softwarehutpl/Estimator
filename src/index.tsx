import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ReduxProvider from "./store/ReduxProvider";
import { BrowserRouter } from "react-router-dom";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
