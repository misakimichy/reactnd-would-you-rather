import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';

import styled from 'styled-components';

import handleInitialData from '../actions/shared';
import PrivateRoute from '../utils/PrivateRoute';

// components
import Dashboard from './Dashboard';
import LeaderBoard from './LeaderBoard';
import Login from './Login';
import NewQuestion from './NewQuestion';
import Question from './Question';
import NotFound from './NotFound';

import { colors } from '../styles/theme';

const App = (props) => {
  const { dispatch } = props;

  useEffect(() => {
    dispatch(handleInitialData());
  }, [dispatch]);

  return (
    <Styles>
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
    </Styles>
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

const Styles = styled.div`
  .question {
    display: flex;
    align-items: flex-start;
    flex-direction: column;

    border: 1px solid ${colors.black};
    border-radius: 3px;
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;

    form {
      width: 100%;
    }
    label {
      margin: 0;
      padding: 10px;
    }
  }
`;
