import React, { Component } from 'react';
import { connect } from 'react-redux';

class LeaderBoard  extends Component {
    render() {
        const { users } = this.props;
        const userArray = Object.keys(users).map(key => users[key]);

        return (
            <div>
                <h3 className='center'>Leader Board</h3>
                <ul className='user-list'>
                    {userArray.map(user =>(
                        <li key={user}>
                            <div classNam='user'>
                                <img
                                    className='avatar'
                                    src={user.avatarURL}
                                    alt={`Avatar of ${user.id}`}
                                />
                                <span>{user.name}</span>
                                <div className='interaction'>
                                    <p>Number of Asked: {user.questions.length}</p>
                                    <p>Number of Answered: {Object.keys(user.answers).length}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

function mapStateToProps ({ users }) {
    return {
        users
    }
}

export default connect(mapStateToProps)(LeaderBoard);