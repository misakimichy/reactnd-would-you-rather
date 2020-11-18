import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { setAuthedUser } from '../actions/authedUser';

import { colors } from '../styles/theme';

const Login = (props) => {
  // destruct props
  const { users, dispatch } = props;

  const [username, setUsername] = useState('');
  const [toHome, setToHome] = useState(false);

  // set loginAvatar
  const loginAvatar = 'https://image.flaticon.com/icons/svg/1107/1107472.svg';

  const handleLogin = (e) => {
    e.preventDefault();

    if (username !== '') {
      dispatch(setAuthedUser(username));
      setToHome(true);
    }
  };

  if (toHome) {
    return <Redirect to="/" />;
  }

  return (
    <Styles onSubmit={(e) => handleLogin(e)}>
      <img className="login-avatar" src={loginAvatar} alt={`Choose user`} />
      <h1 className="center">Choose user</h1>
      <select value={username} onChange={(e) => setUsername(e.target.value)}>
        <option>Username</option>
        {users.map((user) => {
          const { name } = user;
          return <option key={name}>{name}</option>;
        })}
      </select>
      <button className="button" type="submit" disabled={username === ''}>
        Log In
      </button>
    </Styles>
  );
};

const mapStateToProps = ({ users, authedUser }) => {
  return {
    users: Object.values(users).map((user) => {
      return {
        name: user.id,
      };
    }),
    username: authedUser,
  };
};

export default connect(mapStateToProps)(Login);

const Styles = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;

  border: 1px solid ${colors.black};
  border-radius: 3px;
  width: 85%;
  margin: 30px auto;
  padding: 10px;

  .login-avatar {
    margin: 0 auto;
    width: 50%;
  }

  select {
    width: 40%;
    height: 30px;
    font-size: 16px;
    margin: 10px auto;

    :focus {
      outline: none;
    }
  }
`;
