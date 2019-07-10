import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setAuthedUser } from '../actions/authedUser';

class Login extends Component {
    state = {
        username: '',
        toHome: false,
    }

    handleUserSelect = event => {
        const username = event.target.value;
        this.setState(() =>  ({ username }))
    }

    handleLogin = event => {
        event.preventDefault();
        const { username } = this.state;
        const { dispatch } = this.props;

        if(username !== '') {
            dispatch(setAuthedUser(username));
            this.setState(() => ({ toHome: true }))
        }
    }

    render() {
        const { username, toHome } = this.state;
        const loginAvatar = 'https://image.flaticon.com/icons/svg/1107/1107472.svg';

        const home = this.props.location.state || {home: {pathname:'/'}}
        if(toHome) {
            return <Redirect to={home} />
        }

        return (
            <form className='login-container' onSubmit={this.handleLogin}>
                <img
                    className='login-avatar'
                    src={loginAvatar}
                    alt={`Choose user`}
                />
                <h1 className='center'>Please select a user</h1>
                <select value={username} onChange={this.handleUserSelect}>
                    <option>Username</option>
                    {this.props.users.map(user => (
                        <option key={user.id}>{user.name}</option>
                    ))}
                </select>
                <button
                    className="button"
                    type='submit'
                    disabled={username === ''}
                >
                    Log In
                </button>
            </form>
        );
    }
}

function mapStateToProps({ users, authedUser }) {
    return {
        users: Object.values(users).map(user => {
            return({
                id: user.id,
                name: user.id
            })
        }),
        username: authedUser
    };
}

export default connect(mapStateToProps)(Login);
