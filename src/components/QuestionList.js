import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class QuestionList extends Component {
    render() {
        const { user, question } = this.props;
        const { id, optionOne, optionTwo } = question;

        return (
            <Link to={`/questions/${id}`}>
                <div className='question-list'>
                    <img
                        className='avatar'
                        src={user.avatarURL}
                        alt={`avatar of ${question.author}`}
                    />
                    <span className='username'>{user.name}</span>
                    <div className='option-one'>{optionOne.text}</div>
                    <div id='or'>or</div>
                    <div className='option-two'>{optionTwo.text}</div>
                </div>
            </Link>
        );
    }
}

const mapStateToProps = ({ users, questions }, { id }) => {
    const question = questions[id];
    const user = users[question.author];

    return {
        user,
        question,
    };
}

export default connect(mapStateToProps)(QuestionList);
