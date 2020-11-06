import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../actions/authedUser';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toLogin: false,
    };
  }

  handleSignOut = (event) => {
    event.preventDefault();

    const { dispatch } = this.props;
    dispatch(signOut());
    this.setState({
      toLogin: true,
    });
  };

  render() {
    const { toLogin } = this.state;
    const { user } = this.props;

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

          <NavLink to="#" onClick={this.handleSignOut}>
            Sign Out
          </NavLink>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ authedUser, users }) => {
  const user = users[authedUser].name;

  return {
    authedUser,
    user,
  };
};

export default connect(mapStateToProps)(Nav);
