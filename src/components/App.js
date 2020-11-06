import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
import handleInitialData from '../actions/shared';
import PrivateRoute from '../utils/PrivateRoute';
import Dashboard from './Dashboard';
import LeaderBoard from './LeaderBoard';
import Login from './Login';
import NewQuestion from './NewQuestion';
import Question from './Question';
import NotFound from './NotFound';

const App = (props) => {
  const { dispatch } = props;

  useEffect(() => {
    dispatch(handleInitialData());
  }, [dispatch]);

  return (
    <Router>
      <LoadingBar />
      <div className="container">
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute path="/" exact component={Dashboard} />
          <PrivateRoute path="/questions/:question_id" component={Question} />
          <PrivateRoute path="/add" component={NewQuestion} />
          <PrivateRoute path="/leaderboard" component={LeaderBoard} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
};

const mapStateToProps = ({ questions, users }) => {
  const isEmpty = (obj) => {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };
  return {
    loaded: isEmpty(questions) || isEmpty(users),
  };
};

export default connect(mapStateToProps)(App);
