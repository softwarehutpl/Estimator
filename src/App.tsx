import React from "react";
import Nav from "./components/Navigaton/Nav";
import Home from "./views/Home/Home";
import DataView from "./views/DataView/DataView";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      <Nav />
      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/project">
          <DataView />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
