import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';
import BubblePage from './components/BubblePage';

import Login from "./components/Login";
import "./styles.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <ul>
          <li>
            <Link to='/'>Login</Link>
          </li>
          <li>
            <Link to='/bubble-page'>Bubble Page</Link>
          </li>
        </ul>
        <Switch>
          <ProtectedRoute exact path='/bubble-page' component={BubblePage} />
          <Route exact path="/" component={Login} />
          <Route component={Login} />
        </Switch>
          {/* 
            Build a PrivateRoute component that will 
            display BubblePage when you're authenticated 
          */}
      </div>
    </Router>
  );
}

export default App;
