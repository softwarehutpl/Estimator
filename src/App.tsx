<<<<<<< HEAD
import React from 'react';
import Nav from './components/Navigaton/Nav';
import Home from './views/Home/Home';
import Project from './views/Project/Project';
import Export from './components/Export/Export';
import NotFound404 from './views/NotFound404/NotFound404';
import { Route, Switch } from 'react-router-dom';
import RootStore from './store/interface/RootStore';
import Import from './components/Import/Import';
=======
import React from "react";
import Nav from "./components/Navigaton/Nav";
import Home from "./views/Home/Home";
import Project from "./views/Project/Project";
import Export from "./components/Export/Export";
import NotFound404 from "./views/NotFound404/NotFound404";
import { Route, Switch } from "react-router-dom";
import RootStore from "./store/interface/RootStore";
>>>>>>> b7f312c7ebaf1d74f9906e5389f35a3990847b45

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Nav />
          <Home />
        </Route>

        <Route exact path="/">
          <Nav />
          <Home />
        </Route>
        <Route path="/project/:projectId">
          <Nav />
          <Project />
        </Route>
        <Route path="/root">
          <RootStore />
        </Route>

        <Route path="/export">
          <Nav />
          <Export />
        </Route>

        <Route path="/export">
          <Nav />
          <Export />
        </Route>
<<<<<<< HEAD
        <Route path='/import'>
          <Nav />
          <Import />
        </Route>
        <Route path='*'>
=======
        <Route path="*">
>>>>>>> b7f312c7ebaf1d74f9906e5389f35a3990847b45
          <Nav />
          <NotFound404 />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
