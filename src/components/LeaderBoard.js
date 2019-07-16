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
                            <div className='asked'>Question Asked: {user.questions.length}</div>
                            <div className='answered'>Question Answered: {Object.keys(user.answers).length}</div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

function mapStateToProps ({ users }) {
    return {
        users: Object.values(users).sort((a, b) =>
                b.questions.length + Object.keys(b.answers).length
                - (a.questions.length + Object.keys(a.answers).length)
        )
    }
}

export default connect(mapStateToProps)(LeaderBoard);