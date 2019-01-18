import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';


import Header from './components/header/header.js';
import Homepage from './components/pages/homepage.js';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Header />
          <Switch>
            <Route exact path='/' component={Homepage} />
          </Switch>
      </div>
    );
  }
}

export default App;
