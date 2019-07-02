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
import NotFound from './NotFound';

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
                  <Route path='/' exact component={Dashboard} />
                  <Route path='/questions/:question_id' component={Question} />
                  <Route path='/add' component={NewQuestion} />
                  <Route path='/leaderboard' component={LeaderBoard} />
                  <Route path='/404' component={NotFound} />
              </div>
            }
        </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps ({ questions, users}) {
  const isEmpty = obj => {
    for (const key in obj) {
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
