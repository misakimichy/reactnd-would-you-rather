import React, { useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../actions/authedUser';

const Nav = (props) => {
  const { user, dispatch } = props;
  const [toLogin, setToLogin] = useState(false);

  const handleSignOut = (e) => {
    e.preventDefault();

    dispatch(signOut());
    setToLogin(true);
  };

  if (toLogin === true) {
    return <Redirect to="/login" />;
  }
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <NavLink to="/" exact activeClassName="active">
          Home
        </NavLink>
        <NavLink to="/add" activeClassName="active">
          New Question
        </NavLink>
        <NavLink to="/leaderboard" activeClassName="active">
          Leader Board
        </NavLink>
      </div>
      <div className="navbar-right">
        <p> Hello {user} !</p>

        <NavLink to="#" onClick={(e) => handleSignOut(e)}>
          Sign Out
        </NavLink>
      </div>
    </nav>
  );
};

const mapStateToProps = ({ authedUser, users }) => {
  const user = users[authedUser].name;

  return {
    authedUser,
    user,
  };
};

export default connect(mapStateToProps)(Nav);
