import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router';
import { createBrowserHistory } from 'history';
import Example1 from './components/Example1';
import Example2 from './components/Example2';
import Example3 from './components/Example3';
import Demo from './components/Demo';

function App() {
  return (
    <Router history={createBrowserHistory()}>
      <Switch>
        <Route path="/example1" component={Example1} />
        <Route path="/example2" component={Example2} />
        <Route path="/example3" component={Example3} />
        <Route path="/demo" component={Demo} />
        <Redirect to="/example1" />
      </Switch>
    </Router>
  );
}

export default App;
