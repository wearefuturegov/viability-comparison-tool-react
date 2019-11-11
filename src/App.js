import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';

import Header from './components/Header';

import Home from './components/pages/Home';
import ViabilityAppraisal from './components/pages/ViabilityAppraisal';

class App extends Component {
  render() {

    const NotFound = ({ location }) => (
      <div>
        <h2>No match for <code>{location.pathname}</code></h2>
      </div>
    )

    return(
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/viability_appraisals/:id" exact component={ViabilityAppraisal}></Route>

          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
