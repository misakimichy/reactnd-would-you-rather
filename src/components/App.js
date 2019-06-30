import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingBar from "react-redux-loading-bar";
import { handleInitialData } from '../actions/shared';
import Dashboard from './Dashboard';
import LeaderBoard from './LeaderBoard';
import Login from './Login';
import NewQuestion from './NewQuestion';
import QuestionDetail from './QuestionDetail';
import Nav from './Nav';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            {this.props.loggedOut === true
              ? null
              : <div>
                  {/* <Route component={Login} /> */}
                  <Nav />
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
