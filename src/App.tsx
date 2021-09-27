import React from 'react';
import Nav from './components/Navigaton/Nav';
import Home from './views/Home/Home';
import Project from './views/Project/Project';
import Export from './components/Export/Export';
import NotFound404 from './views/NotFound404/NotFound404';
import { Route, Switch } from 'react-router-dom';
import RootStore from './store/interface/RootStore';

function App() {
  //TODO change nav to be in one place
  return (
    <div>
      <Switch>
<<<<<<< HEAD
        <Route exact path="/">
          <Nav />
          <Home />
        </Route>
        <Route path="/project/:projectId">
=======
        <Route exact path='/'>
          <Nav />
          <Home />
        </Route>
        <Route path='/project/:projectId'>
>>>>>>> 952693c9039ea67bfce8bc7c4fd023d580fceb1e
          <Nav />
          <Project />
        </Route>
        <Route path='/root'>
          <RootStore />
        </Route>
<<<<<<< HEAD
        <Route path="/export">
          <Nav />
          <Export />
        </Route>
        <Route path="*">
=======
        <Route path='/export'>
          <Nav />
          <Export />
        </Route>
        <Route path='*'>
>>>>>>> 952693c9039ea67bfce8bc7c4fd023d580fceb1e
          <Nav />
          <NotFound404 />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
