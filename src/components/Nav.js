import React, { useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { signOut } from '../actions/authedUser';

import { colors } from '../styles/theme';

const Nav = (props) => {
  // destruct props
  const { user, dispatch } = props;
  const firstName = user.split(' ')[0] || ' ';

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
          Add
        </NavLink>
        <NavLink to="/leaderboard" activeClassName="active">
          Board
        </NavLink>
      </div>
      <div className="nav-right">
        <p> 👋 {firstName}</p>
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

  width: 80%;
  max-width: 600px;
  margin: 20px auto;

  .nav-left {
    display: flex;
    width: 60%;
    max-width: 300px;
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
    max-width: 250px;
    width: 40%;
    a {
      color: ${colors.yellow};
    }
  }

  @media screen and (max-width: 640px) {
    .nav-right {
      width: 200px;
    }
  }
`;
