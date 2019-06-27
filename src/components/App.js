import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import Dashboard from './Dashboard';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <div>
        {this.props.loggedIn === true
          ? null
          : <Dashboard />
        }
      </div>
    );
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    loggedIn: authedUser === null
  }
}

export default connect()(App);
