import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setAuthedUser } from '../actions/authedUser';

class Login extends Component {
    state ={
        userId: '',
        toHome: false,
    }

    handleUserSelect = event => {
        const userId = event.target.value;
        this.setState(() =>  ({ userId }))
    }

    handleLogin = event => {
        event.preventDefault();
        const { userId } = this.state;
        const { dispatch } = this.props;

        if(userId !== '') {
            dispatch(setAuthedUser(userId));
            this.setState(() => ({ toHome: true }))
        }
    }

    render() {
        const { userId, toHome } = this.state;
        const loginAvatar = 'https://image.flaticon.com/icons/svg/1107/1107472.svg';

        const { home } = this.props.location.state || {home: {pathname:'/'}}
        if(toHome) {
            return <Redirect to={home} />
        }

        return (
            <form className='login-container' onSubmit={this.handleLogin}>
                <h1 className='center'>Please select a user.</h1>
                <img
                    className='login-avatar'
                    src={loginAvatar}
                    alt={`Choose user`}
                />
                <select value={userId} onChange={this.handleUserSelect}>
                    <option>Select a user</option>
                    {this.props.users.map(user => (
                        <option key={user.id}>{user.name}</option>
                    ))}
                </select>
                <button
                    className="button"
                    type='submit'
                    disabled={userId === ''}
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
                name: user.name
            })
        }),
        userId: authedUser
    };
}

export default connect(mapStateToProps)(Login);
