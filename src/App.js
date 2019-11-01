import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';

import Home from './components/pages/Home';


class App extends Component {
  render() {

    const NotFound = ({ location }) => (
      <div>
        <h2>No match for <code>{location.pathname}</code></h2>
      </div>
    )

    return(
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />

          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
