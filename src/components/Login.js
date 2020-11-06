import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setAuthedUser } from '../actions/authedUser';

const Login = (props) => {
  // destruct props
  const { users, dispatch } = props;

  const [username, setUsername] = useState('');
  const [toHome, setToHome] = useState(false);

  // set loginAvatar
  const loginAvatar = 'https://image.flaticon.com/icons/svg/1107/1107472.svg';

  const handleUserSelect = (e) => {
    const userChoice = e.target.value;
    setUsername(userChoice);
  };

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
    <form className="login-container" onSubmit={(e) => handleLogin(e)}>
      <img className="login-avatar" src={loginAvatar} alt={`Choose user`} />
      <h1 className="center">Please select a user</h1>
      <select value={username} onChange={(e) => handleUserSelect(e)}>
        <option>Username</option>
        {users.map((user) => {
          const { name } = user;
          return <option key={name}>{name}</option>;
        })}
      </select>
      <button className="button" type="submit" disabled={username === ''}>
        Log In
      </button>
    </form>
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
