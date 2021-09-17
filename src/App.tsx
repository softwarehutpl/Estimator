import React from "react";
import Actions from "./store/Actions";
import Nav from "./components/Navigaton/Nav";
import Home from "./views/Home/Home";
import Project from "./views/Project/Project";
import NotFound404 from "./views/NotFound404/NotFound404";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      <Nav />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/project">
          <Project />
        </Route>
        <Route path="/root">
          <Actions />
        </Route>
        <Route path="*">
          <NotFound404 />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
