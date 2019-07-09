import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingBar from "react-redux-loading-bar";
import { handleInitialData } from '../actions/shared';
import Dashboard from './Dashboard';
import LeaderBoard from './LeaderBoard';
import Login from './Login';
import NewQuestion from './NewQuestion';
import Question from './Question';
import PrivateRoute from '../utils/PrivateRoute';

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
            {this.props.loaded === true
              ? null
              : <div>
                  <Route path='/login' component={Login} />
                  <PrivateRoute path='/' exact component={Dashboard} />
                  <PrivateRoute path='/questions/:question_id' component={Question} />
                  <PrivateRoute path='/add' component={NewQuestion} />
                  <PrivateRoute path='/leaderboard' component={LeaderBoard} />
              </div>
            }
        </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps ({ questions, users }) {
  const isEmpty = obj => {
    for (let key in obj) {
      if(obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }
  return {
    loaded: isEmpty(questions) || isEmpty(users)
  };
}

export default connect(mapStateToProps)(App);