import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Nav extends Component {
    render() {
        return (
            <nav className='nav'>
                <ul>
                    <li>Home</li>
                    <li>New Question</li>
                    <li>Leader Board</li>
                </ul>
            </nav>
        );
    }
}

export default Nav;
