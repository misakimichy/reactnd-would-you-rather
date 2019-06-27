import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setAuthedUser } from '../actions/authedUser';

class Login extends Component {
    state ={
        userId: null,
        toHome: false,
    }

    handleUserSelect = event => {
        event.preventDefault();
        const userId = event.target.value;
        this.setState(() => {
            return userId;
        })
    }

    handleLogin = event => {
        event.preventDefault();
        const { userId } = this.state;
        const { dispatch } = this.props;

        dispatch(setAuthedUser(userId));
        //Todo: Direct to Home
        this.setState = previousState => {
            return {
                ...previousState,
                toHome: true,
            };
        }
    }

    render() {
        const { userId, toHome } = this.state;
        const { users, history } = this.props;
        // console.log(userId)
        const avatar = userId ? users[userId].avatarURL : 'https://image.flaticon.com/icons/svg/1107/1107472.svg';

        if(toHome) {
            const redirect = history.location.state;
            if(redirect !== null) {
                return <Redirect to={redirect} push={true} />
            }
            return <Redirect to='/' />
        }
        return (
            <div className='login-container '>
                <h3 className='center'>Please select a user.</h3>
                <img
                    src={avatar}
                    alt={`Avatar of ${userId}`}
                    className='avatar'
                />
                <select value={userId} onChange={this.handleUserSelect}>
                    <option>Select an username</option>
                    {Object.keys(users).map(user => {
                        return <option
                                    key={user}
                                    value={users[user].id}
                                >
                                    {users[user].id}
                                </option>
                    })}
                </select>
                <button
                    className="button"
                    disabled={userId === null}
                    onClick={event => this.handleLogin(event)}
                >
                    Log In
                </button>
            </div>
        );
    }
}

function mapStateToProps({ users }) {
    return {
        users
    };
}

export default connect(mapStateToProps)(Login);
