import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { signOut } from '../actions/authedUser';

class Nav extends Component {
    state = {
        toLogin: false
    }

    handleSignOut = event => {
        event.preventDefault()

        const { dispatch } = this.props;
        dispatch(signOut());
        this.setState({
            toLogin: true,
        })
    }

    render() {
            const { toLogin } = this.state;
            const { authedUser, user} = this.props;

            if(toLogin === true) {
                return (<Redirect to='/login' />)
            }

        return (
            <nav className='navbar'>
                <ul className='navbar-left'>
                    <li>
                        <NavLink
                            to='/' exact
                            activeClassName='active'
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/add'
                            activeClassName='active'
                        >
                            New Question
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/leaderboard'
                            activeClassName='active'
                        >
                            Leader Board
                        </NavLink>
                    </li>
                </ul>
                <ul className='navbar-right'>
                    <li> Hello {user} !</li>
                    <li>
                        <NavLink
                            to='#'
                            onClick={this.handleSignOut}
                        >
                            Sign Out
                        </NavLink>
                    </li>
                </ul>
            </nav>
        );
    }
}

function mapStateToProps ({ authedUser, users }) {
    const user = users[authedUser].name;
    
    return {
        authedUser,
        user,
    };
}

export default connect(mapStateToProps)(Nav);
