import React, { Component } from 'react';
import './App.css';
import EventDetails from './containers/eventDetails';
import EventsList from './containers/eventsList';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import LoginPage from './login/LoginPage';
import LogoutPage from './logout/LogoutPage';
import SignupPage from './signup/SignupPage';
import ticketDetails from './containers/ticketDetails';

class App extends Component {
  render() {
    return (
      <Router>
      <div>
        <Route exact path="/login" component={LoginPage}/>
        <Route exact path="/logout" component={LogoutPage}/>
        <Route exact path="/signup" component={SignupPage}/>
        <Route exact path="/events" component={EventsList}/>
        <Route exact path="/events/:id" component={EventDetails}/>
        <Route exact path="/tickets/:id" component={ticketDetails}/>
        <Route exact path="/" render={ () => <Redirect to="/events" /> } />
      </div>
      </Router>
    );
  }
}

export default App;
