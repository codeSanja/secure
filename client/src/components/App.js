// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Jumbotron from './Jumbotron';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jumbotronTitle: 'List of courses'
    };
  }

  goTo(route) {
    this.props.history.replace(`/${route}`);
  }

  login() {
    return this.props.auth.login();
  }

  logout() {
    return this.props.auth.logout();
  }

  render() {
    const { jumbotronTitle } = this.state;
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
          {
              !isAuthenticated() && (
                  <div>
                      <div className="header">
                          <ul className="nav nav-pills pull-right">
                              <li className="btn btn-primary" onClick={this.login().bind(this)}>Log in</li>
                          </ul>
                          <h3 className="text-muted">Securing React</h3>
                      </div>
                      <Jumbotron title={jumbotronTitle}/>
                  </div>
              )
          }

          {
              isAuthenticated() && (
                  <div>
                      <div className="header">
                          <ul className="nav nav-pills pull-right">
                              <li><a onClick={this.goTo.bind(this, 'feed')}>Home</a></li>
                              <li><Link to="/about">About</Link></li>
                              <li><Link to="/contact">Contact</Link></li>
                              <li className="btn btn-primary" onClick={this.logout()}>Log out</li>
                          </ul>
                          <h3 className="text-muted">Securing React</h3>
                      </div>
                      <Jumbotron title={jumbotronTitle}/>
                  </div>
              )
          }
      </div>
    );
  }
}

export default App;
