import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import './App.scss';

import Home from './components/pages/Home';
import ViabilityAppraisal from './components/pages/ViabilityAppraisal';
import MyList from './components/pages/MyList';

class App extends React.Component {
  render() {

    const NotFound = ({ location }) => (
      <div>
        <h2>No match for <code>{location.pathname}</code></h2>
      </div>
    )

    return(
      <Router>
        <QueryParamProvider ReactRouterRoute={Route}>

          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/viability_appraisals/:id" exact component={ViabilityAppraisal}></Route>
            <Route path="/comparison-list/" exact component={MyList}></Route>

            <Route component={NotFound} />
          </Switch>
        </QueryParamProvider>
      </Router>
    );
  }
}

export default App;
