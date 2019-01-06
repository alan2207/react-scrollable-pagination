import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Home from './Home';
import Fixed from './FixedExample';
import WindowScrollable from './WindowScrollableExample';
import Item from './Item';
import Nav from './Nav';

const App = () => (
  <Router>
    <div className="App">
      <Nav />
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/fixed" component={Fixed} />
          <Route path="/window-scrollable" component={WindowScrollable} />
          <Route path="/item/:id" component={Item} />
          <Route component={() => <div>404</div>} />
        </Switch>
      </div>
    </div>
  </Router>
);

export default App;
