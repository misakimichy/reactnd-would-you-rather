import React, { Component } from 'react';
import { connect } from 'react-redux';

class LeaderBoard  extends Component {
    render() {
        const { users } = this.props;

        return (
            <div>
                <h1 className='center'>Leader Board</h1>
                <ul className='user-list'>
                    {users.map((user, index) => (
                        <li
                            className='user'
                            key={user.id}
                        >
                            <img
                                className='avatar'
                                src={user.avatarURL}
                                alt={`Avatar of ${user.id}`}
                            />
                            <span className='user-name'>{user.name}</span>
                            <div className='asked'>Number of Asked: {user.questions.length}</div>
                            <div className='answered'>Number of Answered: {Object.keys(user.answers).length}</div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

function mapStateToProps ({ users }) {
    return {
        
        users: Object.keys(users).sort((a,b) => (users[b].questions.length + Object.keys(users[b].answers).length) - (users[a].questions.length + Object.keys(users[a].answers).length))
            .map((user) => users[user]),
    }
}

export default connect(mapStateToProps)(LeaderBoard);