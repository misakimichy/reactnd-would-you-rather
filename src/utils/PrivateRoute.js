/* 
    Reference for PrivateRoute:
    https://medium.com/@tomlarge/private-routes-with-react-router-dom-28e9f40c7146
*/

import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Nav from '../components/Nav';

export const PrivateRoute = ({ component: Component, isAuthed, ...rest }) => (
  /* eslint-disable */
  <Route
    {...rest}
    render={(props) => {
      return isAuthed ? (
        <>
          <Nav />
          <Component {...props} />
        </>
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      );
    }}
  />
);

function mapStateToProps({ authedUser }) {
  const isEmpty = (obj) => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };

  return {
    isAuthed: !isEmpty(authedUser),
  };
}

export default connect(mapStateToProps)(PrivateRoute);
