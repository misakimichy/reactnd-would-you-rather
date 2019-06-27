import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import Dashboard from './Dashboard';
import LeaderBoard from './LeaderBoard';
import Login from './Login';
import NewQuestion from './NewQuestion';
import QuestionDetail from './QuestionDetail';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <Router>
        <Fragment>
          <div className='container'>
          {this.props.loggedOut === true
            ? <Route component={Login} />
            : <div>
                <Route path='/' exact component={Dashboard} />
                <Route path='/login' component={Login} />
                <Route path='/questions/:id' component={QuestionDetail} />
                <Route path='/add' component={NewQuestion} />
                <Route path='/leaderboard' component={LeaderBoard} />
            </div>
          }
        </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    loggedOut: authedUser === null
  };
}

export default connect(mapStateToProps)(App);
