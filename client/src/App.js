import React, { Component } from 'react';
import './App.css';
import AddsDetails from './containers/addsDetails';
import AddsList from './containers/addsList';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
      <div>
        <Route exact path="/adds" component={AddsList}/>
        <Route exact path="/adds/:id" component={AddsDetails}/>
        <Route exact path="/" render={ () => <Redirect to="/adds" /> } />
      </div>
      </Router>
    );
  }
}

export default App;
