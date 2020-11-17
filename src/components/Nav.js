import React, { useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { signOut } from '../actions/authedUser';

import { colors } from '../styles/theme';

const Nav = (props) => {
  // destruct props
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
    <Styles>
      <div className="nav-left">
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
      <div className="nav-right">
        <p> 👋 {user}</p>
        <NavLink to="#" onClick={(e) => handleSignOut(e)}>
          Sign Out
        </NavLink>
      </div>
    </Styles>
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

const Styles = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;

  width: 60%;
  margin: 20px auto;

  .nav-left {
    display: flex;
    width: 70%;
    padding: 0;

    * {
      margin-right: 24px;
      color: ${colors.yellow};
    }
  }

  .nav-right {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 45%;

    a {
      color: ${colors.yellow};
    }
  }
`;
